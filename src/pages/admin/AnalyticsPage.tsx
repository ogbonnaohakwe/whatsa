import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Users, 
  MessageSquare, 
  CreditCard, 
  TrendingUp,
  Activity,
  Globe
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const userGrowthData = [
    { name: 'Jan', users: 1200 },
    { name: 'Feb', users: 1500 },
    { name: 'Mar', users: 2000 },
    { name: 'Apr', users: 2400 },
    { name: 'May', users: 2800 },
    { name: 'Jun', users: 3200 }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 15000 },
    { name: 'Feb', revenue: 18000 },
    { name: 'Mar', revenue: 22000 },
    { name: 'Apr', revenue: 25000 },
    { name: 'May', revenue: 28000 },
    { name: 'Jun', revenue: 32000 }
  ];

  const engagementData = [
    { name: 'Mon', messages: 2400, responses: 1800 },
    { name: 'Tue', messages: 3200, responses: 2400 },
    { name: 'Wed', messages: 2800, responses: 2100 },
    { name: 'Thu', messages: 3600, responses: 2700 },
    { name: 'Fri', messages: 3000, responses: 2300 },
    { name: 'Sat', messages: 2000, responses: 1500 },
    { name: 'Sun', messages: 1800, responses: 1400 }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-2xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Analytics Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Users', value: '3,245', icon: <Users size={24} />, trend: '+12%' },
          { title: 'Active Subscriptions', value: '892', icon: <CreditCard size={24} />, trend: '+8%' },
          { title: 'Messages Sent', value: '45.2K', icon: <MessageSquare size={24} />, trend: '+15%' }
        ].map((stat, index) => (
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
                  <span className="text-success-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#25D366" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#25D366" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Message Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="messages" fill="#25D366" />
                  <Bar dataKey="responses" fill="#075E54" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;