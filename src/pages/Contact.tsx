import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Users,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

// Icon type compatible with lucide-react icons
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Interfaces / Types
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface InfoBlock {
  key: string;
  icon: IconType;
  title: string;
  details: string[];
}

interface QuickContact {
  key: string;
  role: string;
  name: string;
  email: string;
  phone: string;
}

interface SocialLink {
  key: string;
  icon: IconType;
  name: string;
  url: string;
}

// Motion helpers
const fadeInUp = (distance = 30) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
});

const fadeInLeft = (distance = 30) => ({
  initial: { opacity: 0, x: -distance },
  animate: { opacity: 1, x: 0 },
});

const fadeInRight = (distance = 30) => ({
  initial: { opacity: 0, x: distance },
  animate: { opacity: 1, x: 0 },
});

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });
  const { toast } = useToast();

  // Simple inline validation
  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.subject.trim()) e.subject = "Subject is required.";
    if (!formData.message.trim()) e.message = "Message is required.";
    return e;
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof FormData]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name as keyof FormData]: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Mark all fields as touched if submitting with errors
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Please fix the highlighted fields",
        description: "Some required information is missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate async submit
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTouched({
        name: false,
        email: false,
        phone: false,
        subject: false,
        message: false,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo: InfoBlock[] = [
    {
      key: "address",
      icon: MapPin,
      title: "Address",
      details: [
        "Department of Information Technology",
        "Central University of Kashmir",
        "Tulmulla, Jammu and Kashmir, 191131",
        "India",
      ],
    },
    {
      key: "phone",
      icon: Phone,
      title: "Phone",
      details: ["+91-194-2414000", "+91-194-2414001 (Dept.)"],
    },
    {
      key: "email",
      icon: Mail,
      title: "Email",
      details: ["it.dept@cukashmir.ac.in", "admissions@cukashmir.ac.in"],
    },
    {
      key: "hours",
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 5:00 PM",
        "Saturday: Closed",
        "Sunday: Closed",
      ],
    },
  ];

  const quickContacts: QuickContact[] = [
    {
      key: "hod",
      role: "Coordinator & Head of Department",
      name: "Dr. Yash Paul",
      email: "yash_99yash@yahoo.co.in",
      phone: "+91-9622603978",
    },
    {
      key: "--",
      role: "Sr. Assistant Professor",
      name: "Dr. Zahoor Ahmad",
      email: "--",
      phone: "+91-9419505159",
    },
    {
      key: "admissions",
      role: "Assistant Professor",
      name: "Mr. Amjad Hussain",
      email: "--",
      phone: "+91-9419725792",
    },
  ];

  const socialLinks: SocialLink[] = [
    { key: "facebook", icon: Facebook, name: "Facebook", url: "https://www.facebook.com/cukashmirofficial" },
    { key: "twitter", icon: Twitter, name: "Twitter", url: "https://x.com/cukmrofficial" },
    { key: "linkedin", icon: Linkedin, name: "LinkedIn", url: "#" },
    { key: "instagram", icon: Instagram, name: "Instagram", url: "https://www.instagram.com/cukmrofficial/" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          {...fadeInUp(30)}
          className="text-center mb-16"
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our programs, admissions, or research opportunities?
            We&apos;re here to help take the next step in a technology journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Left: Contact Form */}
          <motion.div
            {...fadeInLeft(30)}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card">
              <CardHeader className="pb-0">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll respond as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        aria-invalid={!!(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                        required
                      />
                      {touched.name && errors.name && (
                        <p id="name-error" className="text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email address"
                        aria-invalid={!!(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                        required
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" className="text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="What is this about?"
                        aria-invalid={!!(touched.subject && errors.subject)}
                        aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
                        required
                      />
                      {touched.subject && errors.subject && (
                        <p id="subject-error" className="text-sm text-red-500">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      aria-invalid={!!(touched.message && errors.message)}
                      aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                      required
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div aria-live="polite" className="sr-only">
                    {isSubmitting ? "Sending message..." : "Ready to submit"}
                  </div>

                  <Button
                    type="submit"
                    className="w-full gradient-primary text-white"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                    {isSubmitting ? "Sending..." : null}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: Sidebar with nicely placed boxes */}
          <motion.aside
            {...fadeInRight(30)}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            {/* Contact Information (first) */}
            <Card className="glass-card">
              <CardHeader className="pb-0">
                <h3 className="text-xl font-bold">Contact Information</h3>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {contactInfo.map(info => {
                  const Icon = info.icon;
                  return (
                    <div key={info.key} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary mt-1" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{info.title}</h4>
                        <div className="space-y-1">
                          {info.details.map(detail => (
                            <p key={`${info.key}-${detail}`} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Contacts (second) */}
            <Card className="glass-card">
              <CardHeader className="pb-0">
                <h3 className="text-xl font-bold">Quick Contacts</h3>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                {quickContacts.map(contact => (
                  <div key={contact.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" aria-hidden="true" />
                      <Badge variant="outline">{contact.role}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm">{contact.name}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" aria-hidden="true" />
                        <a href={`mailto:${contact.email}`} className="hover:underline">
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" aria-hidden="true" />
                        <a href={`tel:${contact.phone}`} className="hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social (third) */}
            <Card className="glass-card">
              <CardHeader className="pb-0">
                <h3 className="text-xl font-bold">Connect With Us</h3>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(social => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={social.key}
                        variant="outline"
                        size="icon"
                        className="hover:bg-primary/10"
                        asChild
                        aria-label={social.name}
                        title={social.name}
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>

        {/* Map Section */}
        <motion.div
          {...fadeInUp(40)}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-16"
        >
          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-0">
              <h3 className="text-2xl font-bold mb-2">Find Us</h3>
              <p className="text-muted-foreground">
                Visit our beautiful campus in the heart of Kashmir
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-primary mx-auto" aria-hidden="true" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Interactive Map</h4>
                    <p className="text-muted-foreground mb-4">
                      Central University of Kashmir, Ganderbal
                    </p>
                    <Button
                      variant="outline"
                      className="gap-2"
                      asChild
                      aria-label="Open location in Google Maps"
                    >
                      <a
                        href="https://maps.app.goo.gl/eW1QMkXnL4BsvcgS9"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-4 h-4" aria-hidden="true" />
                        Open in Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Contact;
