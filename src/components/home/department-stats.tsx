import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, Award, Trophy } from "lucide-react"

const stats = [
  { icon: Users, label: "Faculty Members", value: "20+" },
  { icon: GraduationCap, label: "Students Enrolled", value: "500+" },
  { icon: Award, label: "Research Papers", value: "200+" },
  { icon: Trophy, label: "Years of Excellence", value: "15+" }
]

export function DepartmentStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <Card className="glass-card hover-lift p-6 h-full">
            <CardContent className="p-0">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}