import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  AlertTriangle,
  Bell,
  Shield,
  Activity,
  PauseCircle,
  PlayCircle,
  CheckCircle,
  Settings,
} from 'lucide-react';

const activeAlerts = [
  {
    id: 'ALT-2045',
    title: 'Webhook delivery retries exceed threshold',
    severity: 'High',
    source: 'Integrations',
    detected: '12 minutes ago',
  },
  {
    id: 'ALT-2046',
    title: 'Unusual login pattern detected in EMEA region',
    severity: 'Medium',
    source: 'Security',
    detected: '28 minutes ago',
  },
  {
    id: 'ALT-2047',
    title: 'Campaign approval backlog above SLA',
    severity: 'Low',
    source: 'Marketing Ops',
    detected: '45 minutes ago',
  },
];

const policySummary = [
  { name: 'Security Incidents', status: 'Active', escalations: 'Auto to PagerDuty' },
  { name: 'Messaging Delivery', status: 'Active', escalations: 'NOC rotation' },
  { name: 'Growth Workflows', status: 'Paused', escalations: 'Weekly digest' },
];

const AdminAlertsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Alert Center
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Settings size={16} />}>
            Policy settings
          </Button>
          <Button variant="primary" leftIcon={<Bell size={16} />}>
            Send status update
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <AlertTriangle size={20} />
              </div>
              <span className="text-xs font-medium text-primary-600">Live monitoring</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">8</h3>
            <p className="text-gray-600">Active alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <CheckCircle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Review all
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">42</h3>
            <p className="text-gray-600">Resolved today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <Shield size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Review
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">3</h3>
            <p className="text-gray-600">Policies paused</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Active Alerts</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Activity size={16} />}>
                  Incident timeline
                </Button>
                <Button variant="outline" leftIcon={<PauseCircle size={16} />}>
                  Silence rules
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400">{alert.id}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-500">
                      Source: <span className="font-medium text-gray-700">{alert.source}</span>
                    </p>
                    <p className="text-xs text-gray-400">Detected {alert.detected}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'High'
                        ? 'bg-red-50 text-red-700'
                        : alert.severity === 'Medium'
                        ? 'bg-warning-50 text-warning-700'
                        : 'bg-primary-50 text-primary-700'
                    }`}
                  >
                    {alert.severity} severity
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Escalate
                    </Button>
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {policySummary.map((policy) => (
              <div key={policy.name} className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900">{policy.name}</p>
                <p className="text-xs text-gray-500">Status: {policy.status}</p>
                <p className="text-xs text-gray-400">Escalation: {policy.escalations}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  fullWidth
                  leftIcon={policy.status === 'Paused' ? <PlayCircle size={14} /> : <PauseCircle size={14} />}
                >
                  {policy.status === 'Paused' ? 'Resume policy' : 'Pause policy'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAlertsPage;

