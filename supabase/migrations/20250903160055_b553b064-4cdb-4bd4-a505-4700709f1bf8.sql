-- Create RLS policies for faculty table admin operations
-- Note: These policies allow all operations for now
-- In a production app, you'd want to restrict these to authenticated admin users

-- Allow INSERT operations
CREATE POLICY "Allow faculty insert operations" 
ON public.faculty 
FOR INSERT 
WITH CHECK (true);

-- Allow UPDATE operations  
CREATE POLICY "Allow faculty update operations" 
ON public.faculty 
FOR UPDATE 
USING (true);

-- Allow DELETE operations
CREATE POLICY "Allow faculty delete operations" 
ON public.faculty 
FOR DELETE 
USING (true);