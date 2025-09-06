import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)

  const uploadImage = async (file: File, folder: string = 'general'): Promise<{ url: string | null, error: string | null }> => {
    try {
      setUploading(true)

      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)

      return { url: publicUrl, error: null }
    } catch (error: any) {
      console.error('Error uploading image:', error)
      return { url: null, error: error.message }
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (url: string): Promise<{ error: string | null }> => {
    try {
      // Extract the file path from the full URL
      const urlParts = url.split('/storage/v1/object/public/images/')
      if (urlParts.length < 2) {
        throw new Error('Invalid image URL format')
      }
      
      const filePath = urlParts[1]
      if (!filePath) throw new Error('Invalid image URL')

      const { error } = await supabase.storage
        .from('images')
        .remove([filePath])

      if (error) throw error

      return { error: null }
    } catch (error: any) {
      console.error('Error deleting image:', error)
      return { error: error.message }
    }
  }

  return {
    uploadImage,
    deleteImage,
    uploading
  }
}
