import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { User, Lock, Mail, Phone, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import WhatsAppBusinessSettings from '../components/dashboard/WhatsAppBusinessSettings';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-2xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-gray-500" />
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  id="name"
                  defaultValue={user?.name}
                  leftIcon={<User className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="Phone Number"
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                />
                
                <div className="pt-3">
                  <Button variant="primary">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  id="currentPassword"
                  type="password"
                  leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="New Password"
                  id="newPassword"
                  type="password"
                  leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                />
                
                <Input
                  label="Confirm New Password"
                  id="confirmPassword"
                  type="password"
                  leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                />
                
                <div className="pt-3">
                  <Button variant="primary">
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <WhatsAppBusinessSettings />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-error-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-error-600 mb-1">Delete Account</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-error-300 text-error-600 hover:bg-error-50"
                    leftIcon={<LogOut size={16} />}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;