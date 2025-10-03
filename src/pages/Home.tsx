import { motion } from "framer-motion"
import { useState } from "react"
import { Layout } from "@/components/layout"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, Building, Globe, ArrowRight, Target, Eye, Users, Award, FileText } from "lucide-react"
import { Link } from "react-router-dom"

import { SectionHeader } from "@/components/home/section-header"
import { DepartmentStats } from "@/components/home/department-stats"
import { FacultyCard } from "@/components/home/faculty-card"
import { ProgramCard } from "@/components/home/program-card"
import { QuickAccessCard } from "@/components/home/quick-access-card"
import { CoordinatorMessage } from "@/components/CoordinatorMessage"
import { DepartmentInfoSection } from "@/components/home/department-info-section"

import { useFeaturedFaculty } from "@/hooks/useFaculty"
import { usePrograms } from "@/hooks/usePrograms"
import { LoadingGrid } from "@/components/loading-spinner"
import { useEvents, type Event } from "@/hooks/useEvents"
import { usePublishedNews, type News } from "@/hooks/useNews"

// Import the background image from src/assets
import campusImage from "@/assets/campus.jpg"

export default function Home() {
  const [showFullCoordinatorMessage, setShowFullCoordinatorMessage] = useState(false)
  const { faculty: featuredFaculty, loading: facultyLoading } = useFeaturedFaculty()
  const { programs, loading: programsLoading } = usePrograms()
  const { events, loading: eventsLoading } = useEvents()
  const { news, loading: newsLoading } = usePublishedNews()

  return (
    <Layout>
      {/* Hero Section with z-index to prevent overlap */}
      <div className="relative z-[1]">
        <HeroSection />
      </div>

      {/* Department Info Section */}
      <div className="relative z-[1]">
        <DepartmentInfoSection />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 lg:space-y-24 relative z-10">
        {/* HOD Message Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader 
            title="Message from"
            highlightText="Coordinator"
            description="A warm welcome from our department leadership"
          />

          <Card className="glass-card rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mx-auto rounded-3xl p-[6px] bg-gradient-to-br from-primary to-purple-500">
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10">
                    <img
                      src="/assets/HOD.jpg"
                      alt="Dr. Yash Paul, Coordinator and Head of Department"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={288}
                      height={288}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <header>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
                    Message from Coordinator & HOD
                  </h3>
                  <p className="text-primary font-medium">
                    Dr. Yash Paul — Coordinator & Head of Department
                  </p>
                </header>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    It is with great excitement and pride that I welcome you to the Department of Information Technology at the Central University of Kashmir. This marks a significant milestone in our collective journey, symbolizing a new chapter in our department's story one dedicated to capturing the essence of our academic pursuits, our groundbreaking achievements, and the vibrant spirit of collaboration that defines us.
                  </p>

                  {showFullCoordinatorMessage && (
                    <>
                      <p>
                        The realm of Information Technology is not merely evolving; it is accelerating at a breathtaking pace, continuously redefining the limits of what is possible. From the intricate algorithms of artificial intelligence and machine learning that anticipate our needs, to the robust frameworks of cybersecurity that safeguard our digital lives, and the distributed architectures of blockchain and cloud computing that power modern enterprises these are not just subjects we teach, but the very fabric of the future we are helping to shape.
                      </p>
                      <p>
                        In this dynamic and demanding landscape, our mission is clear: to provide an education that is both deeply foundational and fiercely contemporary, ensuring our graduates are not just participants but architects of the global tech ecosystem. At the Department of Information Technology, we have consciously built a learning environment alive with possibility. Our programs, designed in line with the guiding principles of the National Education Policy (NEP) 2020, promote a holistic, flexible, and experiential model of education.
                      </p>
                      <p>
                        We believe true learning happens at the intersection of theory and practice. That is why our pedagogy is enriched with industry-driven projects, cutting-edge research opportunities with faculty, internships at leading tech firms, and a vibrant calendar of competitive events such as coding marathons and cybersecurity capture-the-flag exercises. These experiences are indispensable, transforming abstract knowledge into tangible skill and fostering essential qualities such as leadership, teamwork, and resilient problem-solving.
                      </p>
                      <p>
                        None of this would be possible without the collective effort of our incredible community. I extend my sincerest appreciation to our faculty members, whose mentorship extends far beyond the classroom and whose research endeavours set a powerful example. To our students, your curiosity and drive to excel are the true inspiration behind our progress.
                      </p>
                      <p>
                        As we continue to grow, I invite each one of you to actively contribute to our shared journey through your projects, research, innovations, and perspectives on emerging technologies. Together, let us build a dynamic academic and professional space that reflects our highest aspirations, amplifies our successes, and captures the limitless potential we hold as the IT community of Central University of Kashmir.
                      </p>
                    </>
                  )}

                  <div>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => setShowFullCoordinatorMessage((prev) => !prev)}
                    >
                      {showFullCoordinatorMessage ? "Read Less" : "Read More"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Mission & Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="-mt-8 sm:-mt-12 lg:-mt-16"
        >
          <SectionHeader 
            title="Our Mission &"
            highlightText="Vision"
            description="Guiding principles that drive our commitment to excellence in IT education"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To provide world-class education in Information Technology and foster innovation through cutting-edge research and industry collaboration."
              },
              {
                icon: Eye,
                title: "Our Vision", 
                description: "To be a leading IT department recognized globally for excellence in education, research, and technological advancement."
              },
              {
                icon: Users,
                title: "Student Focus",
                description: "Empowering students with practical skills, theoretical knowledge, and entrepreneurial mindset to excel in the digital age."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Committed to academic excellence, research innovation, and producing industry-ready IT professionals."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card hover-lift h-full">
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Department Overview */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 -mt-8 sm:-mt-12 lg:-mt-16"
        >
          <SectionHeader 
            title="Department of"
            highlightText="Information Technology"
            description="Central University of Kashmir's Department of Information Technology is a premier institution dedicated to fostering innovation, research excellence, and developing future technology leaders. Our world-class faculty and state-of-the-art facilities provide students with an unparalleled learning experience in the ever-evolving field of Information Technology."
            maxWidth="max-w-4xl"
          />

          <DepartmentStats />
        </motion.section>

        {/* Notices & Updates Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader 
            title="Notices &"
            highlightText="Updates"
            description="Recent notices, events, and announcements"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <Card className="glass-card h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Latest Notices</h3>
                </div>
                <div className="space-y-4">
                  {(newsLoading ? Array.from({ length: 3 }) : news.slice(0,3)).map((item: News | null, idx: number) => (
                    <div key={idx} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-foreground/90 line-clamp-2">
                          {newsLoading ? 'Loading…' : item?.title}
                        </p>
                        {!newsLoading && item && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.publish_date ? new Date(item.publish_date).toLocaleDateString() : new Date(item.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/events">View all updates</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Upcoming Events</h3>
                </div>
                <div className="space-y-4">
                  {(eventsLoading ? Array.from({ length: 3 }) : events.slice(0,3)).map((event: Event | null, idx: number) => (
                    <div key={idx} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-foreground/90 line-clamp-2">
                          {eventsLoading ? 'Loading…' : event?.title}
                        </p>
                        {!eventsLoading && event && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(event.date_time).toLocaleDateString()} • {event.venue}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/events">View calendar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Programs Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader 
            title="Academic"
            highlightText="Programs"
            description="Comprehensive programs designed to prepare students for successful careers in Computer Science and Engineering"
          />

          {programsLoading ? (
            <LoadingGrid items={3} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" cardClassName="h-96" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {programs.slice(0, 3).map((program, index) => (
                <ProgramCard key={program.id} program={program} index={index} />
              ))}
            </div>
          )}
        </motion.section>

        {/* Featured Faculty Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader 
            title="Meet Our"
            highlightText="Faculty"
            description="Our distinguished faculty members are industry experts and research pioneers who mentor the next generation of technology innovators"
          />

          <div className="mb-8 sm:mb-12">
            {facultyLoading ? (
              <LoadingGrid items={4} cardClassName="h-80" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {featuredFaculty.map((faculty, index) => (
                  <FacultyCard key={faculty.id} faculty={faculty} index={index} />
                ))}
              </div>
            )}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/faculty">
                View All Faculty
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div 
            className="glass-card rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
            style={{
              backgroundImage: `url(${campusImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
            
            {/* Content with relative positioning to appear above overlay */}
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to Start Your
                <span className="gradient-text block">IT Journey?</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Join our vibrant community of learners and innovators. Explore our programs, 
                connect with our faculty, and discover endless opportunities in Information Technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary text-white hover:shadow-glow" asChild>
                  <Link to="/programs">
                    Explore Programs
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass-card hover:bg-primary/10 text-white border-white/30" asChild>
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader 
            title="Quick"
            highlightText="Access"
            description="Easily navigate to key sections of our department website"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Content", icon: BookOpen, link: "/study-materials", color: "from-blue-600 to-purple-600" },
              { title: "Events & Notices", icon: Calendar, link: "/events", color: "from-green-600 to-teal-600" },
              { title: "Gallery", icon: Building, link: "/gallery", color: "from-orange-600 to-red-600" },
              { title: "Contact Us", icon: Globe, link: "/contact", color: "from-indigo-600 to-blue-600" }
            ].map((item, index) => (
              <QuickAccessCard 
                key={index}
                title={item.title}
                icon={item.icon}
                link={item.link}
                color={item.color}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}
