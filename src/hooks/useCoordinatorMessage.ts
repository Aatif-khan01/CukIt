import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface CoordinatorMessage {
  id: string
  name: string
  designation: string
  message: string
  photo_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useCoordinatorMessage = () => {
  const [message, setMessage] = useState<CoordinatorMessage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCoordinatorMessage = async () => {
    try {
      const { data, error } = await supabase
        .from('coordinator_message')
        .select('*')
        .eq('is_active', true)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setMessage(data || null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateMessage = async (id: string, updates: Partial<CoordinatorMessage>) => {
    try {
      const { data, error } = await supabase
        .from('coordinator_message')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setMessage(data)
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const createMessage = async (messageData: Omit<CoordinatorMessage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // First deactivate any existing active message
      await supabase
        .from('coordinator_message')
        .update({ is_active: false })
        .eq('is_active', true)

      // Then create the new message
      const { data, error } = await supabase
        .from('coordinator_message')
        .insert(messageData)
        .select()
        .single()

      if (error) throw error
      setMessage(data)
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  useEffect(() => {
    fetchCoordinatorMessage()

    // Set up real-time subscription
    const channel = supabase
      .channel('coordinator-message-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'coordinator_message'
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setMessage(payload.new as CoordinatorMessage)
          } else if (payload.eventType === 'DELETE') {
            setMessage(null)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    message,
    loading,
    error,
    refetch: fetchCoordinatorMessage,
    updateMessage,
    createMessage
  }
}