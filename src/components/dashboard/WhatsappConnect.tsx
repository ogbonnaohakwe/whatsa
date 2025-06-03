import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { QrCode, Smartphone, Loader2 } from 'lucide-react';
import { useWhatsappStore } from '../../store/whatsappStore';
import { motion } from 'framer-motion';

const WhatsappConnect: React.FC = () => {
  const { isConnected, status, connectByQR, connectByPhone, connecting } = useWhatsappStore();

  const handlePhoneConnect = () => {
    const phoneNumber = prompt('Enter your WhatsApp Business phone number:');
    if (phoneNumber) {
      connectByPhone(phoneNumber);
    }
  };

  if (isConnected) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Connect WhatsApp Business Account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg"
              alt="WhatsApp Connection"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold mb-2">Get Started with WhatsApp Automation</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Connect your WhatsApp Business account to start automating messages and responses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => connectByQR()}
                disabled={connecting}
                leftIcon={connecting ? <Loader2 className="animate-spin" /> : <QrCode />}
              >
                Connect with QR Code
              </Button>
              <Button
                variant="outline"
                onClick={handlePhoneConnect}
                disabled={connecting}
                leftIcon={connecting ? <Loader2 className="animate-spin" /> : <Smartphone />}
              >
                Connect with Phone Number
              </Button>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsappConnect;