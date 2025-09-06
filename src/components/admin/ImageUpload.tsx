import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useImageUpload } from '@/hooks/useImageUpload'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ImageUploadProps {
  currentImage?: string | null
  onImageChange: (url: string | null) => void
  folder?: string
  className?: string
}

export function ImageUpload({ 
  currentImage, 
  onImageChange, 
  folder = 'general',
  className = '' 
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const { uploadImage, deleteImage, uploading } = useImageUpload()
  const { toast } = useToast()

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file.',
        variant: 'destructive'
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB.',
        variant: 'destructive'
      })
      return
    }

    const { url, error } = await uploadImage(file, folder)
    
    if (error) {
      toast({
        title: 'Upload failed',
        description: error,
        variant: 'destructive'
      })
      return
    }

    onImageChange(url)
    toast({
      title: 'Image uploaded',
      description: 'Image has been uploaded successfully.',
    })
  }

  const handleRemoveImage = async () => {
    if (currentImage) {
      await deleteImage(currentImage)
    }
    onImageChange(null)
    toast({
      title: 'Image removed',
      description: 'Image has been removed.',
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {currentImage ? (
        <Card className="relative overflow-hidden">
          <img 
            src={currentImage} 
            alt="Uploaded" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveImage}
              disabled={uploading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card 
          className={`border-2 border-dashed p-8 text-center transition-colors ${
            dragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Upload Image</h3>
              <p className="text-sm text-muted-foreground">
                Drag & drop an image here, or click to select
              </p>
            </div>

            <Button
              variant="outline"
              disabled={uploading}
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) handleFileSelect(file)
                }
                input.click()
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Select Image'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}