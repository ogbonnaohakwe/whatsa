import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const initializeDatabase = async () => {
  try {
    // Check connection
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};