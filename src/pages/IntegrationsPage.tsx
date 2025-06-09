import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
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
  Settings,
  Key,
  Webhook,
  Link
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  category: 'ecommerce' | 'crm' | 'automation' | 'marketing' | 'analytics';
  setupFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'password' | 'url';
    placeholder: string;
    required: boolean;
  }>;
}

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to automate order notifications and customer support.',
      icon: <ShoppingBag className="text-[#95BF47]" />,
      isConnected: false,
      category: 'ecommerce',
      setupFields: [
        { name: 'shopUrl', label: 'Shop URL', type: 'url', placeholder: 'https://yourstore.myshopify.com', required: true },
        { name: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Your Shopify access token', required: true }
      ]
    },
    {
      id: 'woocommerce',
      name: 'WooCommerce',
      description: 'Integrate with WooCommerce to manage orders and customer communications.',
      icon: <Store className="text-[#96588A]" />,
      isConnected: false,
      category: 'ecommerce',
      setupFields: [
        { name: 'siteUrl', label: 'Site URL', type: 'url', placeholder: 'https://yoursite.com', required: true },
        { name: 'consumerKey', label: 'Consumer Key', type: 'text', placeholder: 'ck_...', required: true },
        { name: 'consumerSecret', label: 'Consumer Secret', type: 'password', placeholder: 'cs_...', required: true }
      ]
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Sync contacts and conversations with your HubSpot CRM.',
      icon: <Database className="text-[#FF7A59]" />,
      isConnected: true,
      category: 'crm'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 3000+ apps through Zapier automation.',
      icon: <Zap className="text-[#FF4A00]" />,
      isConnected: false,
      category: 'automation',
      setupFields: [
        { name: 'webhookUrl', label: 'Webhook URL', type: 'url', placeholder: 'https://hooks.zapier.com/...', required: true }
      ]
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync your WhatsApp contacts with Mailchimp audiences.',
      icon: <Mail className="text-[#FFE01B]" />,
      isConnected: false,
      category: 'marketing',
      setupFields: [
        { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Your Mailchimp API key', required: true },
        { name: 'audienceId', label: 'Audience ID', type: 'text', placeholder: 'Your audience ID', required: true }
      ]
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect with Salesforce to manage customer relationships.',
      icon: <Cloud className="text-[#00A1E0]" />,
      isConnected: false,
      category: 'crm',
      setupFields: [
        { name: 'instanceUrl', label: 'Instance URL', type: 'url', placeholder: 'https://yourinstance.salesforce.com', required: true },
        { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Your connected app client ID', required: true },
        { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Your connected app client secret', required: true }
      ]
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Export and sync data with Google Sheets.',
      icon: <Table className="text-[#0F9D58]" />,
      isConnected: true,
      category: 'analytics'
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      description: 'Add WhatsApp features to your WordPress website.',
      icon: <Globe className="text-[#21759B]" />,
      isConnected: false,
      category: 'ecommerce',
      setupFields: [
        { name: 'siteUrl', label: 'WordPress Site URL', type: 'url', placeholder: 'https://yoursite.com', required: true },
        { name: 'username', label: 'Username', type: 'text', placeholder: 'Your WordPress username', required: true },
        { name: 'applicationPassword', label: 'Application Password', type: 'password', placeholder: 'Your application password', required: true }
      ]
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupData, setSetupData] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Integrations' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'crm', label: 'CRM' },
    { id: 'automation', label: 'Automation' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedIntegrations = integrations.filter(i => i.isConnected);
  const availableIntegrations = integrations.filter(i => !i.isConnected);

  const handleConnect = (integration: Integration) => {
    if (integration.setupFields && integration.setupFields.length > 0) {
      setSelectedIntegration(integration);
      setSetupData({});
      setShowSetupModal(true);
    } else {
      toggleConnection(integration.id);
    }
  };

  const handleSetupSubmit = () => {
    if (!selectedIntegration) return;

    // Validate required fields
    const missingFields = selectedIntegration.setupFields?.filter(field => 
      field.required && !setupData[field.name]
    );

    if (missingFields && missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call to connect integration
    setTimeout(() => {
      toggleConnection(selectedIntegration.id);
      setShowSetupModal(false);
      setSelectedIntegration(null);
      toast.success(`${selectedIntegration.name} connected successfully!`);
    }, 1000);
  };

  const toggleConnection = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, isConnected: !integration.isConnected }
        : integration
    ));
  };

  const handleSettings = (integration: Integration) => {
    toast.info(`${integration.name} settings coming soon!`);
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

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Connected Integrations */}
      {connectedIntegrations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Connected Apps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connectedIntegrations.map((integration, index) => (
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
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSettings(integration)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <Settings size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleConnection(integration.id)}
                            className="text-error-500 hover:text-error-600"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Available Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.filter(i => !i.isConnected).map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-elevation-2 transition-shadow h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                          {integration.icon}
                        </div>
                        <h3 className="ml-4 text-lg font-medium text-gray-900">{integration.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 flex-grow">{integration.description}</p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleConnect(integration)}
                          leftIcon={integration.setupFields ? <Settings size={16} /> : <Link size={16} />}
                        >
                          {integration.setupFields ? 'Setup' : 'Connect'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {}}
                          className="text-gray-400 hover:text-gray-500"
                          leftIcon={<ExternalLink size={16} />}
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

      {/* Setup Modal */}
      <Modal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        title={`Setup ${selectedIntegration?.name}`}
        size="md"
      >
        {selectedIntegration && (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white">
                {selectedIntegration.icon}
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-blue-900">{selectedIntegration.name}</h3>
                <p className="text-sm text-blue-700">{selectedIntegration.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedIntegration.setupFields?.map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={setupData[field.name] || ''}
                  onChange={(e) => setSetupData({ ...setupData, [field.name]: e.target.value })}
                  leftIcon={field.type === 'password' ? <Key size={16} /> : field.type === 'url' ? <Link size={16} /> : undefined}
                />
              ))}
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSetupModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSetupSubmit}
              >
                Connect {selectedIntegration.name}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IntegrationsPage;