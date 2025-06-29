import { useState, useEffect } from 'react';

export const useSupabaseConnection = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Always connected
    setIsConnected(true);
    setIsLoading(false);
  }, []);

  const connectToSupabase = async () => {
    setIsLoading(true);
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to connect:', error);
      setIsConnected(false);
      setIsLoading(false);
      return false;
    }
  };

  const disconnectFromSupabase = () => {
    // In this version, we don't actually disconnect
    // Just simulate the action
    setIsConnected(true);
  };

  return {
    isConnected,
    isLoading,
    supabaseClient: null,
    connectToSupabase,
    disconnectFromSupabase
  };
};