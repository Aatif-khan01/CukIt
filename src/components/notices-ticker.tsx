import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock notices data - will be replaced with backend data
const mockNotices = [
  "New B.Tech IT batch admissions open for 2024-25 academic year",
  "Final year project presentations scheduled for March 15-20, 2024",
  "Industry expert workshop on AI/ML on February 28, 2024",
  "Mid-term examination timetable published - Check academic portal"
]

export function NoticesTicker() {
  const [currentNotice, setCurrentNotice] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (mockNotices.length > 1) {
      const interval = setInterval(() => {
        setCurrentNotice((prev) => (prev + 1) % mockNotices.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [])

  if (!isVisible || mockNotices.length === 0) return null

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className="fixed top-20 left-0 right-0 z-40 bg-gradient-primary text-white shadow-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <Bell className="w-5 h-5 text-white/90 flex-shrink-0" />
            <div className="flex-1 min-w-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentNotice}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-medium truncate"
                >
                  {mockNotices[currentNotice]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {mockNotices.length > 1 && (
              <div className="hidden sm:flex space-x-1">
                {mockNotices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNotice(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentNotice ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="w-8 h-8 text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}