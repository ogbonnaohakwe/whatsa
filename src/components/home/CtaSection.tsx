import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { MessageCircle, PhoneCall } from 'lucide-react';

const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Automate Your WhatsApp Business?
          </h2>
          <p className="text-xl mb-8 text-primary-50">
            Join thousands of businesses saving time and increasing engagement with WhatsApp Autoresponder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate('/register')}
              leftIcon={<MessageCircle size={20} />}
              className="bg-white text-primary-700 hover:bg-gray-100"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => {}}
              leftIcon={<PhoneCall size={20} />}
              className="border-white text-white hover:bg-primary-600"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-primary-100">
            No credit card required. 14-day free trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;