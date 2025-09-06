import { motion } from "framer-motion"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BookOpen, Download, ExternalLink, Loader2 } from "lucide-react"
import { usePrograms } from "@/hooks/usePrograms"

export default function Programs() {
  const { programs, loading } = usePrograms()
  
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Academic <span className="gradient-text">Programs</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of IT programs designed to shape future technology leaders
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="space-y-12">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass-card rounded-2xl overflow-hidden hover-lift"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Program Info */}
                <div className="lg:col-span-2 p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-primary border-primary">
                      {program.title.split(' ')[0]} {program.title.split(' ')[1]}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    {program.title}
                  </h2>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Curriculum */}
                  {program.curriculum && (
                    <div className="mb-8">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-primary" />
                        Curriculum Overview
                      </h4>
                      <p className="text-sm text-muted-foreground">{program.curriculum}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button className="gradient-primary text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Syllabus
                    </Button>
                    <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Admission Details
                    </Button>
                  </div>
                </div>

                {/* Program Details Sidebar */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 border-l border-glass-border/50">
                  <div className="space-y-6">
                    {program.eligibility && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Eligibility</h4>
                        <p className="text-sm text-muted-foreground">{program.eligibility}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Duration</h4>
                      <p className="text-sm text-muted-foreground">{program.duration}</p>
                    </div>

                    <div className="pt-4 border-t border-glass-border/30">
                      <Button 
                        variant="outline" 
                        className="w-full glass-card hover:bg-primary/20"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Ready to Start Your IT Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join our community of innovators and shape the future of technology. 
              Get in touch with our admissions team for guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-white">
                Contact Admissions
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
                Campus Tour
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}