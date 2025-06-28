import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { QrCode, Smartphone, Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhatsAppBusiness } from '../../hooks/useWhatsAppBusiness';

const WhatsappConnect: React.FC = () => {
  const { 
    isConnected, 
    isInitializing, 
    initializeWhatsApp,
    isWebSocketConnected 
  } = useWhatsAppBusiness();

  useEffect(() => {
    // Auto-initialize on component mount
    if (!isConnected && !isInitializing) {
      initializeWhatsApp();
    }
  }, []);

  if (isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    WhatsApp Business Connected
                  </h3>
                  <p className="text-green-700">
                    Your WhatsApp Business API is active and ready to send messages
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        isWebSocketConnected ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm text-green-600">
                        Real-time: {isWebSocketConnected ? 'Connected' : 'Connecting...'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={initializeWhatsApp}
                leftIcon={<RefreshCw size={16} />}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Connect WhatsApp Business API</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isInitializing ? (
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin text-primary-500 mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">Connecting to WhatsApp...</h3>
                <p className="text-gray-600 mb-6">
                  Setting up your WhatsApp Business API connection
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="p-4 bg-yellow-100 rounded-full mb-4">
                  <AlertCircle className="text-yellow-600" size={48} />
                </div>
                <h3 className="text-xl font-semibold mb-2">WhatsApp Not Connected</h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Connect your WhatsApp Business API to start sending automated messages and managing conversations.
                </p>
                
                <div className="space-y-4 w-full max-w-sm">
                  <Button
                    variant="primary"
                    onClick={initializeWhatsApp}
                    leftIcon={<Smartphone size={20} />}
                    fullWidth
                  >
                    Connect WhatsApp Business API
                  </Button>
                  
                  <div className="text-sm text-gray-500">
                    <p>Make sure you have:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>WhatsApp Business API access token</li>
                      <li>Phone number ID configured</li>
                      <li>Webhook verification token set</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsappConnect;