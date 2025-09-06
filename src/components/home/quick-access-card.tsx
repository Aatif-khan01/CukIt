import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface QuickAccessCardProps {
  title: string
  icon: LucideIcon
  link: string
  color: string
  index: number
}

export function QuickAccessCard({ title, icon: Icon, link, color, index }: QuickAccessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={link} className="block">
        <Card className="glass-card hover-lift cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <ArrowRight className="w-4 h-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}