import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Database, Server, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const DatabaseStatus: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2" size={20} />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
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
                      System Online
                    </h3>
                    <p className="text-green-700">
                      All systems are operational and working properly
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
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DatabaseStatus;