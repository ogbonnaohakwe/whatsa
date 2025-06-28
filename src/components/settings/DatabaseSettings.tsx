import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useSupabaseConnection } from '../../hooks/useSupabaseConnection';
import { Database, Server, Shield, RefreshCw, Power, Key, Eye, EyeOff, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const DatabaseSettings: React.FC = () => {
  const { 
    isConnected, 
    connectToSupabase, 
    disconnectFromSupabase 
  } = useSupabaseConnection();

  const [showCredentials, setShowCredentials] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('supabase_key') || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateCredentials = async () => {
    if (!supabaseUrl || !supabaseKey) {
      toast.error('Please enter both Supabase URL and Anon Key');
      return;
    }
    
    // Validate URL format
    try {
      new URL(supabaseUrl);
    } catch (error) {
      toast.error('Invalid URL format. Please enter a valid URL.');
      return;
    }
    
    setIsUpdating(true);
    try {
      const success = await connectToSupabase(supabaseUrl, supabaseKey);
      if (success) {
        toast.success('Database credentials updated successfully!');
      } else {
        toast.error('Failed to connect with new credentials');
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDisconnect = () => {
    disconnectFromSupabase();
    toast.success('Disconnected from Supabase');
  };

  const handleExportData = () => {
    toast.success('Data export feature coming soon!');
  };

  const handleImportData = () => {
    toast.success('Data import feature coming soon!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2" size={20} />
          Database Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isConnected ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <Server className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      Connected to Supabase
                    </h3>
                    <p className="text-green-700">
                      Your database connection is active and working properly
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supabase Project URL
                  </label>
                  <div className="relative">
                    <Input
                      value={showCredentials ? supabaseUrl : supabaseUrl.replace(/./g, '•')}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      leftIcon={<Server size={16} />}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowCredentials(!showCredentials)}
                    >
                      {showCredentials ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supabase Anon Key
                  </label>
                  <div className="relative">
                    <Input
                      value={showCredentials ? supabaseKey : supabaseKey.replace(/./g, '•')}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      leftIcon={<Key size={16} />}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowCredentials(!showCredentials)}
                    >
                      {showCredentials ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-3">
                  <Button
                    variant="primary"
                    onClick={handleUpdateCredentials}
                    isLoading={isUpdating}
                    leftIcon={<RefreshCw size={16} />}
                  >
                    Update Credentials
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<Download size={16} />}
                    onClick={handleExportData}
                  >
                    Export Data
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<Upload size={16} />}
                    onClick={handleImportData}
                  >
                    Import Data
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="border border-error-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-error-600 mb-1">Disconnect Database</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Disconnecting will remove your database credentials from this device. Your data will remain safe in Supabase.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-error-300 text-error-600 hover:bg-error-50"
                    leftIcon={<Power size={16} />}
                    onClick={handleDisconnect}
                  >
                    Disconnect Database
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center py-6">
                <Database size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Database Connected</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Connect to your Supabase database to store contacts, messages, and automation settings.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supabase Project URL
                    </label>
                    <Input
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://your-project.supabase.co"
                      leftIcon={<Server size={16} />}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supabase Anon Key
                    </label>
                    <Input
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      leftIcon={<Key size={16} />}
                      type="password"
                    />
                  </div>
                  
                  <Button
                    variant="primary"
                    onClick={handleUpdateCredentials}
                    isLoading={isUpdating}
                    leftIcon={<Server size={16} />}
                  >
                    Connect to Supabase
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseSettings;