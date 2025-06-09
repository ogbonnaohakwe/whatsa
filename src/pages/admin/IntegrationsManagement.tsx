import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Settings, 
  Trash2, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  AlertTriangle,
  Zap,
  Database,
  Globe,
  Key,
  RefreshCw,
  Activity,
  Shield,
  Link,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Integration {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'oauth' | 'database';
  status: 'active' | 'inactive' | 'error';
  description: string;
  endpoint?: string;
  apiKey?: string;
  lastSync?: string;
  totalRequests: number;
  errorRate: number;
  config: Record<string, any>;
}

const IntegrationsManagement: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Shopify Store',
      type: 'webhook',
      status: 'active',
      description: 'E-commerce integration for order notifications',
      endpoint: 'https://api.whatsapp-autoresponder.com/webhooks/shopify',
      lastSync: '2 minutes ago',
      totalRequests: 15420,
      errorRate: 0.2,
      config: { store_url: 'mystore.myshopify.com', webhook_secret: '***' }
    },
    {
      id: '2',
      name: 'HubSpot CRM',
      type: 'oauth',
      status: 'active',
      description: 'Customer relationship management integration',
      lastSync: '5 minutes ago',
      totalRequests: 8934,
      errorRate: 0.1,
      config: { client_id: 'hub_***', refresh_token: '***' }
    },
    {
      id: '3',
      name: 'Custom API',
      type: 'api',
      status: 'error',
      description: 'Custom third-party API integration',
      endpoint: 'https://api.example.com/v1',
      apiKey: 'sk_test_***',
      lastSync: '2 hours ago',
      totalRequests: 2341,
      errorRate: 15.3,
      config: { rate_limit: 1000, timeout: 30 }
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: 'webhook' as Integration['type'],
    description: '',
    endpoint: '',
    apiKey: ''
  });

  const handleCreateIntegration = () => {
    if (!newIntegration.name || !newIntegration.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const integration: Integration = {
      id: Date.now().toString(),
      ...newIntegration,
      status: 'inactive',
      totalRequests: 0,
      errorRate: 0,
      config: {}
    };

    setIntegrations([integration, ...integrations]);
    setShowCreateModal(false);
    setNewIntegration({ name: '', type: 'webhook', description: '', endpoint: '', apiKey: '' });
    toast.success('Integration created successfully!');
  };

  const handleToggleStatus = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, status: integration.status === 'active' ? 'inactive' : 'active' }
        : integration
    ));
    toast.success('Integration status updated');
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(integration => integration.id !== id));
    toast.success('Integration deleted successfully');
  };

  const handleCopyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const toggleSecretVisibility = (id: string) => {
    setShowSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: Integration['type']) => {
    switch (type) {
      case 'webhook': return <Zap size={16} />;
      case 'api': return <Database size={16} />;
      case 'oauth': return <Shield size={16} />;
      case 'database': return <Database size={16} />;
      default: return <Globe size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integration Management</h1>
          <p className="text-gray-600">Manage all platform integrations and API connections</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setShowCreateModal(true)}
        >
          Add Integration
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Integrations', value: integrations.length, icon: <Globe size={20} />, color: 'blue' },
          { label: 'Active', value: integrations.filter(i => i.status === 'active').length, icon: <Check size={20} />, color: 'green' },
          { label: 'With Errors', value: integrations.filter(i => i.status === 'error').length, icon: <AlertTriangle size={20} />, color: 'red' },
          { label: 'Total Requests', value: integrations.reduce((sum, i) => sum + i.totalRequests, 0).toLocaleString(), icon: <Activity size={20} />, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <div className={`text-${stat.color}-600`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Integrations List */}
      <Card>
        <CardHeader>
          <CardTitle>All Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {getTypeIcon(integration.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                          {integration.status}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 capitalize">
                          {integration.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{integration.description}</p>
                      
                      {/* Integration Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {integration.endpoint && (
                          <div>
                            <span className="font-medium text-gray-700">Endpoint:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs">{integration.endpoint}</code>
                              <button
                                onClick={() => handleCopyToClipboard(integration.endpoint!, `endpoint-${integration.id}`)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {copied === `endpoint-${integration.id}` ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {integration.apiKey && (
                          <div>
                            <span className="font-medium text-gray-700">API Key:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {showSecrets[integration.id] ? integration.apiKey : '••••••••••••'}
                              </code>
                              <button
                                onClick={() => toggleSecretVisibility(integration.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {showSecrets[integration.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                              </button>
                              <button
                                onClick={() => handleCopyToClipboard(integration.apiKey!, `api-${integration.id}`)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {copied === `api-${integration.id}` ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <span className="font-medium text-gray-700">Performance:</span>
                          <div className="mt-1">
                            <div className="text-xs text-gray-600">
                              {integration.totalRequests.toLocaleString()} requests
                            </div>
                            <div className={`text-xs ${integration.errorRate > 5 ? 'text-red-600' : 'text-green-600'}`}>
                              {integration.errorRate}% error rate
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {integration.lastSync && (
                        <div className="mt-3 text-sm text-gray-500">
                          Last sync: {integration.lastSync}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setShowConfigModal(true);
                      }}
                      leftIcon={<Settings size={16} />}
                    >
                      Configure
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(integration.id)}
                      leftIcon={<RefreshCw size={16} />}
                    >
                      {integration.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteIntegration(integration.id)}
                      className="text-red-600 hover:text-red-700"
                      leftIcon={<Trash2 size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Integration Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Integration"
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Integration Name"
            value={newIntegration.name}
            onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
            placeholder="e.g., Shopify Store"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Integration Type
            </label>
            <select
              value={newIntegration.type}
              onChange={(e) => setNewIntegration({ ...newIntegration, type: e.target.value as Integration['type'] })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="webhook">Webhook</option>
              <option value="api">REST API</option>
              <option value="oauth">OAuth</option>
              <option value="database">Database</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newIntegration.description}
              onChange={(e) => setNewIntegration({ ...newIntegration, description: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              rows={3}
              placeholder="Describe what this integration does..."
              required
            />
          </div>

          {(newIntegration.type === 'webhook' || newIntegration.type === 'api') && (
            <Input
              label="Endpoint URL"
              value={newIntegration.endpoint}
              onChange={(e) => setNewIntegration({ ...newIntegration, endpoint: e.target.value })}
              placeholder="https://api.example.com/webhook"
              leftIcon={<Link size={16} />}
            />
          )}

          {newIntegration.type === 'api' && (
            <Input
              label="API Key"
              type="password"
              value={newIntegration.apiKey}
              onChange={(e) => setNewIntegration({ ...newIntegration, apiKey: e.target.value })}
              placeholder="Enter API key"
              leftIcon={<Key size={16} />}
            />
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateIntegration}
            >
              Create Integration
            </Button>
          </div>
        </div>
      </Modal>

      {/* Configuration Modal */}
      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title={`Configure ${selectedIntegration?.name}`}
        size="lg"
      >
        {selectedIntegration && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Integration Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Type:</span> {selectedIntegration.type}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {selectedIntegration.status}
                </div>
                <div>
                  <span className="font-medium">Total Requests:</span> {selectedIntegration.totalRequests.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Error Rate:</span> {selectedIntegration.errorRate}%
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Configuration</h3>
              <div className="space-y-4">
                {Object.entries(selectedIntegration.config).map(([key, value]) => (
                  <Input
                    key={key}
                    label={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    value={typeof value === 'string' ? value : JSON.stringify(value)}
                    onChange={() => {}}
                    placeholder={`Enter ${key}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowConfigModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                leftIcon={<RefreshCw size={16} />}
              >
                Test Connection
              </Button>
              <Button variant="primary">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default IntegrationsManagement;