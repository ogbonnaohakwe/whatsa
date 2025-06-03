import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  MessageSquare, 
  Users, 
  Bot, 
  Send, 
  BarChart2,
  Smartphone,
  Clock,
  FileText,
  Zap,
  Shield,
  Globe,
  Database
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare size={24} className="text-primary-500" />,
      title: 'Auto Responses',
      description: 'Set up intelligent auto-responses to handle common inquiries automatically. Our AI-powered system learns from conversations to provide more accurate responses over time.',
    },
    {
      icon: <Users size={24} className="text-primary-500" />,
      title: 'Contact Management',
      description: 'Organize contacts into groups, add tags, and manage all your WhatsApp contacts in one place. Import contacts easily and keep your database synchronized.',
    },
    {
      icon: <Bot size={24} className="text-primary-500" />,
      title: 'AI-Powered Automation',
      description: 'Leverage advanced AI to automate routine tasks and create sophisticated conversation flows that feel natural and personalized.',
    },
    {
      icon: <Send size={24} className="text-primary-500" />,
      title: 'Bulk Messaging',
      description: 'Send personalized messages to targeted groups with advanced scheduling and delivery tracking. Ensure compliance with WhatsApp\'s policies.',
    },
    {
      icon: <BarChart2 size={24} className="text-primary-500" />,
      title: 'Advanced Analytics',
      description: 'Get detailed insights into message performance, response rates, and customer engagement. Track key metrics and optimize your communication strategy.',
    },
    {
      icon: <Smartphone size={24} className="text-primary-500" />,
      title: 'Lead Generation',
      description: 'Create custom opt-in pages and forms to capture leads directly through WhatsApp. Integrate with your existing CRM systems.',
    },
    {
      icon: <Clock size={24} className="text-primary-500" />,
      title: 'Smart Scheduling',
      description: 'Schedule messages and campaigns across different time zones. Optimize delivery times for maximum engagement.',
    },
    {
      icon: <FileText size={24} className="text-primary-500" />,
      title: 'Template Library',
      description: 'Access a library of pre-built message templates for various scenarios. Customize and save your own templates for quick access.',
    },
    {
      icon: <Zap size={24} className="text-primary-500" />,
      title: 'Integration Support',
      description: 'Connect with popular platforms like Shopify, WooCommerce, HubSpot, and more. Automate workflows across your tech stack.',
    },
    {
      icon: <Shield size={24} className="text-primary-500" />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with end-to-end encryption. GDPR compliant data handling and storage.',
    },
    {
      icon: <Globe size={24} className="text-primary-500" />,
      title: 'Multi-language Support',
      description: 'Communicate in multiple languages with automatic translation. Support customers globally with localized responses.',
    },
    {
      icon: <Database size={24} className="text-primary-500" />,
      title: 'API Access',
      description: 'Full API access for custom integrations. Build your own solutions using our robust API endpoints.',
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Powerful Features for WhatsApp Business
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to automate and scale your WhatsApp business communications
            </p>
            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = '/register'}
              >
                Get Started Free
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-elevation-2 transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your WhatsApp Business?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of businesses already using our platform
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = '/register'}
              className="bg-white text-primary-900 hover:bg-gray-100"
            >
              Start Your Free Trial
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;