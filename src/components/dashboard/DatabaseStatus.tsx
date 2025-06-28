import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import ConnectSupabaseButton from '../ui/ConnectSupabaseButton';
import { useSupabaseConnection } from '../../hooks/useSupabaseConnection';
import { Database, Server, Shield, RefreshCw, Power } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const DatabaseStatus: React.FC = () => {
  const { 
    isConnected, 
    isLoading, 
    connectToSupabase, 
    disconnectFromSupabase 
  } = useSupabaseConnection();

  const handleDisconnect = () => {
    disconnectFromSupabase();
    toast.success('Disconnected from Supabase');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2" size={20} />
          Database Connection
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {isConnected ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Shield size={20} className="text-primary-500 mr-2" />
                      <h4 className="font-medium">Security Status</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Your connection is secure and encrypted
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <RefreshCw size={20} className="text-primary-500 mr-2" />
                      <h4 className="font-medium">Sync Status</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Data is syncing in real-time
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={handleDisconnect}
                    leftIcon={<Power size={16} />}
                    className="border-error-300 text-error-600 hover:bg-error-50"
                  >
                    Disconnect Database
                  </Button>
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
                  
                  <ConnectSupabaseButton 
                    onConnect={connectToSupabase}
                    isConnected={isConnected}
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseStatus;