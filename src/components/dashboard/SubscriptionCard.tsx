import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Crown, Check, AlertCircle, CreditCard, Settings, Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentSubscription, createCheckoutSession } from '../../lib/stripe';
import { STRIPE_PRODUCTS } from '../../stripe-config';
import toast from 'react-hot-toast';

const SubscriptionCard: React.FC = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const data = await getCurrentSubscription();
      setSubscription(data);
    } catch (error) {
      console.error('Error loading subscription:', error);
      toast.error('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (priceId: string) => {
    try {
      setUpgrading(true);
      const url = await createCheckoutSession(priceId, 'subscription');
      window.location.href = url;
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      toast.error('Failed to start upgrade process');
    } finally {
      setUpgrading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        </CardContent>
      </Card>
    );
  }

  const currentPlan = subscription?.price_id ? STRIPE_PRODUCTS.starter : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Crown className="text-primary-500 mr-2" size={24} />
          Current Subscription
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {currentPlan?.name || 'No Active Subscription'}
            </h3>
            {currentPlan && (
              <div className="mt-1">
                <span className="text-3xl font-bold">${currentPlan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
            )}
          </div>

          {subscription && (
            <>
              <div className="space-y-2">
                {currentPlan?.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-primary-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <AlertCircle size={16} className="mr-2" />
                  Next billing date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={showUpgradeOptions ? 'primary' : 'outline'}
                    onClick={() => setShowUpgradeOptions(!showUpgradeOptions)}
                    leftIcon={<Crown size={16} />}
                  >
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<Settings size={16} />}
                  >
                    Manage Plan
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  <Button
                    variant="ghost"
                    fullWidth
                    leftIcon={<CreditCard size={16} />}
                    className="justify-start"
                  >
                    Update Payment Method
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    leftIcon={<Download size={16} />}
                    className="justify-start"
                  >
                    Download Invoices
                  </Button>
                </div>
              </div>
            </>
          )}

          {!subscription && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Subscribe to a plan to access premium features and increase your limits.
              </p>
              <Button
                variant="primary"
                onClick={() => window.location.href = '/pricing'}
                leftIcon={<Crown size={16} />}
              >
                View Plans
              </Button>
            </div>
          )}

          {showUpgradeOptions && subscription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-gray-200"
            >
              <h4 className="text-lg font-semibold mb-4">Upgrade Options</h4>
              <div className="space-y-4">
                {Object.values(STRIPE_PRODUCTS)
                  .filter(plan => plan.priceId !== subscription.price_id)
                  .map((plan) => (
                    <div
                      key={plan.priceId}
                      className="border rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold">{plan.name}</h5>
                          <p className="text-2xl font-bold">${plan.price}<span className="text-sm text-gray-500">/month</span></p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpgrade(plan.priceId)}
                          disabled={upgrading}
                        >
                          {upgrading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Select'
                          )}
                        </Button>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check size={14} className="text-primary-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;