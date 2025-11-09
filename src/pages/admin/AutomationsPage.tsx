import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Bot,
  Zap,
  GitBranch,
  PlusCircle,
  Settings,
  Activity,
  RefreshCw,
  PauseCircle,
  PlayCircle,
} from 'lucide-react';

const automationPipelines = [
  {
    name: 'Onboarding Concierge',
    owner: 'Growth Team',
    status: 'Running',
    lastRun: '5 minutes ago',
    health: 'stable',
  },
  {
    name: 'High-Value Lead Escalation',
    owner: 'Sales Ops',
    status: 'Paused',
    lastRun: '2 hours ago',
    health: 'attention',
  },
  {
    name: 'Churn Prevention Flow',
    owner: 'Customer Success',
    status: 'Running',
    lastRun: '14 minutes ago',
    health: 'stable',
  },
];

const automationMetrics = [
  { label: 'Active Pipelines', value: 32, trend: '+6%' },
  { label: 'Average SLA', value: '3m 14s', trend: '-12%' },
  { label: 'Auto-resolved Tickets', value: 418, trend: '+18%' },
];

const AdminAutomationsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Automation Control
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Zap size={16} />}>
            Automation Policies
          </Button>
          <Button variant="primary" leftIcon={<PlusCircle size={16} />}>
            New Pipeline
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {automationMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                  <Bot size={20} />
                </div>
                <span className="text-sm font-medium text-success-600">{metric.trend}</span>
              </div>
              <h3 className="text-3xl font-bold mt-4">{metric.value}</h3>
              <p className="text-gray-600">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Pipeline Directory</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<GitBranch size={16} />}>
                  Template Library
                </Button>
                <Button variant="outline" leftIcon={<Activity size={16} />}>
                  Execution History
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {automationPipelines.map((pipeline) => (
              <div
                key={pipeline.name}
                className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pipeline.name}</h3>
                    <p className="text-sm text-gray-500">
                      Owner: <span className="font-medium text-gray-700">{pipeline.owner}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Last run: {pipeline.lastRun}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        pipeline.status === 'Running'
                          ? 'bg-success-50 text-success-700'
                          : 'bg-warning-50 text-warning-700'
                      }`}
                    >
                      {pipeline.status}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        pipeline.health === 'stable'
                          ? 'bg-primary-50 text-primary-700'
                          : 'bg-warning-50 text-warning-700'
                      }`}
                    >
                      Health: {pipeline.health}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Settings size={14} />}>
                      Configure
                    </Button>
                    {pipeline.status === 'Running' ? (
                      <Button variant="outline" size="sm" leftIcon={<PauseCircle size={14} />}>
                        Pause
                      </Button>
                    ) : (
                      <Button variant="primary" size="sm" leftIcon={<PlayCircle size={14} />}>
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Window</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Next window</p>
              <p className="text-sm text-gray-600">Sunday, 02:00 - 03:00 UTC</p>
            </div>
            <Button variant="outline" fullWidth>
              Schedule maintenance
            </Button>
            <Button variant="outline" fullWidth>
              Generate runbook
            </Button>
            <Button variant="outline" fullWidth>
              Notify stakeholders
            </Button>
            <div className="p-4 bg-success-50 rounded-lg text-sm text-success-700">
              No automation incidents detected in the last 24 hours.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAutomationsPage;

