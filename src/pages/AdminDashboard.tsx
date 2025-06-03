import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Users, MessageSquare, CreditCard, Settings, Shield, BarChart2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: <Users size={24} /> },
    { label: 'Active Subscriptions', value: '892', icon: <CreditCard size={24} /> },
    { label: 'Messages Sent Today', value: '45.2K', icon: <MessageSquare size={24} /> },
    { label: 'Revenue This Month', value: '$12,345', icon: <BarChart2 size={24} /> }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Dashboard
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    {stat.icon}
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Users size={16} />}
                className="justify-start"
              >
                Manage Users
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Shield size={16} />}
                className="justify-start"
              >
                User Permissions
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Settings size={16} />}
                className="justify-start"
              >
                User Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Management */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                leftIcon={<CreditCard size={16} />}
                className="justify-start"
              >
                Manage Plans
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<BarChart2 size={16} />}
                className="justify-start"
              >
                Revenue Analytics
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<MessageSquare size={16} />}
                className="justify-start"
              >
                Usage Statistics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;