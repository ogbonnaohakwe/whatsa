import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Filter,
  Globe,
  Upload,
  Eye,
  Ban,
} from 'lucide-react';

const templateModerationQueue = [
  {
    id: 'TMP-1845',
    name: 'Black Friday Promo',
    submittedBy: 'marketing@retail.io',
    region: 'LATAM',
    status: 'Pending Review',
    submittedAt: '15 minutes ago',
  },
  {
    id: 'TMP-1846',
    name: 'Service Downtime Notice',
    submittedBy: 'ops@saasflow.com',
    region: 'North America',
    status: 'Flagged',
    submittedAt: '28 minutes ago',
  },
  {
    id: 'TMP-1847',
    name: 'Welcome Drip Series',
    submittedBy: 'growth@startuphub.io',
    region: 'EMEA',
    status: 'Approved',
    submittedAt: '1 hour ago',
  },
];

const deliveryHealth = [
  { region: 'North America', successRate: '99.2%', incidents: 0 },
  { region: 'Europe', successRate: '97.8%', incidents: 1 },
  { region: 'Asia Pacific', successRate: '98.6%', incidents: 0 },
];

const AdminMessagesPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Messaging Oversight
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Upload size={16} />}>
            Bulk Import Templates
          </Button>
          <Button variant="primary" leftIcon={<Filter size={16} />}>
            Moderate Queue
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <MessageSquare size={20} />
              </div>
              <span className="text-xs font-medium text-primary-600">Past 60 minutes</span>
            </div>
            <h3 className="text-3xl font-bold mt-4">182K</h3>
            <p className="text-gray-600">Messages processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <CheckCircle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                View report
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">98.4%</h3>
            <p className="text-gray-600">Delivery success</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-amber-50 text-amber-600">
                <AlertCircle size={20} />
              </div>
              <Button variant="ghost" size="sm">
                New policy
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">12</h3>
            <p className="text-gray-600">Templates pending review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Template Moderation Queue</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Eye size={16} />}>
                  Review Guidelines
                </Button>
                <Button variant="outline" leftIcon={<Ban size={16} />}>
                  Flagged Templates
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {templateModerationQueue.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400">{template.id}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500">
                      Submitted by <span className="font-medium text-gray-700">{template.submittedBy}</span>
                    </p>
                    <p className="text-xs text-gray-400">Submitted {template.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {template.region}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        template.status === 'Approved'
                          ? 'bg-success-50 text-success-700'
                          : template.status === 'Flagged'
                          ? 'bg-warning-50 text-warning-700'
                          : 'bg-primary-50 text-primary-700'
                      }`}
                    >
                      {template.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Health Monitor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {deliveryHealth.map((region) => (
              <div key={region.region} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-primary-600" />
                    <p className="text-sm font-semibold text-gray-900">{region.region}</p>
                  </div>
                  <p className="text-sm text-gray-500">{region.successRate} success</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">{region.incidents} incidents in last 24h</p>
                <Button variant="outline" size="sm" className="mt-3" fullWidth>
                  View routing rules
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessagesPage;

