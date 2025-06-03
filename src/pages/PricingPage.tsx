import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Check, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { STRIPE_PRODUCTS } from '../stripe-config';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

const PricingPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login?redirect=/pricing';
      return;
    }

    try {
      setLoading(priceId);
      const url = await createCheckoutSession(priceId, 'subscription');
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to start checkout process');
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for small businesses just getting started with WhatsApp automation',
      features: [
        'Up to 1,000 contacts',
        '500 messages per day',
        'Basic auto-responses',
        'Contact management',
        'Email support',
        '1 team member'
      ],
      priceId: STRIPE_PRODUCTS.starter.priceId
    },
    {
      name: 'Professional',
      price: 79,
      description: 'Ideal for growing businesses needing advanced features and automation',
      features: [
        'Up to 5,000 contacts',
        '2,000 messages per day',
        'Advanced auto-responses',
        'Custom workflows',
        'API access',
        'Priority support',
        '3 team members',
        'Analytics dashboard'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'For large organizations requiring maximum scalability and custom solutions',
      features: [
        'Unlimited contacts',
        'Unlimited messages',
        'AI-powered responses',
        'Custom integrations',
        'Dedicated account manager',
        'SLA support',
        'Unlimited team members',
        'Advanced analytics',
        'Custom reporting'
      ]
    }
  ];

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose the perfect plan for your business needs
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full ${plan.popular ? 'border-2 border-primary-500 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="mt-2 text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={20} className="text-primary-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                    onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
                    disabled={loading === plan.priceId || !plan.priceId}
                  >
                    {loading === plan.priceId ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : plan.priceId ? (
                      'Subscribe Now'
                    ) : (
                      'Contact Sales'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I change plans later?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">Yes, we offer a 14-day free trial on all plans. No credit card required to start.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you offer custom plans?</h3>
                <p className="text-gray-600">Yes, we can create custom plans for businesses with specific needs. Contact our sales team to discuss.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;