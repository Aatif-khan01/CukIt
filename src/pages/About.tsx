'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Layout } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import {
  Target,
  Eye,
  Users,
  Award,
} from 'lucide-react';
import aboutHero from '@/assets/about-hero.jpg';

// Correct image imports (PNG format as per your folder)
import CollaborationImg from '@/assets/Collabiration.png';
import InnovationImg from '@/assets/Innovation.png';
import IntegrityImg from '@/assets/Integrity.png';
import GrowthImg from '@/assets/Growth.png';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Highlight = {
  icon: IconType;
  title: string;
  description: string;
};

type CoreValue = {
  image: string;
  title: string;
  description: string;
};

type TimelineItem = {
  year: string;
  event: string;
};

const highlights: Highlight[] = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To provide world-class education in Information Technology and foster innovation through cutting-edge research and industry collaboration.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be a leading IT department recognized globally for excellence in education, research, and technological advancement.',
  },
  {
    icon: Users,
    title: 'Student Focus',
    description:
      'Empowering students with practical skills, theoretical knowledge, and entrepreneurial mindset to excel in the digital age.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'Committed to academic excellence, research innovation, and producing industry-ready IT professionals.',
  },
];

const coreValues: CoreValue[] = [
  {
    image: InnovationImg,
    title: 'Innovation',
    description:
      'Encouraging creativity and embracing emerging technologies to solve real-world problems.',
  },
  {
    image: IntegrityImg,
    title: 'Integrity',
    description:
      'Upholding strong ethical values in education, research, and professional practices.',
  },
  {
    image: CollaborationImg,
    title: 'Collaboration',
    description:
      'Building strong partnerships with industry, academia, and the community.',
  },
  {
    image: GrowthImg,
    title: 'Growth',
    description:
      'Fostering continuous learning and professional development among students and faculty.',
  },
];

const timeline: TimelineItem[] = [
  { year: '2012', event: 'Department of IT established with first batch of students' },
  { year: '2015', event: 'Launched specialized research in Artificial Intelligence and Networks' },
  { year: '2018', event: 'Partnerships with industry leaders for internships and training' },
  { year: '2021', event: 'Introduced advanced labs in Cybersecurity & Data Science' },
  { year: '2024', event: 'Cross-disciplinary research collaborations across universities' },
];

// Motion helpers
const fadeUp = (y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
} as const);

