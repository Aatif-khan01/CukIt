import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface News {
  id: string
  title: string
  content: string
  author: string
  category: string
  status: string
  publish_date: string | null
  views: number
  image_url: string | null
  excerpt: string | null
  created_at: string
  updated_at: string
}

export const useNews = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNews(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addNews = async (newsData: Omit<News, 'id' | 'created_at' | 'updated_at' | 'views'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert(newsData)
        .select()
        .single()

      if (error) throw error
      setNews(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateNews = async (id: string, updates: Partial<News>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setNews(prev => prev.map(n => n.id === id ? data : n))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id)

      if (error) throw error
      setNews(prev => prev.filter(n => n.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchNews()

    // Set up real-time subscription
    const channel = supabase
      .channel('news-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news'
        },
        (payload) => {
          console.log('Real-time payload:', payload)
          if (payload.eventType === 'INSERT' && payload.new) {
            setNews(prev => {
              const exists = prev.find(n => n.id === payload.new.id)
              if (!exists) {
                return [payload.new as News, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setNews(prev => prev.map(n => n.id === payload.new.id ? payload.new as News : n))
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setNews(prev => prev.filter(n => n.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    news,
    loading,
    error,
    refetch: fetchNews,
    addNews,
    updateNews,
    deleteNews
  }
}

export const usePublishedNews = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPublishedNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('status', 'published')
          .order('publish_date', { ascending: false })

        if (error) throw error
        setNews(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPublishedNews()

    // Set up real-time subscription for published news
    const channel = supabase
      .channel('published-news-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news'
        },
        () => fetchPublishedNews()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { news, loading, error }
}