import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface GalleryAlbum {
  id: string
  name: string
  description?: string
  cover_image_url?: string
  category: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
  photo_count?: number
}

export interface GalleryPhoto {
  id: string
  album_id: string
  title?: string
  description?: string
  image_url: string
  file_size?: number
  uploaded_by: string
  created_at: string
  updated_at: string
}

export const useGallery = () => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([])
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('gallery_albums')
        .select(`
          *,
          gallery_photos(count)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform data to include photo count and proper typing
      const albumsWithCount = data.map(album => ({
        ...album,
        status: album.status as 'draft' | 'published',
        photo_count: album.gallery_photos?.[0]?.count || 0
      }))

      setAlbums(albumsWithCount)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching albums:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchPhotos = async (albumId?: string) => {
    try {
      let query = supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false })

      if (albumId) {
        query = query.eq('album_id', albumId)
      }

      const { data, error } = await query

      if (error) throw error
      setPhotos(data || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching photos:', err)
      setError(err.message)
    }
  }

  const addAlbum = async (albumData: Omit<GalleryAlbum, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_albums')
        .insert([albumData])
        .select()
        .single()

      if (error) throw error
      setAlbums(prev => [{ ...data, status: data.status as 'draft' | 'published', photo_count: 0 }, ...prev])
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const updateAlbum = async (id: string, updates: Partial<GalleryAlbum>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_albums')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setAlbums(prev => prev.map(a => a.id === id ? { ...data, status: data.status as 'draft' | 'published', photo_count: a.photo_count } : a))
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deleteAlbum = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_albums')
        .delete()
        .eq('id', id)

      if (error) throw error
      setAlbums(prev => prev.filter(a => a.id !== id))
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  const addPhoto = async (photoData: Omit<GalleryPhoto, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .insert([photoData])
        .select()
        .single()

      if (error) throw error
      setPhotos(prev => [data, ...prev])
      
      // Update album photo count
      setAlbums(prev => prev.map(a => 
        a.id === photoData.album_id 
          ? { ...a, photo_count: (a.photo_count || 0) + 1 }
          : a
      ))
      
      return { data, error: null }
    } catch (err: any) {
      return { data: null, error: err.message }
    }
  }

  const deletePhoto = async (id: string, albumId: string) => {
    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPhotos(prev => prev.filter(p => p.id !== id))
      
      // Update album photo count
      setAlbums(prev => prev.map(a => 
        a.id === albumId 
          ? { ...a, photo_count: Math.max((a.photo_count || 0) - 1, 0) }
          : a
      ))
      
      return { error: null }
    } catch (err: any) {
      return { error: err.message }
    }
  }

  useEffect(() => {
    fetchAlbums()

    // Set up real-time subscription
    const channel = supabase
      .channel('gallery-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_albums'
        },
        (payload) => {
          console.log('Real-time payload:', payload)
          if (payload.eventType === 'INSERT' && payload.new) {
            setAlbums(prev => {
              const exists = prev.find(a => a.id === payload.new.id)
              if (!exists) {
                return [{ ...payload.new as GalleryAlbum, status: payload.new.status as 'draft' | 'published', photo_count: 0 }, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setAlbums(prev => prev.map(a => 
              a.id === payload.new.id 
                ? { ...payload.new as GalleryAlbum, status: payload.new.status as 'draft' | 'published', photo_count: a.photo_count }
                : a
            ))
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setAlbums(prev => prev.filter(a => a.id !== payload.old.id))
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_photos'
        },
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            setPhotos(prev => {
              const exists = prev.find(p => p.id === payload.new.id)
              if (!exists) {
                return [payload.new as GalleryPhoto, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE' && payload.new) {
            setPhotos(prev => prev.map(p => p.id === payload.new.id ? payload.new as GalleryPhoto : p))
          } else if (payload.eventType === 'DELETE' && payload.old) {
            setPhotos(prev => prev.filter(p => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return {
    albums,
    photos,
    loading,
    error,
    refetch: fetchAlbums,
    fetchPhotos,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    addPhoto,
    deletePhoto
  }
}
