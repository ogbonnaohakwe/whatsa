import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Store, 
  Database, 
  Zap,
  Mail,
  Cloud,
  Table,
  Globe,
  Check,
  ExternalLink,
  Settings
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
}

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to automate order notifications and customer support.',
      icon: <ShoppingBag className="text-[#95BF47]" />,
      isConnected: false
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Integrate with WooCommerce to manage orders and customer communications.',
      icon: <Store className="text-[#96588A]" />,
      isConnected: false
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Sync contacts and conversations with your HubSpot CRM.',
      icon: <Database className="text-[#FF7A59]" />,
      isConnected: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 3000+ apps through Zapier automation.',
      icon: <Zap className="text-[#FF4A00]" />,
      isConnected: false
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync your WhatsApp contacts with Mailchimp audiences.',
      icon: <Mail className="text-[#FFE01B]" />,
      isConnected: false
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect with Salesforce to manage customer relationships.',
      icon: <Cloud className="text-[#00A1E0]" />,
      isConnected: false
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Export and sync data with Google Sheets.',
      icon: <Table className="text-[#0F9D58]" />,
      isConnected: true
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      description: 'Add WhatsApp features to your WordPress website.',
      icon: <Globe className="text-[#21759B]" />,
      isConnected: false
    }
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, isConnected: !integration.isConnected }
        : integration
    ));
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Integrations
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Connected Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.filter(i => i.isConnected).map((integration, index) => (
                <Card key={integration.id} className="hover:shadow-elevation-2 transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                          {integration.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                            <Check size={12} className="mr-1" /> Connected
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {}}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <Settings size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.filter(i => !i.isConnected).map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-elevation-2 transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                          {integration.icon}
                        </div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">{integration.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{integration.description}</p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleConnection(integration.id)}
                          leftIcon={<ExternalLink size={16} />}
                        >
                          Connect
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {}}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default IntegrationsPage;