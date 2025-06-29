import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { QrCode, Smartphone, Loader2, CheckCircle, AlertCircle, RefreshCw, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWhatsAppGateway } from '../../hooks/useWhatsAppGateway';
import Input from '../ui/Input';
import { useState } from 'react';
import Modal from '../ui/Modal';

const WhatsappConnect: React.FC = () => {
  const { 
    isConnected, 
    isInitializing, 
    initializeWhatsApp,
    businessProfile,
    error
  } = useWhatsAppGateway();

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectMethod, setConnectMethod] = useState<'api' | 'qr'>('api');
  const [accessToken, setAccessToken] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Auto-initialize on component mount
    if (!isConnected && !isInitializing) {
      const shouldAutoInit = localStorage.getItem('whatsapp_auto_init') === 'true';
      if (shouldAutoInit) {
        initializeWhatsApp();
      }
    }
  }, []);

  const handleConnect = async () => {
    if (connectMethod === 'api') {
      if (!accessToken || !phoneNumberId) {
        alert('Please enter both Access Token and Phone Number ID');
        return;
      }
      
      const success = await initializeWhatsApp(accessToken, phoneNumberId);
      if (success) {
        setShowConnectModal(false);
      }
    } else {
      // QR code method would be implemented here
      alert('QR code connection is not yet implemented');
    }
  };

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
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    WhatsApp Business Connected
                  </h3>
                  <p className="text-green-700">
                    Your WhatsApp Business API is active and ready to send messages
                  </p>
                  {businessProfile && (
                    <div className="mt-2 text-sm text-green-700">
                      <span className="font-medium">{businessProfile.name || 'Business Account'}</span>
                      {businessProfile.description && ` • ${businessProfile.description}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  leftIcon={<Settings size={16} />}
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Settings
                </Button>
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
            </div>
          </CardContent>
        </Card>

        {/* Business Profile Settings Modal */}
        <Modal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          title="WhatsApp Business Settings"
          size="md"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Business Profile</h3>
              <p className="text-sm text-blue-600">
                These settings control how your business appears to customers on WhatsApp.
              </p>
            </div>

            <Input
              label="Business Name"
              value={businessProfile?.name || ''}
              disabled
              helperText="Business name cannot be changed through the API"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                rows={3}
                value={businessProfile?.about || ''}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Business about section cannot be changed through the API
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                rows={3}
                value={businessProfile?.description || ''}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Business description cannot be changed through the API
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={() => setShowSettings(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
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
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm max-w-md">
                    <p className="font-medium">Connection Error:</p>
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="space-y-4 w-full max-w-sm">
                  <Button
                    variant="primary"
                    onClick={() => setShowConnectModal(true)}
                    leftIcon={<Smartphone size={20} />}
                    fullWidth
                  >
                    Connect WhatsApp Business API
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </CardContent>

      {/* Connect Modal */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
        title="Connect WhatsApp Business API"
        size="md"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">WhatsApp Business API</h3>
            <p className="text-sm text-blue-600">
              Connect your WhatsApp Business API account to send and receive messages. You'll need your Access Token and Phone Number ID from the Meta Developer Portal.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connection Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={`p-4 border rounded-lg text-center ${
                  connectMethod === 'api' 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setConnectMethod('api')}
              >
                <Smartphone size={24} className="mx-auto mb-2" />
                <span className="block font-medium">API Credentials</span>
                <span className="text-xs text-gray-500">Connect with access token</span>
              </button>
              <button
                className={`p-4 border rounded-lg text-center ${
                  connectMethod === 'qr' 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setConnectMethod('qr')}
              >
                <QrCode size={24} className="mx-auto mb-2" />
                <span className="block font-medium">QR Code</span>
                <span className="text-xs text-gray-500">Scan with your phone</span>
              </button>
            </div>
          </div>

          {connectMethod === 'api' && (
            <div className="space-y-4">
              <Input
                label="Access Token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Enter your WhatsApp Business API access token"
                type="password"
                required
              />
              <Input
                label="Phone Number ID"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="Enter your WhatsApp Business phone number ID"
                required
              />
            </div>
          )}

          {connectMethod === 'qr' && (
            <div className="text-center p-4">
              <div className="bg-gray-100 p-8 rounded-lg inline-block mb-4">
                <QrCode size={160} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">
                QR code connection is not yet implemented. Please use API credentials instead.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowConnectModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleConnect}
              isLoading={isInitializing}
            >
              Connect
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default WhatsappConnect;