const fadeLeft = (x = -30) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0 },
} as const);

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const baseDelay = prefersReducedMotion ? 0 : 0.1;

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">Our Department</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Shaping future innovators through excellence in Information Technology education and research
            </p>
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* HOD Message Section */}
        <motion.section
          aria-labelledby="hod-heading"
          className="glass-card rounded-2xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16"
          {...fadeUp(40)}
          transition={{ delay: prefersReducedMotion ? 0 : 0.6, duration: 0.5 }}
        >
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
                <h2 id="hod-heading" className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
                  Message from Coordinator & HOD
                </h2>
                <p className="text-primary font-medium">
                  Dr. Yash Paul, Coordinator & Head of Department
                </p>
              </header>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>It is with great excitement and pride that I welcome you to the Department of Information Technology at the Central University of Kashmir. This marks a significant milestone in our collective journey, symbolizing a new chapter in our department's story one dedicated to capturing the essence of our academic pursuits, our groundbreaking achievements, and the vibrant spirit of collaboration that defines us.</p>
                <p>The realm of Information Technology is not merely evolving; it is accelerating at a breathtaking pace, continuously redefining the limits of what is possible. From the intricate algorithms of artificial intelligence and machine learning that anticipate our needs, to the robust frameworks of cybersecurity that safeguard our digital lives, and the distributed architectures of blockchain and cloud computing that power modern enterprises these are not just subjects we teach, but the very fabric of the future we are helping to shape.</p>
                <p>In this dynamic and demanding landscape, our mission is clear: to provide an education that is both deeply foundational and fiercely contemporary, ensuring our graduates are not just participants but architects of the global tech ecosystem. At the Department of Information Technology, we have consciously built a learning environment alive with possibility. Our programs, designed in line with the guiding principles of the National Education Policy (NEP) 2020, promote a holistic, flexible, and experiential model of education.</p>
                <p>We believe true learning happens at the intersection of theory and practice. That is why our pedagogy is enriched with industry-driven projects, cutting-edge research opportunities with faculty, internships at leading tech firms, and a vibrant calendar of competitive events such as coding marathons and cybersecurity capture-the-flag exercises. These experiences are indispensable, transforming abstract knowledge into tangible skill and fostering essential qualities such as leadership, teamwork, and resilient problem-solving.</p>
                <p>None of this would be possible without the collective effort of our incredible community. I extend my sincerest appreciation to our faculty members, whose mentorship extends far beyond the classroom and whose research endeavours set a powerful example. To our students, your curiosity and drive to excel are the true inspiration behind our progress.</p>
                <p>As we continue to grow, I invite each one of you to actively contribute to our shared journey through your projects, research, innovations, and perspectives on emerging technologies. Together, let us build a dynamic academic and professional space that reflects our highest aspirations, amplifies our successes, and captures the limitless potential we hold as the IT community of Central University of Kashmir.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission, Vision, Student Focus, Excellence Cards */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp(30)}
                  transition={{ delay: idx * baseDelay, duration: 0.4 }}
                >
                  <Card className="glass-card hover-lift h-full">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Core Values Section */}
        <motion.section
          aria-labelledby="values-heading"
          className="mb-12 sm:mb-16"
          {...fadeUp(40)}
          transition={{ delay: prefersReducedMotion ? 0 : 0.7, duration: 0.5 }}
        >
          <h2 id="values-heading" className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={value.title}
                {...fadeUp(30)}
                transition={{ delay: idx * baseDelay, duration: 0.4 }}
              >
                <Card className="glass-card hover-lift h-full">
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-20 h-20 mx-auto mb-4 rounded-xl object-contain shadow-lg bg-white/80 p-2"
                    />
                    <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Department Highlights */}
        <motion.section
          aria-labelledby="highlights-heading"
          className="text-center mb-12 sm:mb-16"
          {...fadeUp(40)}
          transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: 0.5 }}
        >
          <h2 id="highlights-heading" className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Department Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">10+</div>
              <div className="text-base sm:text-lg font-medium mb-2">Years of Excellence</div>
              <p className="text-sm text-muted-foreground">
                A decade of providing quality IT education and research opportunities
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1 sm:mb-2">500+</div>
              <div className="text-base sm:text-lg font-medium mb-2">Graduates</div>
              <p className="text-sm text-muted-foreground">
                Alumni working in leading tech companies worldwide
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl hover-lift">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-1 sm:mb-2">25+</div>
              <div className="text-base sm:text-lg font-medium mb-2">Research Projects</div>
              <p className="text-sm text-muted-foreground">
                Ongoing research in emerging technologies and applications
              </p>
            </div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          aria-labelledby="journey-heading"
          className="mb-12 sm:mb-16"
          {...fadeUp(40)}
          transition={{ delay: prefersReducedMotion ? 0 : 0.9, duration: 0.5 }}
        >
          <h2 id="journey-heading" className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
            Our Journey
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/70 to-primary/30"></div>
            <div className="space-y-8">
              {timeline.map((item, idx) => (
                <motion.article
                  key={`${item.year}-${item.event.slice(0, 12)}`}
                  {...fadeLeft(30)}
                  transition={{ delay: idx * (prefersReducedMotion ? 0 : 0.2), duration: 0.4 }}
                  className="relative flex items-start gap-6"
                  aria-label={`Milestone ${idx + 1}: ${item.year}`}
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg ring-4 ring-background">
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-2">
                    <div className="glass-card p-6 rounded-xl hover-lift">
                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">{item.year}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{item.event}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
