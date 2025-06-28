import React from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import MessagesChart from '../components/dashboard/MessagesChart';
import RecentContacts from '../components/dashboard/RecentContacts';
import WhatsappConnect from '../components/dashboard/WhatsappConnect';
import StatusUpdates from '../components/dashboard/StatusUpdates';
import StatusUpdateForm from '../components/dashboard/StatusUpdateForm';
import SubscriptionCard from '../components/dashboard/SubscriptionCard';
import DatabaseStatus from '../components/dashboard/DatabaseStatus';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { mockDashboardStats, mockWeeklyMessageData, mockContacts } from '../mock/mockData';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Users, Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useWhatsappStore } from '../store/whatsappStore';

const DashboardPage: React.FC = () => {
  const { isConnected } = useWhatsappStore();

  const currentPlan = {
    name: 'Professional Plan',
    price: 79,
    billingCycle: 'monthly' as const,
    features: [
      'Up to 5,000 contacts',
      '2,000 messages per day',
      'Advanced auto-responses',
      'Custom workflows',
      'API access',
      'Priority support'
    ],
    nextBillingDate: 'April 1, 2025'
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
          >
            New Automation
          </Button>
        </motion.div>
      </div>

      <DatabaseStatus />
      
      <WhatsappConnect />

      {isConnected && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DashboardStats stats={mockDashboardStats} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MessagesChart data={mockWeeklyMessageData} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SubscriptionCard currentPlan={currentPlan} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StatusUpdateForm />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <RecentContacts contacts={mockContacts} />
            </motion.div>
          </div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <StatusUpdates />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;