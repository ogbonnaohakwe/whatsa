import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  Webhook,
  Link,
  Shield,
  Activity,
  Clock,
  Plus,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

const webhookEndpoints = [
  {
    name: 'Production - Events',
    url: 'https://api.company.com/webhooks/events',
    status: 'active',
    deliveries: '1.2M',
    uptime: '99.98%',
    lastError: 'None',
  },
  {
    name: 'Sandbox - QA',
    url: 'https://staging.company.com/webhooks/qa',
    status: 'paused',
    deliveries: '84K',
    uptime: '98.42%',
    lastError: 'Timeout · 3 days ago',
  },
];

const AdminWebhooksPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Webhook Orchestration
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
            Sync schemas
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Add endpoint
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <Webhook size={20} />
              </div>
              <span className="text-xs font-medium text-primary-600">Past 24 hours</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">182,430</h3>
            <p className="text-gray-600">Events delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <Shield size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Configure
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">HMAC + mTLS</h3>
            <p className="text-gray-600">Security posture</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                <AlertTriangle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                View incidents
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">3</h3>
            <p className="text-gray-600">Retries queued</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Endpoint Directory</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Activity size={16} />}>
                  Delivery logs
                </Button>
                <Button variant="outline" leftIcon={<Clock size={16} />}>
                  Retry schedule
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {webhookEndpoints.map((endpoint) => (
              <div key={endpoint.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{endpoint.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Link size={16} className="text-primary-500" />
                      <span className="truncate">{endpoint.url}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        endpoint.status === 'active'
                          ? 'bg-success-50 text-success-700'
                          : 'bg-warning-50 text-warning-700'
                      }`}
                    >
                      {endpoint.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                    <div className="text-xs text-gray-500">
                      <p>Deliveries: {endpoint.deliveries}</p>
                      <p>Uptime: {endpoint.uptime}</p>
                      <p>Last error: {endpoint.lastError}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Rotate secret
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Display name" />
            <Input placeholder="https://example.com/webhooks" />
            <Button variant="outline" fullWidth>
              Configure authentication
            </Button>
            <Button variant="primary" fullWidth>
              Save endpoint
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminWebhooksPage;

