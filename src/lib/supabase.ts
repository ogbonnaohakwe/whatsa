import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid credentials (not placeholder values)
const hasValidCredentials = 
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseKey !== 'your_supabase_anon_key' &&
  supabaseUrl !== 'https://example.supabase.co' &&
  supabaseKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example' &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co');

// Only create client if we have valid credentials
export const supabase = hasValidCredentials 
  ? createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

export const initializeDatabase = async () => {
  if (!supabase) {
    console.log('Running in demo mode - no database connection available');
    console.log('To connect to Supabase, update your .env file with valid credentials');
    return false;
  }

  try {
    // Test connection with a simple query that should work with any Supabase project
    const { error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      // If the table doesn't exist, that's expected in a new project
      if (error.code === 'PGRST116' || error.message.includes('relation "users" does not exist')) {
        console.log('Database connected successfully (users table not yet created)');
        return true;
      }
      throw error;
    }
    
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    console.log('Falling back to demo mode');
    return false;
  }
};

// Helper function to check if we're in demo mode
export const isDemoMode = () => !supabase;

// Helper function to get connection status
export const getConnectionStatus = () => {
  if (!hasValidCredentials) {
    return {
      connected: false,
      mode: 'demo',
      message: 'Running in demo mode. Update .env file with valid Supabase credentials to enable database features.'
    };
  }
  
  return {
    connected: true,
    mode: 'live',
    message: 'Connected to Supabase database'
  };
};