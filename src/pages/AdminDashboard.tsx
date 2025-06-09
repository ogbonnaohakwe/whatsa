import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Shield, 
  BarChart2, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Server,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Download
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Total Users', 
      value: '12,847', 
      icon: <Users size={24} />, 
      change: '+12.5%',
      trend: 'up',
      color: 'blue'
    },
    { 
      label: 'Active Subscriptions', 
      value: '8,923', 
      icon: <CreditCard size={24} />, 
      change: '+8.2%',
      trend: 'up',
      color: 'green'
    },
    { 
      label: 'Messages Today', 
      value: '2.4M', 
      icon: <MessageSquare size={24} />, 
      change: '+15.3%',
      trend: 'up',
      color: 'purple'
    },
    { 
      label: 'Revenue (MTD)', 
      value: '$89,247', 
      icon: <BarChart2 size={24} />, 
      change: '+23.1%',
      trend: 'up',
      color: 'orange'
    }
  ];

  const systemStatus = [
    { name: 'API Server', status: 'healthy', uptime: '99.9%', color: 'green' },
    { name: 'Database', status: 'healthy', uptime: '99.8%', color: 'green' },
    { name: 'WhatsApp Gateway', status: 'warning', uptime: '98.2%', color: 'yellow' },
    { name: 'Email Service', status: 'healthy', uptime: '99.7%', color: 'green' },
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'john@example.com', time: '2 minutes ago', type: 'user' },
    { action: 'Subscription upgraded', user: 'sarah@company.com', time: '5 minutes ago', type: 'billing' },
    { action: 'API key generated', user: 'dev@startup.io', time: '8 minutes ago', type: 'api' },
    { action: 'Security alert resolved', user: 'System', time: '12 minutes ago', type: 'security' },
    { action: 'Bulk message campaign sent', user: 'marketing@corp.com', time: '15 minutes ago', type: 'message' },
  ];

  const quickActions = [
    { label: 'View All Users', icon: <Users size={16} />, action: '/admin/users' },
    { label: 'System Health', icon: <Activity size={16} />, action: '/admin/server' },
    { label: 'Security Logs', icon: <Shield size={16} />, action: '/admin/security' },
    { label: 'Export Data', icon: <Download size={16} />, action: '#' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100">Here's what's happening with your platform today.</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10"
              leftIcon={action.icon}
              onClick={() => action.action !== '#' && (window.location.href = action.action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <div className={`text-${stat.color}-600`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="ml-1 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2" size={20} />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        system.color === 'green' ? 'bg-green-500' :
                        system.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{system.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{system.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{system.uptime}</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" fullWidth leftIcon={<Eye size={16} />}>
                  View Detailed Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" size={20} />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'billing' ? 'bg-green-100 text-green-600' :
                      activity.type === 'api' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'security' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.type === 'user' && <Users size={14} />}
                      {activity.type === 'billing' && <CreditCard size={14} />}
                      {activity.type === 'api' && <Zap size={14} />}
                      {activity.type === 'security' && <Shield size={14} />}
                      {activity.type === 'message' && <MessageSquare size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" fullWidth leftIcon={<Eye size={16} />}>
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Platform Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2" size={20} />
              Platform Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                <p className="text-gray-600">Active Integrations</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2.4M</div>
                <p className="text-gray-600">Messages Processed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <p className="text-gray-600">System Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;