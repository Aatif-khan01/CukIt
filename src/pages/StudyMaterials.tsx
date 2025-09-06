import { motion } from "framer-motion"
import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, FileText, BookOpen, GraduationCap, Filter, Loader2 } from "lucide-react"
import { useStudyMaterials } from "@/hooks/useStudyMaterials"

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Notes": return <FileText className="w-5 h-5" />
    case "Syllabus": return <BookOpen className="w-5 h-5" />
    case "Past Papers": return <GraduationCap className="w-5 h-5" />
    case "Lab Manual": return <FileText className="w-5 h-5" />
    default: return <FileText className="w-5 h-5" />
  }
}

export default function StudyMaterials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  
  const { materials, loading, incrementDownloads } = useStudyMaterials()

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || material.course === selectedCourse
    const matchesType = selectedType === "all" || material.type === selectedType
    const matchesSemester = selectedSemester === "all" || material.semester === selectedSemester
    
    return matchesSearch && matchesCourse && matchesType && matchesSemester
  })

  const handleDownload = async (materialId: string, fileUrl: string) => {
    // Increment download count
    await incrementDownloads(materialId)
    // Open file in new tab for download
    window.open(fileUrl, '_blank')
  }

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Study <span className="gradient-text">Materials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive study materials, notes, syllabi, and past papers for all CSE courses
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {Array.from(new Set(materials.map(m => m.course))).map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Material Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Array.from(new Set(materials.map(m => m.type))).map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {Array.from(new Set(materials.map(m => m.semester).filter(Boolean))).map(semester => (
                  <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card hover-lift h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-primary">
                        {getTypeIcon(material.type)}
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">
                        {material.type}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      PDF
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                    {material.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {material.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {material.course}
                    </Badge>
                    {material.semester && (
                      <Badge variant="outline" className="text-xs">
                        {material.semester}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {material.subject}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{material.file_size ? `${(material.file_size / 1024 / 1024).toFixed(1)} MB` : 'N/A'}</span>
                    <span>{material.downloads} downloads</span>
                  </div>
                  
                  <Button 
                    className="w-full gradient-primary text-white"
                    onClick={() => handleDownload(material.id, material.file_url)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No materials found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}