-- Create gallery albums table
CREATE TABLE public.gallery_albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'Events',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery photos table
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for gallery_albums
CREATE POLICY "Gallery albums are publicly viewable" 
ON public.gallery_albums 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Allow gallery_albums insert operations" 
ON public.gallery_albums 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow gallery_albums update operations" 
ON public.gallery_albums 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow gallery_albums delete operations" 
ON public.gallery_albums 
FOR DELETE 
USING (true);

-- Create RLS policies for gallery_photos
CREATE POLICY "Gallery photos are publicly viewable" 
ON public.gallery_photos 
FOR SELECT 
USING (true);

CREATE POLICY "Allow gallery_photos insert operations" 
ON public.gallery_photos 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow gallery_photos update operations" 
ON public.gallery_photos 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow gallery_photos delete operations" 
ON public.gallery_photos 
FOR DELETE 
USING (true);

-- Create updated_at triggers
CREATE TRIGGER update_gallery_albums_updated_at
BEFORE UPDATE ON public.gallery_albums
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_photos_updated_at
BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage policies for images bucket
CREATE POLICY "Public images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'images');

CREATE POLICY "Allow image uploads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow image updates" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'images');

CREATE POLICY "Allow image deletes" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'images');

-- Enable realtime for gallery tables
ALTER TABLE public.gallery_albums REPLICA IDENTITY FULL;
ALTER TABLE public.gallery_photos REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_albums;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_photos;