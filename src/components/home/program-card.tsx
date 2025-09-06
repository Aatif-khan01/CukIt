import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"
import { Link } from "react-router-dom"
import { Program } from "@/data/programs"

interface ProgramCardProps {
  program: Program
  index: number
}

export function ProgramCard({ program, index }: ProgramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <Card className="glass-card hover-lift h-full">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">{program.title}</h3>
          <Badge variant="secondary" className="w-fit">{program.duration}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{program.description}</p>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/programs">Learn More</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}