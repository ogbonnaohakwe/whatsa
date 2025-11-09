import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  Key,
  Lock,
  RefreshCw,
  Eye,
  Shield,
  Copy,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

const apiKeys = [
  {
    name: 'Production Operator',
    scope: 'Full access',
    created: 'Jan 18, 2025',
    lastUsed: '5 minutes ago',
    status: 'active',
  },
  {
    name: 'Automation Worker',
    scope: 'Workflow + messaging',
    created: 'Feb 2, 2025',
    lastUsed: '14 minutes ago',
    status: 'active',
  },
  {
    name: 'Growth Sandbox',
    scope: 'Read-only',
    created: 'Mar 4, 2025',
    lastUsed: '2 days ago',
    status: 'rotating',
  },
];

const AdminApiKeysPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          API Access Management
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Eye size={16} />}>
            Access audit
          </Button>
          <Button variant="primary" leftIcon={<Key size={16} />}>
            Issue new key
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <Lock size={20} />
              </div>
              <span className="text-xs font-medium text-primary-600">Policy: Rotates every 60 days</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">12</h3>
            <p className="text-gray-600">Active service keys</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <CheckCircle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Remediate
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">0</h3>
            <p className="text-gray-600">Compromised credentials</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                <AlertTriangle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                View policy
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">3</h3>
            <p className="text-gray-600">Keys pending rotation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Credential Directory</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Shield size={16} />}>
                  Scope policies
                </Button>
                <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
                  Rotate selected
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{key.name}</h3>
                    <p className="text-sm text-gray-500">{key.scope}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created {key.created} · Last used {key.lastUsed}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      key.status === 'active'
                        ? 'bg-success-50 text-success-700'
                        : 'bg-primary-50 text-primary-700'
                    }`}
                  >
                    {key.status === 'active' ? 'Active' : 'Rotating'}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Copy size={14} />}>
                      Copy token
                    </Button>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issue New Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Label (e.g. Billing Service)" />
            <Input placeholder="Allowed IP ranges" />
            <Button variant="outline" fullWidth>
              Configure scopes
            </Button>
            <Button variant="primary" fullWidth>
              Generate key
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminApiKeysPage;

