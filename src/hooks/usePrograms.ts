import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Program {
  id: string
  title: string
  duration: string
  description: string
  eligibility: string | null
  curriculum: string | null
  created_at: string
  updated_at: string
}

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPrograms(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addProgram = async (programData: Omit<Program, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .insert(programData)
        .select()
        .single()

      if (error) throw error
      setPrograms(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateProgram = async (id: string, updates: Partial<Program>) => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setPrograms(prev => prev.map(p => p.id === id ? data : p))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deleteProgram = async (id: string) => {
    try {
      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPrograms(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchPrograms()

    // Set up real-time subscription
    const channel = supabase
      .channel('programs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'programs'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPrograms(prev => [payload.new as Program, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setPrograms(prev => prev.map(p => p.id === payload.new.id ? payload.new as Program : p))
          } else if (payload.eventType === 'DELETE') {
            setPrograms(prev => prev.filter(p => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms,
    addProgram,
    updateProgram,
    deleteProgram
  }
}