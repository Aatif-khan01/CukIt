import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface StudyMaterial {
  id: string
  title: string
  description: string | null
  course: string
  subject: string
  semester: string | null
  type: string
  file_url: string
  file_size: number | null
  uploaded_by: string
  downloads: number
  created_at: string
  updated_at: string
}

export const useStudyMaterials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMaterials(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addMaterial = async (materialData: Omit<StudyMaterial, 'id' | 'created_at' | 'updated_at' | 'downloads'>) => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .insert(materialData)
        .select()
        .single()

      if (error) throw error
      setMaterials(prev => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateMaterial = async (id: string, updates: Partial<StudyMaterial>) => {
    try {
      const { data, error } = await supabase
        .from('study_materials')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setMaterials(prev => prev.map(m => m.id === id ? data : m))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deleteMaterial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('study_materials')
        .delete()
        .eq('id', id)

      if (error) throw error
      setMaterials(prev => prev.filter(m => m.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  const incrementDownloads = async (id: string) => {
    try {
      // First get the current download count
      const { data: current, error: fetchError } = await supabase
        .from('study_materials')
        .select('downloads')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      const { data, error } = await supabase
        .from('study_materials')
        .update({ 
          downloads: (current.downloads || 0) + 1
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setMaterials(prev => prev.map(m => m.id === id ? data : m))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  useEffect(() => {
    fetchMaterials()

    // Set up real-time subscription
    const channel = supabase
      .channel('study-materials-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'study_materials'
        },
        (payload) => {
          console.log('Real-time payload:', payload)
          if (payload.eventType === 'INSERT' && payload.new) {
            setMaterials(prev => {
              const exists = prev.find(m => m.id === payload.new.id)
              if (!exists) {
                return [payload.new as StudyMaterial, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setMaterials(prev => prev.map(m => m.id === payload.new.id ? payload.new as StudyMaterial : m))
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setMaterials(prev => prev.filter(m => m.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    materials,
    loading,
    error,
    refetch: fetchMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    incrementDownloads
  }
}