-- Enable real-time functionality for all tables
-- This allows the frontend to receive live updates when data changes

-- Enable replica identity for all tables to capture complete row data
ALTER TABLE public.faculty REPLICA IDENTITY FULL;
ALTER TABLE public.events REPLICA IDENTITY FULL;
ALTER TABLE public.news REPLICA IDENTITY FULL;
ALTER TABLE public.programs REPLICA IDENTITY FULL;
ALTER TABLE public.study_materials REPLICA IDENTITY FULL;
ALTER TABLE public.coordinator_message REPLICA IDENTITY FULL;

-- Add all tables to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.faculty;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news;
ALTER PUBLICATION supabase_realtime ADD TABLE public.programs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.study_materials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.coordinator_message;