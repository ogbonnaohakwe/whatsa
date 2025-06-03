import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { CreditCard, Clock, Shield, Download, Settings } from 'lucide-react';

interface SubscriptionSettingsProps {
  currentPlan: {
    name: string;
    price: number;
    billingCycle: 'monthly' | 'yearly';
    nextBillingDate: string;
    status: 'active' | 'cancelled' | 'past_due';
  };
}

const SubscriptionSettings: React.FC<SubscriptionSettingsProps> = ({ currentPlan }) => {
  const [showBillingHistory, setShowBillingHistory] = useState(false);

  const billingHistory = [
    {
      date: '2025-03-01',
      amount: 79.00,
      status: 'paid',
      invoice: '#INV-2025-001'
    },
    {
      date: '2025-02-01',
      amount: 79.00,
      status: 'paid',
      invoice: '#INV-2025-002'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Plan */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{currentPlan.name}</p>
                  <p className="text-2xl font-bold mt-1">${currentPlan.price}/{currentPlan.billingCycle}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentPlan.status === 'active' ? 'bg-success-100 text-success-800' :
                  currentPlan.status === 'cancelled' ? 'bg-error-100 text-error-800' :
                  'bg-warning-100 text-warning-800'
                }`}>
                  {currentPlan.status.charAt(0).toUpperCase() + currentPlan.status.slice(1)}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Next billing date: {currentPlan.nextBillingDate}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              fullWidth
              leftIcon={<CreditCard size={16} />}
              className="justify-start"
            >
              Update Payment Method
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Clock size={16} />}
              className="justify-start"
            >
              Change Billing Cycle
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Shield size={16} />}
              className="justify-start"
            >
              Security Settings
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Settings size={16} />}
              className="justify-start"
            >
              Billing Preferences
            </Button>
          </div>

          {/* Billing History */}
          <div>
            <button
              className="flex items-center text-sm font-medium text-gray-900 hover:text-gray-700"
              onClick={() => setShowBillingHistory(!showBillingHistory)}
            >
              <span className="mr-2">Billing History</span>
              <svg
                className={`h-5 w-5 transform ${showBillingHistory ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showBillingHistory && (
              <div className="mt-4">
                <div className="bg-white rounded-lg border border-gray-200">
                  {billingHistory.map((bill, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 ${
                        index !== billingHistory.length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div>
                        <p className="font-medium">{bill.invoice}</p>
                        <p className="text-sm text-gray-500">{bill.date}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-4">${bill.amount.toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Download size={16} />}
                        >
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSettings;