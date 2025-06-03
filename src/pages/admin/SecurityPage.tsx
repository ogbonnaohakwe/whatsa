import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Key, 
  Lock,
  UserCheck,
  AlertTriangle,
  Eye,
  RefreshCw,
  Database
} from 'lucide-react';

const SecurityPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-2xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Security Settings
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Key className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">API Keys</h3>
                    <p className="text-sm text-gray-500">Manage API access tokens</p>
                  </div>
                </div>
                <Button variant="outline">Manage Keys</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Lock className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Password Policy</h3>
                    <p className="text-sm text-gray-500">Set password requirements</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <UserCheck className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Role Management</h3>
                    <p className="text-sm text-gray-500">Configure user roles and permissions</p>
                  </div>
                </div>
                <Button variant="outline">Manage Roles</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Eye className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Activity Logs</h3>
                    <p className="text-sm text-gray-500">View security audit logs</p>
                  </div>
                </div>
                <Button variant="outline">View Logs</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Database className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Data Access</h3>
                    <p className="text-sm text-gray-500">Manage data access policies</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-warning-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Alert Settings</h3>
                    <p className="text-sm text-gray-500">Configure security notifications</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <RefreshCw className="text-primary-500 mr-3" size={24} />
                  <div>
                    <h3 className="font-medium">Auto-Response</h3>
                    <p className="text-sm text-gray-500">Set up automated security responses</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-success-50 rounded-lg">
                <h3 className="font-medium text-success-700 flex items-center">
                  <Shield className="mr-2" size={20} />
                  System Security Status: Good
                </h3>
                <p className="text-sm text-success-600 mt-1">
                  All security systems are functioning normally
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Last Security Scan</h4>
                  <p className="text-sm text-gray-500">2025-03-15 14:30</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Next Scheduled Scan</h4>
                  <p className="text-sm text-gray-500">2025-03-16 14:30</p>
                </div>
              </div>

              <Button variant="primary" fullWidth>
                Run Security Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityPage;