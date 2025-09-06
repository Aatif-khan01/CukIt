import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Faculty {
  id: string
  name: string
  designation: string
  specialization: string[]
  email: string
  phone: string | null
  experience: string | null
  education: string | null
  publications: string | null
  photo_url: string | null
  bio: string | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export const useFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFaculty = async () => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFaculty(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addFaculty = async (facultyData: Omit<Faculty, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .insert(facultyData)
        .select()
        .single()

      if (error) throw error
      setFaculty(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateFaculty = async (id: string, updates: Partial<Faculty>) => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setFaculty(prev => prev.map(f => f.id === id ? data : f))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deleteFaculty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id)

      if (error) throw error
      setFaculty(prev => prev.filter(f => f.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchFaculty()

    // Set up real-time subscription
    const channel = supabase
      .channel('faculty-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'faculty'
        },
        (payload) => {
          console.log('Real-time payload:', payload)
          if (payload.eventType === 'INSERT' && payload.new) {
            setFaculty(prev => {
              const exists = prev.find(f => f.id === payload.new.id)
              if (!exists) {
                return [payload.new as Faculty, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setFaculty(prev => prev.map(f => f.id === payload.new.id ? payload.new as Faculty : f))
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setFaculty(prev => prev.filter(f => f.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    faculty,
    loading,
    error,
    refetch: fetchFaculty,
    addFaculty,
    updateFaculty,
    deleteFaculty
  }
}

export const useFeaturedFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedFaculty = async () => {
      try {
        const { data, error } = await supabase
          .from('faculty')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        setFaculty(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedFaculty()

    // Set up real-time subscription for featured faculty
    const channel = supabase
      .channel('featured-faculty-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'faculty'
        },
        () => fetchFeaturedFaculty()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { faculty, loading, error }
}