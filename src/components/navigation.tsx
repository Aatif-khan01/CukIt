import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ChevronDown,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  Camera,
  Phone,
  Home,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Programs", href: "/programs", icon: GraduationCap },
  { name: "Faculty", href: "/faculty", icon: Users },
  { name: "Content", href: "/study-materials", icon: BookOpen },
  { 
    name: "Notices", 
    href: "/events", 
    icon: Calendar,
    submenu: [
      { name: "Events", href: "/events" },
      { name: "Notices", href: "/notices" }
    ]
  },
  { name: "Gallery", href: "/gallery", icon: Camera },
  { name: "Contact", href: "/contact", icon: Phone },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  // Check if we're on the home page
  const isHomePage = location.pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isOpen || !isHomePage // Always show background if not on home page
          ? "glass-card backdrop-blur-xl border-b border-glass-border/50"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">CUK IT</h1>
              <p className="text-xs text-muted-foreground">Department of Information Technology</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 ml-auto">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-glass/50",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10 border border-primary/20"
                      : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <motion.div 
                      className="glass-card rounded-lg shadow-lg p-2 min-w-[160px]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="block px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-primary/10 rounded-md transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button - HOME PAGE SPECIFIC FIX */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200",
                "relative z-10", // Ensure it's above other content
                // Different styling based on home page and scroll state
                isHomePage && !scrolled && !isOpen
                  ? "bg-black/30 backdrop-blur-sm border border-white/30 text-white hover:bg-black/40 hover:border-white/40"
                  : "text-white hover:bg-white/10 focus:ring-2 focus:ring-white/20 border border-transparent hover:border-white/20",
                isOpen && "bg-white/10 border-white/20"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-7 w-7 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-7 w-7 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-glass-border/50 backdrop-blur-xl bg-background/95"
            >
              <div className="py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      delay: index * 0.05, 
                      duration: 0.2,
                      ease: "easeOut" 
                    }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        location.pathname === item.href
                          ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                          : "text-foreground/90 hover:text-foreground hover:bg-glass/50 hover:border-glass-border/30 border border-transparent"
                      )}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </Link>

                    {/* Mobile submenu items */}
                    {item.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            to={subitem.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center space-x-3 px-4 py-2 mx-2 rounded-lg transition-all duration-200 text-sm",
                              location.pathname === subitem.href
                                ? "bg-primary/5 text-primary"
                                : "text-foreground/70 hover:text-foreground hover:bg-glass/30"
                            )}
                          >
                            <div className="w-1 h-1 bg-current rounded-full shrink-0" />
                            <span>{subitem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
