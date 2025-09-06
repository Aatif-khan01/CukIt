import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface DashboardStats {
  facultyCount: number
  eventsCount: number
  materialsCount: number
  newsCount: number
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    facultyCount: 0,
    eventsCount: 0,
    materialsCount: 0,
    newsCount: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      const [facultyRes, eventsRes, materialsRes, newsRes] = await Promise.all([
        supabase.from('faculty').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('study_materials').select('id', { count: 'exact', head: true }),
        supabase.from('news').select('id', { count: 'exact', head: true })
      ])

      if (facultyRes.error) throw facultyRes.error
      if (eventsRes.error) throw eventsRes.error
      if (materialsRes.error) throw materialsRes.error
      if (newsRes.error) throw newsRes.error

      setStats({
        facultyCount: facultyRes.count || 0,
        eventsCount: eventsRes.count || 0,
        materialsCount: materialsRes.count || 0,
        newsCount: newsRes.count || 0
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}