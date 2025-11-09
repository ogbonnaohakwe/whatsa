import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import {
  Settings,
  Building,
  Shield,
  Globe,
  Users,
  Save,
  Upload,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

const toggles = [
  { label: 'Require SSO for administrators', enabled: true },
  { label: 'Enforce device posture checks', enabled: true },
  { label: 'Enable weekly governance report', enabled: false },
  { label: 'Allow sandbox provisioning', enabled: true },
];

const AdminSettingsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Admin Settings
        </motion.h1>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="outline" leftIcon={<Upload size={16} />}>
            Import policy
          </Button>
          <Button variant="primary" leftIcon={<Save size={16} />}>
            Save changes
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building size={18} className="text-primary-600" />
              Organization Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Organization name" defaultValue="WhatsApp Autoresponder Inc." />
              <Input placeholder="Primary contact email" defaultValue="ops@autoresponder.io" />
            </div>
            <Input placeholder="Billing address" defaultValue="123 Platform Lane, San Francisco, CA" />
            <Input placeholder="Support portal URL" defaultValue="https://support.autoresponder.io" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Default locale" defaultValue="en-US" />
              <Input placeholder="Data residency" defaultValue="United States" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={18} className="text-primary-600" />
              Governance Toggles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {toggles.map((toggle) => (
              <div key={toggle.label} className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{toggle.label}</p>
                {toggle.enabled ? (
                  <ToggleRight size={28} className="text-primary-500" />
                ) : (
                  <ToggleLeft size={28} className="text-gray-300" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={18} className="text-primary-600" />
              Localization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>• Supported languages: EN, ES, FR, PT.</p>
            <p>• Regional compliance pack: EU + LATAM.</p>
            <p>• Routed support queues for multilingual agents.</p>
            <Button variant="outline" className="mt-2" fullWidth>
              Manage locales
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={18} className="text-primary-600" />
              Access Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>• Delegated administration enabled.</p>
            <p>• Support access auto-expires after 7 days.</p>
            <p>• Regional data controllers assigned.</p>
            <Button variant="outline" className="mt-2" fullWidth>
              Configure policies
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={18} className="text-primary-600" />
              Platform Defaults
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>• Default workspace: Production.</p>
            <p>• SLA target: 4h response, 24h resolution.</p>
            <p>• Automation guardrails enforced.</p>
            <Button variant="outline" className="mt-2" fullWidth>
              Update defaults
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

