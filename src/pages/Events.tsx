import { motion } from "framer-motion"
import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users, ExternalLink, Bell, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEvents } from "@/hooks/useEvents"
import { usePublishedNews } from "@/hooks/useNews"
import eventsHero from "@/assets/events-hero.jpg"

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "ongoing": return "bg-green-500/20 text-green-400 border-green-500/30" 
    case "completed": return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "urgent": return "bg-red-500/20 text-red-400 border-red-500/30"
    case "important": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "general": return "bg-green-500/20 text-green-400 border-green-500/30"
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export default function Events() {
  const [activeTab, setActiveTab] = useState("events")
  const { events, loading: eventsLoading } = useEvents()
  const { news, loading: newsLoading } = usePublishedNews()

  const upcomingEvents = events.filter(event => event.status === "upcoming")
  const featuredEvents = events.filter(event => event.is_featured)
  
  if (eventsLoading || newsLoading) {
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
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] min-h-[350px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${eventsHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Events & <span className="gradient-text">Notices</span>
            </h1>
            <p className="text-sm text-white/70 mt-2">
              <Link to="/" className="hover:underline">Home</Link> / Events & Notices
            </p>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Stay updated with the latest events, workshops, conferences, and important notices
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-8">
            {/* Featured Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredEvents.map((event, index) => (
                  <Card key={event.id} className="glass-card hover-lift overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                      ) : (
                        <Calendar className="w-12 h-12 text-primary" />
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(event.date_time).toLocaleDateString()} at {new Date(event.date_time).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{event.venue}</span>
                        </div>
                        {event.max_registrations && (
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{event.current_registrations || 0}/{event.max_registrations} registered</span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full gradient-primary text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* All Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">All Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card key={event.id} className="glass-card hover-lift">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-2">{event.title}</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{new Date(event.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-primary" />
                          <span>{new Date(event.date_time).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="notices" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {news.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glass-card hover-lift">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold">{article.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getCategoryColor(article.category)}>
                            {article.category.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {article.publish_date ? new Date(article.publish_date).toLocaleDateString() : new Date(article.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{article.excerpt || article.content.substring(0, 200) + '...'}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
