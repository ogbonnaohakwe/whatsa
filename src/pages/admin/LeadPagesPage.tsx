import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Globe,
  LayoutPanelLeft,
  Eye,
  Layers,
  TrendingUp,
  Edit,
  Copy,
  MonitorSmartphone,
} from 'lucide-react';

const leadPageInventory = [
  {
    name: 'Product Demo Booking',
    owner: 'Solutions Team',
    status: 'Published',
    conversion: '18.4%',
    lastUpdated: '3 days ago',
  },
  {
    name: 'Partner Sign-up',
    owner: 'BD Ops',
    status: 'Draft',
    conversion: '—',
    lastUpdated: '12 hours ago',
  },
  {
    name: 'Early Access Waitlist',
    owner: 'Growth Studio',
    status: 'Published',
    conversion: '24.1%',
    lastUpdated: '1 week ago',
  },
];

const layoutUsage = [
  { template: 'Webinar Funnel', usage: 12, performance: 'High' },
  { template: 'Lead Magnet', usage: 9, performance: 'Medium' },
  { template: 'Event Registration', usage: 6, performance: 'High' },
];

const AdminLeadPagesPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lead Page Governance
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<LayoutPanelLeft size={16} />}>
            Template library
          </Button>
          <Button variant="primary" leftIcon={<Globe size={16} />}>
            Publish page
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <Globe size={20} />
              </div>
              <span className="inline-flex items-center text-sm font-medium text-success-600">
                <TrendingUp size={16} className="mr-1" />
                3.4% WoW
              </span>
            </div>
            <h3 className="text-3xl font-bold mt-4">48</h3>
            <p className="text-gray-600">Published experiences</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <MonitorSmartphone size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Device report
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">91%</h3>
            <p className="text-gray-600">Mobile conversion uplift</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                <Layers size={20} />
              </div>
              <Button variant="ghost" size="sm">
                View archive
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">132</h3>
            <p className="text-gray-600">Design iterations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Portfolio Oversight</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Eye size={16} />}>
                  Preview mode
                </Button>
                <Button variant="outline" leftIcon={<Copy size={16} />}>
                  Duplicate flow
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {leadPageInventory.map((page) => (
              <div key={page.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{page.name}</h3>
                    <p className="text-sm text-gray-500">
                      Owner: <span className="font-medium text-gray-700">{page.owner}</span>
                    </p>
                    <p className="text-xs text-gray-400">Last updated {page.lastUpdated}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        page.status === 'Published'
                          ? 'bg-success-50 text-success-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {page.status}
                    </span>
                    <div className="text-sm text-gray-600">
                      Conversion:{' '}
                      <span className="font-medium text-gray-900">{page.conversion}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Edit size={14} />}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Governance
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Template Utilization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {layoutUsage.map((template) => (
              <div key={template.template} className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900">{template.template}</p>
                <p className="text-xs text-gray-500">{template.usage} active experiences</p>
                <p className="text-xs text-gray-400">Performance: {template.performance}</p>
                <Button variant="outline" size="sm" className="mt-3" fullWidth>
                  Manage style guide
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLeadPagesPage;

