import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  CreditCard,
  Users,
  TrendingUp,
  DollarSign,
  Settings,
  RefreshCw,
  Filter,
  Download,
} from 'lucide-react';

const plans = [
  { name: 'Starter', users: 412, monthlyRevenue: '$12,360', trend: '+4.5%' },
  { name: 'Professional', users: 275, monthlyRevenue: '$21,890', trend: '+7.2%' },
  { name: 'Enterprise', users: 58, monthlyRevenue: '$34,550', trend: '+12.1%' },
];

const expiringSubscriptions = [
  { company: 'Blue Ocean Labs', plan: 'Professional', renewalDate: 'Mar 22, 2025', owner: 'maya@blueocean.com' },
  { company: 'Atlas Corp', plan: 'Enterprise', renewalDate: 'Mar 28, 2025', owner: 'alex@atlascorp.io' },
  { company: 'Greenfield Retail', plan: 'Starter', renewalDate: 'Apr 02, 2025', owner: 'finance@greenfield.com' },
];

const AdminSubscriptionsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Subscription Management
        </motion.h1>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export Metrics
          </Button>
          <Button variant="primary" leftIcon={<CreditCard size={16} />}>
            Create Plan
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-primary-50 text-primary-600">
                <DollarSign size={20} />
              </div>
              <span className="inline-flex items-center text-sm font-medium text-success-600">
                <TrendingUp size={16} className="mr-1" />
                9.8% MoM
              </span>
            </div>
            <h3 className="text-3xl font-bold mt-4">$68,800</h3>
            <p className="text-gray-600">Monthly Recurring Revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                <Users size={20} />
              </div>
              <Button variant="ghost" size="sm">
                View cohort
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">745</h3>
            <p className="text-gray-600">Active Subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-full bg-green-50 text-green-600">
                <RefreshCw size={20} />
              </div>
              <Button variant="ghost" size="sm">
                Configure
              </Button>
            </div>
            <h3 className="text-3xl font-bold mt-4">2.4%</h3>
            <p className="text-gray-600">Churn Rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Plan Performance</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<Filter size={16} />}>
                  Segment filters
                </Button>
                <Button variant="outline" leftIcon={<Settings size={16} />}>
                  Billing settings
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Active Accounts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Monthly Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {plans.map((plan) => (
                    <tr key={plan.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{plan.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{plan.users}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{plan.monthlyRevenue}</td>
                      <td className="px-6 py-4 text-sm text-success-600">{plan.trend}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View Cohort
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Renewals Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expiringSubscriptions.map((subscription) => (
              <div key={subscription.company} className="border border-gray-100 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900">{subscription.company}</h4>
                <p className="text-xs text-gray-500">Account owner: {subscription.owner}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                    {subscription.plan}
                  </span>
                  <span className="text-xs text-gray-500">Renews {subscription.renewalDate}</span>
                </div>
                <Button variant="outline" size="sm" className="mt-3" fullWidth>
                  Schedule touchpoint
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSubscriptionsPage;

