import { useState } from "react"
import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Mail, 
  Phone, 
  User, 
  BookOpen, 
  Award,
  ExternalLink,
  Loader2
} from "lucide-react"
import { Link } from "react-router-dom"
import { useFaculty } from "@/hooks/useFaculty"
import facultyHero from "@/assets/faculty-hero.jpg"

export default function Faculty() {
  const { faculty: facultyMembers, loading } = useFaculty()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const allSpecializations = Array.from(
    new Set(facultyMembers.flatMap(faculty => faculty.specialization))
  )

  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization.some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    
    const matchesSpecialization = !selectedSpecialization || 
                                 faculty.specialization.includes(selectedSpecialization)
    
    return matchesSearch && matchesSpecialization
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name)
    if (sortBy === "designation") return a.designation.localeCompare(b.designation)
    return 0
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
      {/* Hero Section with Background Image */}
      <div className="relative h-[40vh] min-h-[350px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${facultyHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white px-4"
          >
            <nav className="text-sm text-white/70 mb-3" aria-label="Breadcrumb">
              <ol className="inline-flex items-center gap-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li>/</li>
                <li aria-current="page" className="text-white">Faculty</li>
              </ol>
            </nav>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Faculty</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Meet our distinguished faculty members who bring decades of experience and expertise to guide your learning journey
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty by name, designation, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-glass-border/50"
              />
            </div>
            
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 rounded-lg glass-card border border-glass-border/50 bg-background text-foreground"
            >
              <option value="">All Specializations</option>
              {allSpecializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg glass-card border border-glass-border/50 bg-background text-foreground"
            >
              <option value="name">Sort: Name (A–Z)</option>
              <option value="designation">Sort: Designation</option>
            </select>
          </div>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="glass-card hover-lift h-full overflow-hidden">
                <CardHeader className="text-center pb-4">
                  {/* Profile Photo */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {faculty.photo_url ? (
                      <img 
                        src={faculty.photo_url} 
                        alt={`${faculty.name} profile photo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <User className={`w-12 h-12 ${faculty.photo_url ? 'hidden' : ''}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {faculty.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">{faculty.designation}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Specializations */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-primary" />
                      Specializations
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {faculty.specialization.map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Education */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-primary" />
                      <span>{faculty.experience} Experience</span>
                    </div>
                    <p className="text-xs">{faculty.education}</p>
                    <p className="text-xs">{faculty.publications}</p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-glass-border/50">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      asChild
                    >
                      <a href={`mailto:${faculty.email}`}>
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline" 
                      className="flex-1 text-xs"
                      asChild
                    >
                      <a href={`tel:${faculty.phone}`}>
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </a>
                    </Button>
                  </div>

                  {/* Quick Profile Button with Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-primary hover:bg-primary/10"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Quick Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl w-full">
                      <div className="flex gap-4">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          {faculty.photo_url ? (
                            <img src={faculty.photo_url} alt={`${faculty.name} profile`} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-10 h-10" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold">{faculty.name}</h3>
                          <p className="text-primary">{faculty.designation}</p>
                          <p className="text-sm text-muted-foreground">{faculty.education}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Research Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {faculty.specialization.map((s) => (
                            <Badge key={s} variant="secondary">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaculty.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Faculty Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}

        {/* Join Faculty CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Join Our Faculty Team
            </h3>
            <p className="text-muted-foreground mb-6">
              Are you passionate about teaching and research in Information Technology? 
              We're always looking for talented educators to join our team.
            </p>
            <Button size="lg" className="gradient-primary text-white">
              View Openings
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
