import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Bot, 
  Send, 
  BarChart2,
  Smartphone, 
  Clock,
  FileText
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="h-full hover:shadow-elevation-2 transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare size={24} className="text-primary-500" />,
      title: 'Auto Responses',
      description: 'Set up automatic responses to common questions and never miss an opportunity to engage with your customers.',
    },
    {
      icon: <Users size={24} className="text-primary-500" />,
      title: 'Contact Management',
      description: 'Organize contacts into groups, add tags, and manage all your WhatsApp contacts in one place.',
    },
    {
      icon: <Bot size={24} className="text-primary-500" />,
      title: 'WhatsApp Automation',
      description: 'Automate routine tasks and message flows to improve efficiency and customer experience.',
    },
    {
      icon: <Send size={24} className="text-primary-500" />,
      title: 'Bulk Messaging',
      description: 'Send personalized messages to targeted groups or your entire contact list with a few clicks.',
    },
    {
      icon: <BarChart2 size={24} className="text-primary-500" />,
      title: 'Analytics & Reporting',
      description: 'Get insights into message performance, response rates, and customer engagement.',
    },
    {
      icon: <Smartphone size={24} className="text-primary-500" />,
      title: 'Lead Capture Pages',
      description: 'Create custom opt-in pages to grow your contact list and generate qualified leads.',
    },
    {
      icon: <Clock size={24} className="text-primary-500" />,
      title: 'Scheduled Messages',
      description: 'Plan your communication in advance by scheduling messages and campaigns for later delivery.',
    },
    {
      icon: <FileText size={24} className="text-primary-500" />,
      title: 'Exportable Widgets',
      description: 'Easily embed lead capture forms into your existing websites to grow your WhatsApp contacts.',
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Everything You Need for WhatsApp Business Automation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Powerful tools to automate your WhatsApp messaging and grow your business
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;