import { motion } from "framer-motion";
import { Target, Lightbulb, GraduationCap, Users } from "lucide-react";
import itLabStudents from "@/assets/it-lab-students.jpg";
import cukCampus from "@/assets/cuk-campus.jpg";
import techInnovation from "@/assets/tech-innovation.jpg";

const missionPoints = [
  {
    icon: GraduationCap,
    text: "Deliver a curriculum that balances strong fundamentals in computing with hands-on labs, projects, and exposure to current technologies."
  },
  {
    icon: Lightbulb,
    text: "Encourage research, innovation, and interdisciplinary collaboration to solve real-world challenges."
  },
  {
    icon: Users,
    text: "Equip students with skills—technical, ethical, and soft skills—to thrive in industry, academia, or entrepreneurship."
  },
  {
    icon: Target,
    text: "Foster an environment that supports continuous learning, adaptability, and societal relevance."
  }
];

export function DepartmentInfoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 bg-gradient-to-br from-muted/30 to-muted/10 p-6 rounded-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden hover-lift"
            >
              <img
                src={itLabStudents}
                alt="IT Students in Lab"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden hover-lift"
            >
              <img
                src={cukCampus}
                alt="CUK Campus"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="col-span-2 relative rounded-2xl overflow-hidden hover-lift"
            >
              <img
                src={techInnovation}
                alt="Technology Innovation"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white mb-2">What We Deliver</h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Scrolling Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 bg-gradient-to-br from-muted/10 to-transparent p-6 rounded-3xl"
          >
            {/* Header */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-4"
              >
                <span className="gradient-text">Information Technology</span>
                <br />
                <span className="text-foreground">Department</span>
              </motion.h2>
              <p className="text-lg text-muted-foreground">
                Central University of Kashmir
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-4">
              <div className="space-y-6">
                {/* About Us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 gradient-text">About Us</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The Department of Information Technology (part of the School of Engineering & Technology) 
                    at Central University of Kashmir is committed to imparting high‐quality education in IT, 
                    fostering cutting-edge research, and preparing students for the evolving demands of the 
                    digital era. The department combines strong theoretical foundations with rich practical 
                    exposure to ensure students emerge as competent, innovative, and socially responsible IT 
                    professionals.
                  </p>
                </motion.div>

                {/* Vision */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 gradient-text">Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be recognized as a centre of excellence in Information Technology, advancing knowledge, 
                    innovations, and applications that contribute to regional development and to meet global 
                    standards.
                  </p>
                </motion.div>

                {/* Mission */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4 gradient-text">Mission</h3>
                  <div className="space-y-4">
                    {missionPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4 items-start"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                          <point.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed pt-2">
                          {point.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Infrastructure & Facilities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 gradient-text">Infrastructure & Facilities</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Well-equipped computer labs with modern hardware and high-speed internet connectivity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Access to software tools, development environments, and platforms needed for research and projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Support for student projects, labs, seminars, workshops, guest lectures by industry professionals</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Research & Collaboration */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 gradient-text">Research & Collaboration</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Encouragement of research in emerging areas of IT, including but not limited to machine learning, AI, big data, network security, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Opportunities to collaborate with industry and academic partners in the region and beyond</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Why Choose Us */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-3 gradient-text">Why Choose Us?</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>A blend of strong academics + practical training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Opportunities to work on real projects and internships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Supportive faculty and a culture of innovation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Good infrastructure & resources to facilitate learning & research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Focused on producing professionals who can adapt to rapid changes in technology</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
