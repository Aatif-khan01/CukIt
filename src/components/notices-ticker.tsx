import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock notices data - will be replaced with backend data
const mockNotices = ["New B.Tech IT batch admissions open for 2024-25 academic year", "Final year project presentations scheduled for March 15-20, 2024", "Industry expert workshop on AI/ML on February 28, 2024", "Mid-term examination timetable published - Check academic portal"];
export function NoticesTicker() {
  const [currentNotice, setCurrentNotice] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (mockNotices.length > 1) {
      const interval = setInterval(() => {
        setCurrentNotice(prev => (prev + 1) % mockNotices.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);
  if (!isVisible || mockNotices.length === 0) return null;
  return <motion.div initial={{
    y: -50,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} exit={{
    y: -50,
    opacity: 0
  }} className="fixed top-20 left-0 right-0 z-40 bg-gradient-primary text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
      </div>
    </motion.div>;
}
