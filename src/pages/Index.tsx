import { motion, useReducedMotion } from "framer-motion";
import { Layout } from "@/components/layout";
import { HeroSection } from "@/components/hero-section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpen,
  Calendar,
  Award,
  Mail,
  Phone,
  User,
  ArrowRight,
  GraduationCap,
  Building,
  Trophy,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

// Types
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Stat = {
  icon: IconType;
  value: string;
  label: string;
  key: string;
};

type Program = {
  key: string;
  title: string;
  duration: string;
  description: string;
};

type Faculty = {
  key: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
};

// Motion helpers
const fadeUp = (y = 50) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
});

const fadeItem = (y = 30) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
});

// Sample content (replace with live data)
const stats: Stat[] = [
  { key: "students", icon: Users, value: "800+", label: "Active Students" },
  { key: "faculty", icon: User, value: "35+", label: "Faculty Members" },
  { key: "awards", icon: Trophy, value: "20+", label: "Awards & Honors" },
  { key: "research", icon: Award, value: "25+", label: "Research Projects" },
];

const programs: Program[] = [
  {
    key: "btech-cse",
    title: "B.Tech in CSE",
    duration: "4 Years",
    description:
      "A rigorous, industry-aligned undergraduate program focusing on core CS fundamentals and hands-on engineering.",
  },
  {
    key: "mtech-cs",
    title: "M.Tech in Computer Science",
    duration: "2 Years",
    description:
      "Advanced study with research-led coursework in AI, systems, security, and data-intensive computing.",
  },
  {
    key: "pg-diploma",
    title: "PG Diploma in Data Science",
    duration: "1 Year",
    description:
      "Application-focused program covering data engineering, analytics, and machine learning practices.",
  },
];

const featuredFaculty: Faculty[] = [
  {
    key: "yash-paul",
    name: "Dr. Yash Paul",
    role: "Coordinator & Head of Department",
    email: "yash.paul@example.edu",
    phone: "+91-9876543210",
    avatarUrl: "/images/faculty/yash-paul.jpg",
  },
  {
    key: "aisha-khan",
    name: "Dr. Aisha Khan",
    role: "Associate Professor, Cybersecurity",
    email: "aisha.khan@example.edu",
    avatarUrl: "/images/faculty/aisha-khan.jpg",
  },
  {
    key: "arun-mehta",
    name: "Prof. Arun Mehta",
    role: "Assistant Professor, Data Systems",
    phone: "+91-9012345678",
    avatarUrl: "/images/faculty/arun-mehta.jpg",
  },
];

const Index = () => {
  const prefersReducedMotion = useReducedMotion();
  const baseDelay = prefersReducedMotion ? 0 : 0.1;

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department Overview + Stats */}
        <motion.section
          {...fadeUp(50)}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 lg:py-20"
          aria-labelledby="dept-overview-heading"
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 id="dept-overview-heading" className="text-4xl lg:text-5xl font-bold mb-6">
              Department of <span className="gradient-text">Information Technology</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A hub for innovation and research excellence, developing future technology leaders with world-class
              faculty and modern facilities for an exceptional learning experience.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4 sm:mb-6 lg:mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.key}
                  {...fadeItem(30)}
                  viewport={{ once: true }}
                  transition={{ delay: index * baseDelay, duration: 0.4 }}
                  className="text-center"
                >
                  <Card className="glass-card hover-lift p-6 h-full">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

{/* Message from Coordinator & HOD */}
<motion.section
  {...fadeUp(40)}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="mb-8 lg:mb-16"
  aria-labelledby="hod-message-heading"
