import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Event {
  id: string
  title: string
  description: string
  date_time: string
  venue: string
  category: string
  status: string
  is_featured: boolean
  max_registrations: number | null
  current_registrations: number
  image_url: string | null
  contact_email: string | null
  created_at: string
  updated_at: string
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date_time', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single()

      if (error) throw error
      setEvents(prev => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setEvents(prev => prev.map(e => e.id === id ? data : e))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      if (error) throw error
      setEvents(prev => prev.filter(e => e.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchEvents()

    // Set up real-time subscription
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Real-time payload:', payload)
          if (payload.eventType === 'INSERT' && payload.new) {
            setEvents(prev => {
              const exists = prev.find(e => e.id === payload.new.id)
              if (!exists) {
                return [payload.new as Event, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setEvents(prev => prev.map(e => e.id === payload.new.id ? payload.new as Event : e))
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setEvents(prev => prev.filter(e => e.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent
  }
}