import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CtaSection from '../components/home/CtaSection';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <CtaSection />
      
      {/* Integration Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seamlessly Integrates With Your Favorite Tools
            </h2>
            <p className="text-xl text-gray-600">
              Connect WhatsApp Autoresponder with the tools you already use
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {['Shopify', 'WooCommerce', 'HubSpot', 'Zapier', 'Mailchimp', 'Salesforce', 'Google Sheets', 'WordPress'].map((partner, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-6 w-full flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <p className="text-xl font-medium text-gray-500">{partner}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;