>
  <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      {/* Image */}
      <div className="lg:col-span-1">
        <div className="w-40 h-40 sm:w-52 sm:h-52 mx-auto rounded-3xl p-[6px] bg-gradient-to-br from-primary to-purple-500">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10">
            {/* Replace with your actual HOD image path */}
            <img
              src="/images/hod.jpg"
              alt="Dr. Yash Paul, Coordinator and Head of Department"
              className="w-full h-full object-cover"
              loading="lazy"
              width={208}
              height={208}
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="lg:col-span-2 space-y-6">
        <header>
          <h2 id="hod-message-heading" className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
            Message from Coordinator & HOD
          </h2>
          <p className="text-primary font-medium">
            Dr. Yash Paul — Coordinator & Head of Department
          </p>
        </header>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            It is with great excitement and pride that I welcome you to the Department of Information Technology at the Central University of Kashmir. 
            This marks a significant milestone in our collective journey, symbolizing a new chapter in our department’s story—one dedicated to capturing 
            the essence of our academic pursuits, our groundbreaking achievements, and the vibrant spirit of collaboration that defines us.
          </p>
          <p>
            The realm of Information Technology is not merely evolving; it is accelerating at a breathtaking pace, continuously redefining the limits of 
            what is possible. From the intricate algorithms of artificial intelligence and machine learning that anticipate our needs, to the robust frameworks 
            of cybersecurity that safeguard our digital lives, and the distributed architectures of blockchain and cloud computing that power modern enterprises—
            these are not just subjects we teach, but the very fabric of the future we are helping to shape.
          </p>
          <p>
            In this dynamic and demanding landscape, our mission is clear: to provide an education that is both deeply foundational and fiercely contemporary, 
            ensuring our graduates are not just participants but architects of the global tech ecosystem.
          </p>
          <p>
            At the Department of Information Technology, we have consciously built a learning environment alive with possibility. Our programs, designed in line 
            with the guiding principles of the National Education Policy (NEP) 2020, promote a holistic, flexible, and experiential model of education. We believe 
            true learning happens at the intersection of theory and practice. That is why our pedagogy is enriched with industry-driven projects, cutting-edge 
            research opportunities with faculty, internships at leading tech firms, and a vibrant calendar of competitive events such as coding marathons and 
            cybersecurity capture-the-flag exercises.
          </p>
          <p>
            These experiences are indispensable, transforming abstract knowledge into tangible skill and fostering essential qualities such as leadership, 
            teamwork, and resilient problem-solving.
          </p>
          <p>
            None of this would be possible without the collective effort of our incredible community. I extend my sincerest appreciation to our faculty members, 
            whose mentorship extends far beyond the classroom and whose research endeavors set a powerful example. To our students, your curiosity and drive to excel 
            are the true inspiration behind our progress.
          </p>
          <p>
            As we continue to grow, I invite each one of you to actively contribute to our shared journey—through your projects, research, innovations, and perspectives 
            on emerging technologies. Together, let us build a dynamic academic and professional space that reflects our highest aspirations, amplifies our successes, 
            and captures the limitless potential we hold as the IT community of Central University of Kashmir.
          </p>
        </div>
      </div>
    </div>
  </div>
</motion.section>
        {/* Programs Section */}
        <motion.section
          {...fadeUp(50)}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 lg:py-20"
          aria-labelledby="programs-heading"
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 id="programs-heading" className="text-4xl lg:text-5xl font-bold mb-6">
              Academic <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive programs designed to prepare students for successful careers in Computer Science and
              Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.key}
                {...fadeItem(30)}
                viewport={{ once: true }}
                transition={{ delay: index * (prefersReducedMotion ? 0 : 0.2), duration: 0.4 }}
              >
                <Card className="glass-card hover-lift h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                      <GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold">{program.title}</h3>
                    <Badge variant="secondary" className="w-fit">
                      {program.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{program.description}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/programs" aria-label={`Learn more about ${program.title}`}>
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Faculty Section */}
        <motion.section
          {...fadeUp(50)}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 lg:py-20"
          aria-labelledby="faculty-heading"
        >
          <div className="text-center mb-12">
            <h2 id="faculty-heading" className="text-3xl lg:text-4xl font-bold">
              Featured <span className="gradient-text">Faculty</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFaculty.map((f, index) => (
              <motion.div
                key={f.key}
                {...fadeItem(30)}
                viewport={{ once: true }}
                transition={{ delay: index * baseDelay, duration: 0.4 }}
              >
                <Card className="glass-card hover-lift h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-muted flex items-center justify-center">
                      {f.avatarUrl ? (
                        <img
                          src={f.avatarUrl}
                          alt={`${f.name}, ${f.role}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={64}
                          height={64}
                        />
                      ) : (
                        <User className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.role}</p>
                      <div className="flex items-center gap-3 text-sm">
                        {f.email && (
                          <a className="inline-flex items-center gap-1 text-primary hover:underline" href={`mailto:${f.email}`}>
                            <Mail className="w-4 h-4" aria-hidden="true" />
                            Email
                          </a>
                        )}
                        {f.phone && (
                          <a className="inline-flex items-center gap-1 text-primary hover:underline" href={`tel:${f.phone}`}>
                            <Phone className="w-4 h-4" aria-hidden="true" />
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {featuredFaculty.length === 0 && (
            <p className="text-center text-muted-foreground">
              Featured faculty will appear here.
            </p>
          )}
        </motion.section>

        {/* Quick Actions Section */}
        <motion.section
          {...fadeUp(50)}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-16 lg:py-20"
          aria-labelledby="quick-access-heading"
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 id="quick-access-heading" className="text-4xl lg:text-5xl font-bold mb-6">
              Quick <span className="gradient-text">Access</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: "materials", title: "Study Materials", icon: BookOpen, link: "/study-materials", color: "from-blue-600 to-purple-600" },
              { key: "events", title: "Events & Notices", icon: Calendar, link: "/events", color: "from-green-600 to-teal-600" },
              { key: "gallery", title: "Gallery", icon: Building, link: "/gallery", color: "from-orange-600 to-red-600" },
              { key: "contact", title: "Contact Us", icon: Globe, link: "/contact", color: "from-indigo-600 to-blue-600" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  {...fadeItem(30)}
                  viewport={{ once: true }}
                  transition={{ delay: index * baseDelay, duration: 0.4 }}
                >
                  <Link to={item.link} className="block" aria-label={item.title}>
                    <Card className="glass-card hover-lift cursor-pointer group">
                      <CardContent className="p-8 text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Index;
