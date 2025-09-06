import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Mail, Phone, User } from "lucide-react"
import { Faculty } from "@/hooks/useFaculty"

interface FacultyCardProps {
  faculty: Faculty
  index: number
}

export function FacultyCard({ faculty, index }: FacultyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card className="glass-card hover-lift h-full overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-primary flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
            {faculty.photo_url ? (
              <img 
                src={faculty.photo_url} 
                alt={faculty.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10" />
            )}
          </div>
          
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {faculty.name}
          </h3>
          <p className="text-primary font-medium text-sm">{faculty.designation}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <div className="flex flex-wrap gap-1">
              {faculty.specialization.slice(0, 2).map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary" />
              <span>{faculty.experience}</span>
            </div>
            <p className="text-xs">{faculty.publications}</p>
          </div>

          <div className="flex gap-2 pt-4">
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
            {faculty.phone && (
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
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}