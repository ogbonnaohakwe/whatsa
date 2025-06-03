-- Delete all non-admin users while preserving the admin user
-- First, delete from dependent tables that reference users
DELETE FROM public.payment_transactions
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.user_subscriptions 
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.webhook_events
WHERE (payload->>'user_id')::uuid NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.status_updates
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.messages
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.lead_pages
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.campaigns
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.auto_responses
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

-- Delete from contact_group_memberships first since it references contacts
DELETE FROM public.contact_group_memberships
WHERE contact_id IN (
  SELECT id FROM public.contacts 
  WHERE user_id NOT IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

DELETE FROM public.contact_groups
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

DELETE FROM public.contacts
WHERE user_id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

-- Delete from profiles table
DELETE FROM public.profiles
WHERE role != 'admin';

-- Delete from users table
DELETE FROM public.users
WHERE id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);

-- Finally, delete from auth.users
DELETE FROM auth.users
WHERE id NOT IN (
  SELECT id FROM public.profiles WHERE role = 'admin'
);