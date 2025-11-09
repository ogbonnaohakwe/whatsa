import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  Search,
  Filter,
  RefreshCw,
  Shield,
  AlertTriangle,
  Download,
} from 'lucide-react';

const activityLog = [
  { id: 1, actor: 'System', action: 'Scheduled maintenance window opened', scope: 'Infrastructure', time: '2 minutes ago', type: 'maintenance' },
  { id: 2, actor: 'Sarah Chen', action: 'Updated billing plan for Acme Inc.', scope: 'Billing', time: '14 minutes ago', type: 'billing' },
  { id: 3, actor: 'Admin API', action: 'Generated new API key for developer workspace', scope: 'Security', time: '32 minutes ago', type: 'api' },
  { id: 4, actor: 'John Doe', action: 'Deactivated 4 dormant user accounts', scope: 'User Management', time: '1 hour ago', type: 'user' },
  { id: 5, actor: 'Security Bot', action: 'Resolved anomaly on webhook endpoint', scope: 'Security', time: '2 hours ago', type: 'security' },
];

const quickFilters = [
  { label: 'All', value: 'all' },
  { label: 'User', value: 'user' },
  { label: 'Billing', value: 'billing' },
  { label: 'Security', value: 'security' },
  { label: 'API', value: 'api' },
];

const AdminActivityLogsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Activity Logs
        </motion.h1>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Button variant="primary" leftIcon={<RefreshCw size={16} />}>
            Refresh Logs
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Recent Platform Activity</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Filter size={16} />}>
                  Advanced Filters
                </Button>
                <Button variant="outline" leftIcon={<Shield size={16} />}>
                  Audit Policies
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search activity by user, event or resource…" className="pl-9" />
              </div>
              <div className="flex gap-2">
                {quickFilters.map((filter) => (
                  <Button key={filter.value} variant={filter.value === 'all' ? 'primary' : 'outline'} size="sm">
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {activityLog.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <p className="text-sm text-gray-500">{entry.time}</p>
                      <h3 className="text-base font-semibold text-gray-900">{entry.action}</h3>
                      <p className="text-sm text-gray-500">
                        by <span className="font-medium text-gray-700">{entry.actor}</span> ·{' '}
                        <span className="text-primary-600">{entry.scope}</span>
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                      {entry.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Activity logs are retained for 365 days. Configure your archival policy to keep historical audits
                compliant.
              </p>
              <Button variant="outline" className="mt-4" fullWidth>
                Manage Retention Policy
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-warning-500" />
                Alerts Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• 2 unresolved security alerts</li>
                <li>• 5 policy changes awaiting review</li>
                <li>• 1 pending compliance export</li>
              </ul>
              <Button variant="primary" className="mt-4" fullWidth>
                Review Alerts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Trail Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" fullWidth>
                Schedule Daily Export
              </Button>
              <Button variant="outline" fullWidth>
                Connect SIEM
              </Button>
              <Button variant="outline" fullWidth>
                Configure Webhook
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminActivityLogsPage;

