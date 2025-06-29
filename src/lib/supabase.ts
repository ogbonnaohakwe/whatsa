import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const initializeDatabase = async () => {
  try {
    // Check connection by testing a simple query
    const { error } = await supabase.from('users').select('count').limit(1);
    
    // If the table doesn't exist, that's expected in a new project
    if (error && (error.code === 'PGRST116' || error.message.includes('relation "users" does not exist'))) {
      console.log('Database connected successfully (users table not yet created)');
      return true;
    }
    
    if (error) throw error;
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};