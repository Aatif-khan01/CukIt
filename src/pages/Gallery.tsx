import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Camera, Calendar, Users, Award, Building, Maximize2, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useGallery } from "@/hooks/useGallery"

const categories = [
  { id: "all", name: "All", icon: Camera },
  { id: "Events", name: "Events", icon: Calendar },
  { id: "Campus", name: "Campus", icon: Building },
  { id: "Infrastructure", name: "Infrastructure", icon: Building },
  { id: "Achievements", name: "Achievements", icon: Award }
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { albums, photos, loading, fetchPhotos } = useGallery()

  // Fetch all photos when component mounts
  useEffect(() => {
    fetchPhotos()
  }, [fetchPhotos])

  const publishedAlbums = albums.filter(album => album.status === 'published')
  
  // Only show photos from published albums
  const publishedPhotos = photos.filter(photo => {
    const album = albums.find(a => a.id === photo.album_id)
    return album?.status === 'published'
  })
  
  const filteredPhotos = activeCategory === "all" 
    ? publishedPhotos 
    : publishedPhotos.filter(photo => {
        const album = albums.find(a => a.id === photo.album_id)
        return album?.category === activeCategory
      })

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header + Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <nav className="text-sm text-muted-foreground mb-3" aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-foreground">Gallery</li>
            </ol>
          </nav>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Photo <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore moments from our vibrant campus life, events, achievements, and state-of-the-art facilities
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 ${
                  activeCategory === category.id 
                    ? "gradient-primary text-white" 
                    : "glass-card hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            )
          })}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => {
            const album = albums.find(a => a.id === photo.album_id)
            return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="glass-card hover-lift cursor-pointer group overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      {photo.image_url ? (
                        <img 
                          src={photo.image_url} 
                          alt={photo.title || 'Gallery image'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Camera className="w-12 h-12 text-primary/50" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Maximize2 className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Category Badge */}
                      <Badge 
                        variant="outline" 
                        className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm"
                      >
                        {album?.category || 'Gallery'}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                        {photo.title || album?.name || 'Untitled'}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {photo.description || album?.description || 'No description available'}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(photo.created_at).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl w-full">
                  <div className="space-y-4">
                    {/* Full Image */}
                    <div className="aspect-video rounded-lg overflow-hidden">
                      {photo.image_url ? (
                        <img 
                          src={photo.image_url} 
                          alt={photo.title || 'Gallery image'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Camera className="w-24 h-24 text-primary/50" />
                        </div>
                      )}
                    </div>
                    
                    {/* Image Details */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h2 className="text-2xl font-bold">{photo.title || album?.name || 'Untitled'}</h2>
                        <Badge variant="outline">{album?.category || 'Gallery'}</Badge>
                      </div>
                      <p className="text-muted-foreground">{photo.description || album?.description || 'No description available'}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(photo.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>)
          })}
        </div>

        {filteredPhotos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No images found</h3>
            <p className="text-muted-foreground">
              No images available for the selected category
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="glass-card rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {publishedPhotos.length}
                </div>
                <div className="text-muted-foreground">Total Photos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {publishedAlbums.length}
                </div>
                <div className="text-muted-foreground">Albums</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {albums.filter(album => album.category === "Events").length}
                </div>
                <div className="text-muted-foreground">Event Albums</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
