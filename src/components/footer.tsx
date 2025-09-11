import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  GraduationCap
} from "lucide-react"

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Faculty", href: "/faculty" },
  { name: "Content", href: "/study-materials" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin" }
]

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/cukashmirofficial", icon: Facebook },
  { name: "Twitter", href: "https://x.com/cukmrofficial", icon: Twitter },
  { name: "Instagram", href: "https://www.instagram.com/cukmrofficial/", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin }
]

export function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-glass-border/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Department Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">CUK IT</h3>
                  <p className="text-sm text-muted-foreground">Empowering Future with Technology</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Central University of Kashmir - Department of Information Technology. 
                Shaping future innovators through cutting-edge education and research.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-foreground">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Central University of Kashmir<br />
                    Tulmulla, Jammu and Kashmir<br />
                    191131, India
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">+91-XXXX-XXXXXX</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">it@cukashmir.ac.in</p>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-foreground">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Stay connected for latest updates and announcements
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glass-border/50 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Central University of Kashmir - IT Department. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
