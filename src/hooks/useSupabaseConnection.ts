import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

export const useSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseClient, setSupabaseClient] = useState<ReturnType<typeof createClient<Database>> | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      setIsLoading(true);
      
      const supabaseUrl = localStorage.getItem('supabase_url');
      const supabaseKey = localStorage.getItem('supabase_key');
      
      if (supabaseUrl && supabaseKey) {
        try {
          // Validate URL format before creating client
          new URL(supabaseUrl);
          
          const client = createClient<Database>(supabaseUrl, supabaseKey);
          const { error } = await client.from('users').select('count').limit(1);
          
          if (!error) {
            setSupabaseClient(client);
            setIsConnected(true);
          } else {
            console.error('Supabase connection error:', error);
            setIsConnected(false);
          }
        } catch (error) {
          console.error('Failed to initialize Supabase client:', error);
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }
      
      setIsLoading(false);
    };
    
    checkConnection();
  }, []);

  const connectToSupabase = async (url: string, key: string) => {
    setIsLoading(true);
    
    try {
      // Validate URL format
      try {
        new URL(url);
      } catch (error) {
        console.error('Invalid URL format:', error);
        setIsLoading(false);
        return false;
      }
      
      const client = createClient<Database>(url, key);
      const { error } = await client.from('users').select('count').limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        setIsConnected(false);
        setIsLoading(false);
        return false;
      }
      
      // Store credentials in localStorage
      localStorage.setItem('supabase_url', url);
      localStorage.setItem('supabase_key', key);
      
      setSupabaseClient(client);
      setIsConnected(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      setIsConnected(false);
      setIsLoading(false);
      return false;
    }
  };

  const disconnectFromSupabase = () => {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_key');
    setSupabaseClient(null);
    setIsConnected(false);
  };

  return {
    isConnected,
    isLoading,
    supabaseClient,
    connectToSupabase,
    disconnectFromSupabase
  };
};