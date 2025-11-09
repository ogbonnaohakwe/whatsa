import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Shield,
  UserCheck,
  Lock,
  Key,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const roles = [
  {
    name: 'Super Admin',
    members: 3,
    description: 'Full access to all resources, billing, and security controls.',
    permissions: ['Manage users', 'Modify billing', 'Access system controls', 'Security overrides'],
  },
  {
    name: 'Operations',
    members: 12,
    description: 'Monitor platform performance and manage communication channels.',
    permissions: ['Monitor infrastructure', 'Manage automations', 'Review campaigns'],
  },
  {
    name: 'Support',
    members: 24,
    description: 'Handle customer issues and moderate message templates.',
    permissions: ['Access customer accounts', 'Moderate templates', 'Escalate incidents'],
  },
];

const AdminPermissionsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Role & Permission Control
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Key size={16} />}>
            View Access Logs
          </Button>
          <Button variant="primary" leftIcon={<Plus size={16} />}>
            Create Role
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={18} className="text-primary-600" />
              Security Guardrails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>• Mandatory multi-factor authentication for privileged roles.</p>
            <p>• Weekly access reviews for critical infrastructure.</p>
            <p>• Automated approvals for least-privilege changes.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle size={18} className="text-success-600" />
              Compliance Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>• SOC 2 controls up to date.</p>
            <p>• ISO access policy review due in 12 days.</p>
            <p>• 3 open permission requests awaiting approval.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-warning-500" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>• Security audit scheduled for March 20.</p>
            <p>• Review 5 escalated overrides.</p>
            <p>• Confirm deprovisioned contractors (8 accounts).</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Role Directory</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<UserCheck size={16} />}>
                  Assign users
                </Button>
                <Button variant="outline" leftIcon={<Lock size={16} />}>
                  Review policies
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles.map((role) => (
              <div key={role.name} className="border border-gray-200 rounded-xl p-5 hover:border-primary-200 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-700">
                        {role.members} members
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{role.description}</p>
                    <ul className="mt-3 grid gap-2 text-sm text-gray-600 md:grid-cols-2">
                      {role.permissions.map((permission) => (
                        <li key={permission} className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-success-500" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Edit size={14} />}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" leftIcon={<Trash2 size={14} />}>
                      Archive
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPermissionsPage;

