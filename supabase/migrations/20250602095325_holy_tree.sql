-- Add admin user to auth.users first (this would normally be handled by Supabase Auth)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',  -- Fixed UUID for admin
  '00000000-0000-0000-0000-000000000000',
  'fridayalex234@gmail.com',
  crypt('Password@2020..', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin User"}',
  now(),
  now(),
  'authenticated'
);

-- Then create admin user in profiles table
INSERT INTO public.profiles (id, name, email, role)
VALUES (
  '00000000-0000-0000-0000-000000000000',  -- Same UUID as in auth.users
  'Admin User',
  'fridayalex234@gmail.com',
  'admin'
);

-- Ensure the admin role has appropriate permissions
CREATE POLICY "Admin users have full access"
  ON public.profiles
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Add policies for admin access to other tables
CREATE POLICY "Admin users have full access to users"
  ON public.users
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin users have full access to contacts"
  ON public.contacts
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Admin users have full access to messages"
  ON public.messages
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ));