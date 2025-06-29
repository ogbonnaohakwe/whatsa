import React, { useState } from 'react';
import Button from './Button';
import { Database, Server, CheckCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ConnectSupabaseButtonProps {
  onConnect: (url: string, key: string) => Promise<boolean>;
  isConnected: boolean;
}

const ConnectSupabaseButton: React.FC<ConnectSupabaseButtonProps> = ({ 
  onConnect, 
  isConnected 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supabaseUrl || !supabaseKey) {
      toast.error('Please enter both Supabase URL and Anon Key');
      return;
    }
    
    setIsConnecting(true);
    try {
      const success = await onConnect(supabaseUrl, supabaseKey);
      if (success) {
        toast.success('Connected to Supabase successfully!');
        setShowForm(false);
      } else {
        toast.error('Failed to connect to Supabase');
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center text-success-600">
        <CheckCircle size={16} className="mr-2" />
        <span className="text-sm font-medium">Connected to Supabase</span>
      </div>
    );
  }

  return (
    <div>
      {!showForm ? (
        <Button
          variant="outline"
          onClick={() => setShowForm(true)}
          leftIcon={<Database size={16} />}
        >
          Connect to Supabase
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supabase Anon Key
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="submit"
                variant="primary"
                isLoading={isConnecting}
                leftIcon={isConnecting ? undefined : <Server size={16} />}
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ConnectSupabaseButton;