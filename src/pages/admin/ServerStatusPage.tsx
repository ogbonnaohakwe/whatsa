import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Server,
  Activity,
  Cloud,
  AlertTriangle,
  Cpu,
  HardDrive,
  Network,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

const serviceGrid = [
  { name: 'Realtime Gateway', region: 'us-east-1', status: 'operational', latency: '24 ms', uptime: '99.99%' },
  { name: 'Messaging Queue', region: 'eu-west-1', status: 'operational', latency: '31 ms', uptime: '99.95%' },
  { name: 'Automation Workers', region: 'ap-southeast-1', status: 'degraded', latency: '68 ms', uptime: '99.74%' },
];

const resourceBreakdown = [
  { resource: 'CPU', usage: '64%', icon: <Cpu size={20} /> },
  { resource: 'Storage', usage: '72%', icon: <HardDrive size={20} /> },
  { resource: 'Network', usage: '48%', icon: <Network size={20} /> },
];

const AdminServerStatusPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Infrastructure Health
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
            Sync status
          </Button>
          <Button variant="primary" leftIcon={<ShieldCheck size={16} />}>
            Initiate failover
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <Server size={20} />
              </div>
              <span className="text-xs font-medium text-primary-600">Active nodes</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">128</h3>
            <p className="text-gray-600">Service instances online</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <Activity size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Incident log
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">99.96%</h3>
            <p className="text-gray-600">Rolling 30-day uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                <AlertTriangle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Alert policies
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">4</h3>
            <p className="text-gray-600">Active incidents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Service Grid</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Cloud size={16} />}>
                  Region map
                </Button>
                <Button variant="outline" leftIcon={<Activity size={16} />}>
                  Performance traces
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceGrid.map((service) => (
              <div key={service.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.region}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      service.status === 'operational'
                        ? 'bg-success-50 text-success-700'
                        : 'bg-warning-50 text-warning-700'
                    }`}
                  >
                    {service.status === 'operational' ? 'Operational' : 'Degraded'}
                  </span>
                  <div className="text-sm text-gray-600">
                    <p>Latency: {service.latency}</p>
                    <p>Uptime: {service.uptime}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View logs
                    </Button>
                    <Button variant="outline" size="sm">
                      Run diagnostics
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resourceBreakdown.map((resource) => (
              <div key={resource.resource} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    {resource.icon}
                    {resource.resource}
                  </div>
                  <p className="text-sm text-gray-500">{resource.usage}</p>
                </div>
                <Button variant="outline" size="sm" className="mt-3" fullWidth>
                  Optimize allocation
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminServerStatusPage;

