-- Create RLS policies for all tables to allow admin operations
-- Note: These policies allow all operations for now
-- In a production app, you'd want to restrict these to authenticated admin users

-- Events table policies
CREATE POLICY "Allow events insert operations" 
ON public.events 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow events update operations" 
ON public.events 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow events delete operations" 
ON public.events 
FOR DELETE 
USING (true);

-- News table policies  
CREATE POLICY "Allow news insert operations" 
ON public.news 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow news update operations" 
ON public.news 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow news delete operations" 
ON public.news 
FOR DELETE 
USING (true);

-- Programs table policies
CREATE POLICY "Allow programs insert operations" 
ON public.programs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow programs update operations" 
ON public.programs 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow programs delete operations" 
ON public.programs 
FOR DELETE 
USING (true);

-- Study materials table policies
CREATE POLICY "Allow study_materials insert operations" 
ON public.study_materials 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow study_materials update operations" 
ON public.study_materials 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow study_materials delete operations" 
ON public.study_materials 
FOR DELETE 
USING (true);

-- Coordinator message table policies
CREATE POLICY "Allow coordinator_message insert operations" 
ON public.coordinator_message 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow coordinator_message update operations" 
ON public.coordinator_message 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow coordinator_message delete operations" 
ON public.coordinator_message 
FOR DELETE 
USING (true);