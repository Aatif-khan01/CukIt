-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true);

-- Create faculty table
CREATE TABLE public.faculty (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  specialization TEXT[] NOT NULL DEFAULT '{}',
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  experience TEXT,
  education TEXT,
  publications TEXT,
  photo_url TEXT,
  bio TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  eligibility TEXT,
  curriculum TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  is_featured BOOLEAN DEFAULT false,
  max_registrations INTEGER,
  current_registrations INTEGER DEFAULT 0,
  image_url TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  publish_date TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  image_url TEXT,
  excerpt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create study materials table
CREATE TABLE public.study_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course TEXT NOT NULL,
  subject TEXT NOT NULL,
  semester TEXT,
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by TEXT NOT NULL,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create coordinator message table
CREATE TABLE public.coordinator_message (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  message TEXT NOT NULL,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coordinator_message ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Faculty are publicly viewable" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Programs are publicly viewable" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Events are publicly viewable" ON public.events FOR SELECT USING (true);
CREATE POLICY "Published news are publicly viewable" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Study materials are publicly viewable" ON public.study_materials FOR SELECT USING (true);
CREATE POLICY "Active coordinator messages are publicly viewable" ON public.coordinator_message FOR SELECT USING (is_active = true);

-- Storage policies for images bucket
CREATE POLICY "Images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_study_materials_updated_at BEFORE UPDATE ON public.study_materials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_coordinator_message_updated_at BEFORE UPDATE ON public.coordinator_message FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.faculty (name, designation, specialization, email, phone, experience, education, publications, is_featured, bio) VALUES
('Dr. Rajesh Kumar', 'Professor & Head of Department', ARRAY['Artificial Intelligence', 'Machine Learning', 'Data Mining'], 'rajesh.kumar@cukashmir.ac.in', '+91-9876543210', '15+ Years', 'Ph.D. Computer Science, IIT Delhi', '50+ Research Papers', true, 'Leading researcher in AI and ML with extensive experience in academic and industry collaborations.'),
('Dr. Priya Sharma', 'Associate Professor', ARRAY['Cybersecurity', 'Network Security', 'Digital Forensics'], 'priya.sharma@cukashmir.ac.in', '+91-9876543211', '12+ Years', 'Ph.D. Information Security, NIT Srinagar', '35+ Research Papers', true, 'Expert in cybersecurity with focus on digital forensics and network security protocols.'),
('Dr. Mohammed Ali', 'Associate Professor', ARRAY['Software Engineering', 'Web Development', 'Mobile Computing'], 'mohammed.ali@cukashmir.ac.in', '+91-9876543212', '10+ Years', 'Ph.D. Software Engineering, IIT Bombay', '40+ Research Papers', true, 'Software engineering specialist with expertise in modern web and mobile development frameworks.'),
('Dr. Anjali Gupta', 'Assistant Professor', ARRAY['Database Systems', 'Big Data Analytics', 'Cloud Computing'], 'anjali.gupta@cukashmir.ac.in', '+91-9876543213', '8+ Years', 'Ph.D. Computer Applications, Jammu University', '25+ Research Papers', true, 'Database and cloud computing expert with research focus on big data analytics and distributed systems.');

INSERT INTO public.programs (title, duration, description, eligibility, curriculum) VALUES
('B.Tech in Computer Science & Engineering', '4 Years', 'Comprehensive undergraduate program covering fundamentals to advanced topics in CSE', 'Class 12th with PCM and minimum 60% marks', 'Covers programming, algorithms, data structures, computer networks, software engineering, and emerging technologies'),
('M.Tech in Computer Science & Engineering', '2 Years', 'Advanced postgraduate program with specialization in cutting-edge technologies', 'B.Tech/B.E. in relevant field with minimum 60% marks', 'Advanced courses in AI, ML, cybersecurity, cloud computing, and research methodology'),
('Ph.D in Computer Science & Engineering', '3-5 Years', 'Doctoral research program for aspiring researchers and academicians', 'M.Tech/M.E. with minimum 60% marks or equivalent', 'Research-focused program with coursework in advanced topics and thesis work');

INSERT INTO public.coordinator_message (name, designation, message, is_active) VALUES
('Dr. Rajesh Kumar', 'HOD & Program Coordinator', 'Welcome to the Department of Information Technology at Central University of Kashmir. Our department is committed to providing world-class education in Information Technology, fostering innovation, and preparing students for successful careers in the rapidly evolving tech industry. We offer state-of-the-art facilities, experienced faculty, and industry-relevant curriculum to ensure our graduates are well-equipped to meet the challenges of tomorrow.', true);

INSERT INTO public.events (title, description, date_time, venue, category, status, is_featured, max_registrations) VALUES
('Annual Tech Symposium 2024', 'A comprehensive symposium featuring latest trends in technology, research presentations, and industry insights', '2024-03-15 09:00:00+05:30', 'Department Auditorium', 'Academic', 'upcoming', true, 200),
('AI/ML Workshop', 'Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals', '2024-02-20 10:00:00+05:30', 'Computer Lab 1', 'Workshop', 'upcoming', true, 50),
('Industry Connect Session', 'Interactive session with industry professionals sharing real-world experiences', '2024-02-10 14:00:00+05:30', 'Conference Hall', 'Industry', 'upcoming', false, 100);

INSERT INTO public.news (title, content, author, category, status, publish_date, excerpt) VALUES
('Department Launches New AI Research Lab', 'The Department of Information Technology has inaugurated a state-of-the-art Artificial Intelligence Research Lab equipped with high-performance computing resources and advanced software tools. This facility will support cutting-edge research in machine learning, deep learning, and artificial intelligence applications.', 'Dr. Rajesh Kumar', 'Research', 'published', '2024-01-15 10:00:00+05:30', 'New AI Research Lab inaugurated with advanced computing resources'),
('Students Win National Coding Competition', 'Our B.Tech students secured first place in the National Coding Championship 2024, competing against teams from over 100 universities across India. The winning team demonstrated exceptional problem-solving skills and programming expertise.', 'Ms. Sanya Malik', 'Achievement', 'published', '2024-01-10 15:00:00+05:30', 'B.Tech students win National Coding Championship 2024'),
('Upcoming Admission Process for 2024-25', 'The department announces the commencement of admission process for the academic year 2024-25. Applications are invited for B.Tech, M.Tech, and Ph.D programs. Detailed information about eligibility criteria, application procedure, and important dates is available on the university website.', 'Admission Committee', 'Admission', 'published', '2024-01-05 09:00:00+05:30', 'Admission process for 2024-25 academic year begins');