import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Database,
  Server,
  Activity,
  AlertTriangle,
  BarChart2,
  RefreshCw,
  Shield,
  HardDrive,
} from 'lucide-react';

const clusterStatus = [
  { name: 'Primary Cluster', nodes: 6, latency: '12 ms', status: 'healthy', storage: '68%' },
  { name: 'Read Replica', nodes: 3, latency: '22 ms', status: 'healthy', storage: '45%' },
  { name: 'Analytics Warehouse', nodes: 4, latency: '48 ms', status: 'degraded', storage: '82%' },
];

const backupSchedule = [
  { type: 'Snapshot', cadence: 'Hourly', lastRun: '08:00 UTC', status: 'Completed' },
  { type: 'Full Backup', cadence: 'Daily', lastRun: '02:00 UTC', status: 'Completed' },
  { type: 'Disaster Recovery', cadence: 'Weekly', lastRun: 'Sunday', status: 'Queued' },
];

const AdminDatabasePage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Database Operations
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
            Sync replicas
          </Button>
          <Button variant="primary" leftIcon={<Shield size={16} />}>
            Enable failover
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <Database size={20} />
              </div>
              <span className="text-xs font-medium text-primary-600">Current throughput</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">182K ops/s</h3>
            <p className="text-gray-600">Read + write operations</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <HardDrive size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Expand storage
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">58 TB</h3>
            <p className="text-gray-600">Allocated capacity</p>
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
            <h3 className="text-3xl font-bold mt-4">2</h3>
            <p className="text-gray-600">Open maintenance tasks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Cluster Health</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<BarChart2 size={16} />}>
                  Query analytics
                </Button>
                <Button variant="outline" leftIcon={<Activity size={16} />}>
                  Performance logs
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {clusterStatus.map((cluster) => (
              <div key={cluster.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cluster.name}</h3>
                    <p className="text-sm text-gray-500">{cluster.nodes} nodes · {cluster.latency} latency</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      cluster.status === 'healthy'
                        ? 'bg-success-50 text-success-700'
                        : 'bg-warning-50 text-warning-700'
                    }`}
                  >
                    {cluster.status === 'healthy' ? 'Healthy' : 'Degraded'}
                  </span>
                  <div className="text-sm text-gray-600">
                    <p>Storage utilization</p>
                    <p className="font-medium text-gray-900">{cluster.storage}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Scale
                    </Button>
                    <Button variant="outline" size="sm">
                      Promote replica
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {backupSchedule.map((backup) => (
              <div key={backup.type} className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900">{backup.type}</p>
                <p className="text-xs text-gray-500">{backup.cadence}</p>
                <p className="text-xs text-gray-400">Last run: {backup.lastRun}</p>
                <Button variant="outline" size="sm" className="mt-3" fullWidth>
                  {backup.status === 'Completed' ? 'Restore point' : 'View queue'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDatabasePage;

