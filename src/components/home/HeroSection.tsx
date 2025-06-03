import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { MessageSquare, BarChart2, Users, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Automate Your WhatsApp Business Communications
            </motion.h1>
            
            <motion.p variants={item} className="text-xl text-gray-600">
              Save time, increase engagement, and grow your business with our powerful WhatsApp automation platform.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Get Started for Free
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/features')}
              >
                See Features
              </Button>
            </motion.div>
            
            <motion.div variants={item}>
              <p className="text-sm text-gray-500 mb-2">Trusted by businesses worldwide</p>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                <img src="https://images.pexels.com/photos/4435019/pexels-photo-4435019.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Company 1" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Company 2" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Company 3" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative z-10">
            <img
              src="https://images.pexels.com/photos/6280678/pexels-photo-6280678.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="WhatsApp Automation"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-full">
                  <BarChart2 size={20} className="text-primary-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Response Rate</p>
                  <p className="text-xl font-bold text-primary-500">94%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-full">
                  <Clock size={20} className="text-primary-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Time Saved</p>
                  <p className="text-xl font-bold text-primary-500">12 hrs/week</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;