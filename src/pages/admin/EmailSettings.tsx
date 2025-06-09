import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Textarea } from '../../components/ui/FormElements';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Settings, 
  Eye, 
  EyeOff, 
  TestTube, 
  Shield, 
  Server,
  Key,
  Globe,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmailSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'smtp' | 'templates' | 'delivery' | 'security'>('smtp');
  const [showPassword, setShowPassword] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [smtpSettings, setSmtpSettings] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: 'noreply@whatsapp-autoresponder.com',
    password: '••••••••••••',
    encryption: 'tls',
    fromName: 'WhatsApp Autoresponder',
    fromEmail: 'noreply@whatsapp-autoresponder.com',
    replyTo: 'support@whatsapp-autoresponder.com'
  });

  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to WhatsApp Autoresponder!',
      content: `Hi {{name}},

Welcome to WhatsApp Autoresponder! We're excited to have you on board.

Your account is now active and ready to use. Here's what you can do next:

1. Connect your WhatsApp Business account
2. Set up your first automation
3. Import your contacts

If you need any help, don't hesitate to reach out to our support team.

Best regards,
The WhatsApp Autoresponder Team`,
      variables: ['name', 'email', 'company']
    },
    {
      id: 'password-reset',
      name: 'Password Reset',
      subject: 'Reset Your Password',
      content: `Hi {{name}},

You requested to reset your password for your WhatsApp Autoresponder account.

Click the link below to reset your password:
{{reset_link}}

This link will expire in 24 hours.

If you didn't request this, please ignore this email.

Best regards,
The WhatsApp Autoresponder Team`,
      variables: ['name', 'reset_link', 'expiry_time']
    },
    {
      id: 'subscription-expired',
      name: 'Subscription Expired',
      subject: 'Your Subscription Has Expired',
      content: `Hi {{name}},

Your WhatsApp Autoresponder subscription has expired.

To continue using our service, please renew your subscription:
{{renewal_link}}

Your account will remain active for 7 more days.

Best regards,
The WhatsApp Autoresponder Team`,
      variables: ['name', 'renewal_link', 'expiry_date']
    }
  ]);

  const [deliverySettings, setDeliverySettings] = useState({
    maxRetries: '3',
    retryDelay: '300',
    rateLimit: '100',
    bounceHandling: true,
    trackOpens: true,
    trackClicks: true,
    suppressionList: true
  });

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setIsTesting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Test email sent to ${testEmail}`);
    } catch (error) {
      toast.error('Failed to send test email');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveSettings = () => {
    toast.success('Email settings saved successfully!');
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

  const tabs = [
    { id: 'smtp', label: 'SMTP Configuration', icon: <Server size={16} /> },
    { id: 'templates', label: 'Email Templates', icon: <Mail size={16} /> },
    { id: 'delivery', label: 'Delivery Settings', icon: <Send size={16} /> },
    { id: 'security', label: 'Security', icon: <Shield size={16} /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
        <p className="text-gray-600">Configure email delivery, templates, and security settings</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Email Status', value: 'Active', icon: <CheckCircle size={20} />, color: 'green' },
          { label: 'Daily Sent', value: '1,247', icon: <Send size={20} />, color: 'blue' },
          { label: 'Delivery Rate', value: '98.5%', icon: <Globe size={20} />, color: 'purple' },
          { label: 'Bounce Rate', value: '1.2%', icon: <AlertTriangle size={20} />, color: 'orange' }
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

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {activeTab === 'smtp' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="SMTP Host"
                  value={smtpSettings.host}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                  placeholder="smtp.gmail.com"
                  leftIcon={<Server size={16} />}
                />
                <Input
                  label="Port"
                  value={smtpSettings.port}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, port: e.target.value })}
                  placeholder="587"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Username"
                  value={smtpSettings.username}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
                  placeholder="your-email@domain.com"
                  leftIcon={<Mail size={16} />}
                />
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                    placeholder="Enter SMTP password"
                    leftIcon={<Key size={16} />}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption
                </label>
                <select
                  value={smtpSettings.encryption}
                  onChange={(e) => setSmtpSettings({ ...smtpSettings, encryption: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Default Sender Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="From Name"
                    value={smtpSettings.fromName}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, fromName: e.target.value })}
                    placeholder="WhatsApp Autoresponder"
                  />
                  <Input
                    label="From Email"
                    value={smtpSettings.fromEmail}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })}
                    placeholder="noreply@domain.com"
                  />
                </div>
                <div className="mt-4">
                  <Input
                    label="Reply-To Email"
                    value={smtpSettings.replyTo}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, replyTo: e.target.value })}
                    placeholder="support@domain.com"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Test Email Configuration</h3>
                <div className="flex space-x-4">
                  <Input
                    label="Test Email Address"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                    className="flex-1"
                  />
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={handleTestEmail}
                      isLoading={isTesting}
                      leftIcon={<TestTube size={16} />}
                    >
                      Send Test
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              {emailTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" leftIcon={<Eye size={16} />}>
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm" leftIcon={<Settings size={16} />}>
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Subject Line"
                      value={template.subject}
                      onChange={() => {}}
                      placeholder="Email subject"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Content
                      </label>
                      <textarea
                        value={template.content}
                        onChange={() => {}}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        rows={8}
                        placeholder="Email content..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Variables
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {template.variables.map((variable) => (
                          <div
                            key={variable}
                            className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-md"
                          >
                            <code className="text-sm">{`{{${variable}}}`}</code>
                            <button
                              onClick={() => handleCopyToClipboard(`{{${variable}}}`, variable)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {copied === variable ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Max Retry Attempts"
                  value={deliverySettings.maxRetries}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, maxRetries: e.target.value })}
                  placeholder="3"
                  helperText="Number of retry attempts for failed emails"
                />
                <Input
                  label="Retry Delay (seconds)"
                  value={deliverySettings.retryDelay}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, retryDelay: e.target.value })}
                  placeholder="300"
                  helperText="Delay between retry attempts"
                />
              </div>

              <Input
                label="Rate Limit (emails per hour)"
                value={deliverySettings.rateLimit}
                onChange={(e) => setDeliverySettings({ ...deliverySettings, rateLimit: e.target.value })}
                placeholder="100"
                helperText="Maximum emails to send per hour"
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Email Tracking</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Track Email Opens</label>
                      <p className="text-sm text-gray-500">Track when recipients open emails</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={deliverySettings.trackOpens}
                      onChange={(e) => setDeliverySettings({ ...deliverySettings, trackOpens: e.target.checked })}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Track Link Clicks</label>
                      <p className="text-sm text-gray-500">Track when recipients click links in emails</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={deliverySettings.trackClicks}
                      onChange={(e) => setDeliverySettings({ ...deliverySettings, trackClicks: e.target.checked })}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Bounce Handling</label>
                      <p className="text-sm text-gray-500">Automatically handle bounced emails</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={deliverySettings.bounceHandling}
                      onChange={(e) => setDeliverySettings({ ...deliverySettings, bounceHandling: e.target.checked })}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Suppression List</label>
                      <p className="text-sm text-gray-500">Maintain a list of emails to suppress</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={deliverySettings.suppressionList}
                      onChange={(e) => setDeliverySettings({ ...deliverySettings, suppressionList: e.target.checked })}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertTriangle className="text-yellow-400 mr-3 mt-0.5" size={20} />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Security Recommendations</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use strong, unique passwords for SMTP authentication</li>
                        <li>Enable two-factor authentication when available</li>
                        <li>Regularly rotate API keys and passwords</li>
                        <li>Monitor email delivery logs for suspicious activity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">DKIM Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">DKIM Enabled</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          DKIM Selector
                        </label>
                        <code className="block bg-gray-100 p-2 rounded text-sm">default._domainkey</code>
                      </div>
                      <Button variant="outline" size="sm" fullWidth>
                        Regenerate DKIM Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SPF Record</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">SPF Status</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Valid</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SPF Record
                        </label>
                        <code className="block bg-gray-100 p-2 rounded text-sm break-all">
                          v=spf1 include:_spf.google.com ~all
                        </code>
                      </div>
                      <Button variant="outline" size="sm" fullWidth>
                        Verify SPF Record
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Email Security Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: '2 hours ago', event: 'SMTP password updated', status: 'success' },
                      { time: '1 day ago', event: 'DKIM key rotated', status: 'success' },
                      { time: '3 days ago', event: 'Failed login attempt detected', status: 'warning' },
                      { time: '1 week ago', event: 'SPF record verified', status: 'success' }
                    ].map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            log.status === 'success' ? 'bg-green-500' :
                            log.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium">{log.event}</span>
                        </div>
                        <span className="text-sm text-gray-500">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
              Reset to Defaults
            </Button>
            <Button variant="primary" onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSettings;