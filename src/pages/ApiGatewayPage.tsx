import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { motion } from 'framer-motion';
import { 
  Key, 
  Webhook, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  RefreshCw, 
  Shield, 
  Clock, 
  BarChart2,
  Code,
  Eye,
  EyeOff,
  Settings,
  AlertTriangle,
  Server,
  Database
} from 'lucide-react';
import { useApiGateway } from '../hooks/useApiGateway';
import toast from 'react-hot-toast';

const ApiGatewayPage: React.FC = () => {
  const { 
    endpoints, 
    apiKeys, 
    loading, 
    generateApiKey, 
    revokeApiKey,
    createWebhook,
    testWebhook,
    getApiUsage
  } = useApiGateway();

  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [showCreateWebhookModal, setShowCreateWebhookModal] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>([]);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [apiUsage, setApiUsage] = useState<{ endpoint: string; calls: number; errors: number }[]>([]);
  const [loadingUsage, setLoadingUsage] = useState(false);

  const handleCreateApiKey = async () => {
    if (!newKeyName) {
      toast.error('Please enter a name for the API key');
      return;
    }

    if (newKeyPermissions.length === 0) {
      toast.error('Please select at least one permission');
      return;
    }

    const apiKey = await generateApiKey(newKeyName, newKeyPermissions);
    if (apiKey) {
      setGeneratedKey(apiKey.key);
      setShowCreateKeyModal(false);
      setShowApiKeyModal(true);
      setNewKeyName('');
      setNewKeyPermissions([]);
    }
  };

  const handleCreateWebhook = async () => {
    if (!newWebhookUrl) {
      toast.error('Please enter a webhook URL');
      return;
    }

    if (newWebhookEvents.length === 0) {
      toast.error('Please select at least one event');
      return;
    }

    const result = await createWebhook(newWebhookUrl, newWebhookEvents);
    if (result) {
      setGeneratedSecret(result.secret);
      setShowCreateWebhookModal(false);
      setShowApiKeyModal(true);
      setNewWebhookUrl('');
      setNewWebhookEvents([]);
    }
  };

  const handleTestWebhook = async (url: string) => {
    await testWebhook(url);
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

  const handleRevokeApiKey = async (id: string) => {
    if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      await revokeApiKey(id);
    }
  };

  const handleLoadApiUsage = async () => {
    setLoadingUsage(true);
    const usage = await getApiUsage();
    setApiUsage(usage);
    setLoadingUsage(false);
  };

  const permissionOptions = [
    { id: 'read:contacts', label: 'Read Contacts' },
    { id: 'write:contacts', label: 'Write Contacts' },
    { id: 'read:messages', label: 'Read Messages' },
    { id: 'write:messages', label: 'Send Messages' },
    { id: 'read:automations', label: 'Read Automations' },
    { id: 'write:automations', label: 'Write Automations' },
    { id: 'read:campaigns', label: 'Read Campaigns' },
    { id: 'write:campaigns', label: 'Write Campaigns' }
  ];

  const webhookEventOptions = [
    { id: 'message.received', label: 'Message Received' },
    { id: 'message.sent', label: 'Message Sent' },
    { id: 'message.delivered', label: 'Message Delivered' },
    { id: 'message.read', label: 'Message Read' },
    { id: 'contact.created', label: 'Contact Created' },
    { id: 'contact.updated', label: 'Contact Updated' },
    { id: 'automation.triggered', label: 'Automation Triggered' },
    { id: 'campaign.completed', label: 'Campaign Completed' }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          API Gateway
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-3"
        >
          <Button
            variant="outline"
            leftIcon={<Webhook size={16} />}
            onClick={() => setShowCreateWebhookModal(true)}
          >
            Create Webhook
          </Button>
          <Button
            variant="primary"
            leftIcon={<Key size={16} />}
            onClick={() => setShowCreateKeyModal(true)}
          >
            Generate API Key
          </Button>
        </motion.div>
      </div>

      {/* API Keys Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="mr-2" size={20} />
              API Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            {apiKeys.length === 0 ? (
              <div className="text-center py-8">
                <Key size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
                <p className="text-gray-500 mb-6">Generate an API key to access the WhatsApp Autoresponder API</p>
                <Button
                  variant="outline"
                  leftIcon={<Plus size={16} />}
                  onClick={() => setShowCreateKeyModal(true)}
                >
                  Generate API Key
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                        <div className="mt-1 flex items-center">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                          </code>
                          <button
                            onClick={() => handleCopyToClipboard(apiKey.key, apiKey.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                          >
                            {copied === apiKey.id ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Created: {apiKey.createdAt.toLocaleDateString()}
                          {apiKey.lastUsed && ` • Last used: ${apiKey.lastUsed.toLocaleDateString()}`}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeApiKey(apiKey.id)}
                        className="text-error-500 hover:text-error-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Permissions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {apiKey.permissions.map((permission) => (
                          <span
                            key={permission}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* API Endpoints Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Code className="mr-2" size={20} />
                API Endpoints
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<BarChart2 size={16} />}
                onClick={handleLoadApiUsage}
                isLoading={loadingUsage}
              >
                Load Usage Stats
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Endpoint
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Auth Required
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate Limit
                    </th>
                    {apiUsage.length > 0 && (
                      <>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Calls
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Errors
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {endpoints.map((endpoint) => {
                    const usage = apiUsage.find(u => u.endpoint === endpoint.path);
                    
                    return (
                      <tr key={endpoint.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {endpoint.path}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {endpoint.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {endpoint.requiresAuth ? (
                            <span className="text-green-600">Yes</span>
                          ) : (
                            <span className="text-red-600">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {endpoint.rateLimit}/min
                        </td>
                        {apiUsage.length > 0 && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {usage ? usage.calls.toLocaleString() : 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={usage && usage.errors > 0 ? 'text-red-600' : 'text-gray-500'}>
                                {usage ? usage.errors.toLocaleString() : 0}
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* API Documentation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2" size={20} />
              API Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <Server className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">API Base URL</h3>
                    <div className="mt-2 flex items-center">
                      <code className="text-sm bg-white px-2 py-1 rounded border border-blue-200">
                        https://api.whatsapp-autoresponder.com/v1
                      </code>
                      <button
                        onClick={() => handleCopyToClipboard('https://api.whatsapp-autoresponder.com/v1', 'base-url')}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        {copied === 'base-url' ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-3">
                    All API requests must include your API key in the Authorization header:
                  </p>
                  <div className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
                      <code>
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Example Request</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-3">
                    Example of sending a message using the API:
                  </p>
                  <div className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
                      <code>
{`curl -X POST https://api.whatsapp-autoresponder.com/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+1234567890",
    "message": "Hello from the API!",
    "type": "text"
  }'`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  leftIcon={<Book size={16} />}
                  onClick={() => window.open('https://docs.whatsapp-autoresponder.com', '_blank')}
                >
                  View Full API Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Create API Key Modal */}
      <Modal
        isOpen={showCreateKeyModal}
        onClose={() => setShowCreateKeyModal(false)}
        title="Generate API Key"
        size="md"
      >
        <div className="space-y-6">
          <Input
            label="API Key Name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="e.g., Production API Key"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
              {permissionOptions.map((permission) => (
                <label key={permission.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newKeyPermissions.includes(permission.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewKeyPermissions([...newKeyPermissions, permission.id]);
                      } else {
                        setNewKeyPermissions(newKeyPermissions.filter(p => p !== permission.id));
                      }
                    }}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="text-yellow-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  API keys provide full access to your account based on the permissions you select. Keep your API keys secure and never share them publicly.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateKeyModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateApiKey}
            >
              Generate Key
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Webhook Modal */}
      <Modal
        isOpen={showCreateWebhookModal}
        onClose={() => setShowCreateWebhookModal(false)}
        title="Create Webhook"
        size="md"
      >
        <div className="space-y-6">
          <Input
            label="Webhook URL"
            value={newWebhookUrl}
            onChange={(e) => setNewWebhookUrl(e.target.value)}
            placeholder="https://your-server.com/webhook"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Events to Subscribe
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
              {webhookEventOptions.map((event) => (
                <label key={event.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newWebhookEvents.includes(event.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewWebhookEvents([...newWebhookEvents, event.id]);
                      } else {
                        setNewWebhookEvents(newWebhookEvents.filter(e => e !== event.id));
                      }
                    }}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{event.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              leftIcon={<RefreshCw size={16} />}
              onClick={() => handleTestWebhook(newWebhookUrl)}
              disabled={!newWebhookUrl}
            >
              Test Webhook
            </Button>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateWebhookModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateWebhook}
              >
                Create Webhook
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* API Key Created Modal */}
      <Modal
        isOpen={showApiKeyModal}
        onClose={() => {
          setShowApiKeyModal(false);
          setGeneratedKey(null);
          setGeneratedSecret(null);
        }}
        title={generatedKey ? "API Key Generated" : "Webhook Created"}
        size="md"
      >
        <div className="space-y-6">
          {generatedKey && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="text-yellow-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      This API key will only be displayed once. Please copy it now and store it securely.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your API Key
                </label>
                <div className="flex items-center">
                  <code className="flex-1 bg-gray-100 p-3 rounded-lg text-sm break-all">
                    {generatedKey}
                  </code>
                  <button
                    onClick={() => handleCopyToClipboard(generatedKey, 'generated-key')}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    {copied === 'generated-key' ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {generatedSecret && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="text-yellow-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                    <p className="mt-1 text-sm text-yellow-700">
                      This webhook secret will only be displayed once. Please copy it now and store it securely.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook Secret
                </label>
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <code className="block w-full bg-gray-100 p-3 rounded-lg text-sm break-all">
                      {showSecret ? generatedSecret : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopyToClipboard(generatedSecret, 'generated-secret')}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    {copied === 'generated-secret' ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Verify Webhook Signatures</h3>
                <p className="text-sm text-gray-600 mb-3">
                  To verify webhook payloads, compute an HMAC hex digest using your webhook secret:
                </p>
                <div className="bg-gray-100 p-3 rounded-lg overflow-x-auto">
                  <pre className="text-xs text-gray-800">
                    <code>
{`// Node.js example
const crypto = require('crypto');

const signature = req.headers['x-waa-signature'];
const timestamp = req.headers['x-waa-timestamp'];
const payload = req.body;

const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
const digest = hmac.update(timestamp + '.' + JSON.stringify(payload)).digest('hex');

if (signature === digest) {
  // Webhook is valid
} else {
  // Invalid webhook
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => {
                setShowApiKeyModal(false);
                setGeneratedKey(null);
                setGeneratedSecret(null);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApiGatewayPage;