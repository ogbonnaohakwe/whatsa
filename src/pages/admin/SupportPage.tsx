import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Headset,
  Users,
  MessageCircle,
  Mail,
  Calendar,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

const escalations = [
  {
    id: 'ESC-472',
    customer: 'Nimbus Retail',
    issue: 'Message delivery delays in APAC',
    priority: 'High',
    owner: 'alex@nimbus.com',
    status: 'In progress',
  },
  {
    id: 'ESC-473',
    customer: 'Orbit Logistics',
    issue: 'Integrations failing to sync contacts',
    priority: 'Medium',
    owner: 'sarah@orbit.io',
    status: 'Awaiting customer',
  },
  {
    id: 'ESC-474',
    customer: 'Vertex Finance',
    issue: 'Need audit log export for compliance',
    priority: 'Low',
    owner: 'support@vertex.co',
    status: 'Resolved',
  },
];

const agentStats = [
  { label: 'Active agents', value: 18, trend: '+3%' },
  { label: 'Avg. response time', value: '11m', trend: '-15%' },
  { label: 'CSAT (7d)', value: '97%', trend: '+4%' },
];

const AdminSupportPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Support Operations
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            Schedule coverage
          </Button>
          <Button variant="primary" leftIcon={<Headset size={16} />}>
            Launch support center
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {agentStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                  <Users size={20} />
                </div>
                <span className="text-sm font-medium text-success-600 flex items-center gap-1">
                  <TrendingUp size={16} />
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-3xl font-bold mt-4">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Priority Escalations</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<MessageCircle size={16} />}>
                  Join triage room
                </Button>
                <Button variant="outline" leftIcon={<Mail size={16} />}>
                  Send update
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {escalations.map((escalation) => (
              <div key={escalation.id} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400">{escalation.id}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{escalation.customer}</h3>
                    <p className="text-sm text-gray-500">{escalation.issue}</p>
                    <p className="text-xs text-gray-400">Owner: {escalation.owner}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      escalation.priority === 'High'
                        ? 'bg-red-50 text-red-700'
                        : escalation.priority === 'Medium'
                        ? 'bg-warning-50 text-warning-700'
                        : 'bg-primary-50 text-primary-700'
                    }`}
                  >
                    {escalation.priority} priority
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      escalation.status === 'Resolved'
                        ? 'bg-success-50 text-success-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {escalation.status}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Update timeline
                    </Button>
                    <Button variant="outline" size="sm">
                      Close escalation
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Playbooks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900">Incident Response</p>
              <p className="text-xs text-gray-500">Escalation matrix & comms templates</p>
              <Button variant="outline" size="sm" className="mt-3" fullWidth>
                View playbook
              </Button>
            </div>
            <div className="border border-gray-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900">Enterprise Onboarding</p>
              <p className="text-xs text-gray-500">Checklist for high-touch customers</p>
              <Button variant="outline" size="sm" className="mt-3" fullWidth>
                Assign owner
              </Button>
            </div>
            <div className="p-4 bg-success-50 rounded-lg text-sm text-success-700 flex items-start gap-2">
              <CheckCircle size={16} className="mt-0.5" />
              SLA compliance is healthy. Keep monitoring weekly trends to maintain CSAT.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSupportPage;

