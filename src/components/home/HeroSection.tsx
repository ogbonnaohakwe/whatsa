import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { MessageSquare, BarChart2, Users, Clock, Play, Star, CheckCircle, ArrowRight, Zap } from 'lucide-react';

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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={item} className="flex justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-white">
                  #1 WhatsApp Automation Platform
                </span>
                <Star className="w-4 h-4 text-yellow-400 ml-2 fill-current" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={item} 
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
            >
              Automate Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                WhatsApp Business
              </span>{' '}
              Communications
            </motion.h1>
            
            <motion.p 
              variants={item} 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Save time, increase engagement, and grow your business with our powerful 
              AI-driven WhatsApp automation platform trusted by{' '}
              <span className="text-cyan-400 font-semibold">10,000+</span> businesses worldwide.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={item} 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                rightIcon={<ArrowRight size={20} />}
              >
                Start Free Trial
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/features')}
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300"
                leftIcon={<Play size={20} />}
              >
                Watch Demo
              </Button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div variants={item} className="space-y-4">
              <p className="text-sm text-gray-400 font-medium">Trusted by industry leaders</p>
              <div className="flex flex-wrap gap-8 items-center justify-center opacity-60">
                {['Microsoft', 'Shopify', 'Salesforce', 'HubSpot'].map((company, index) => (
                  <div key={index} className="text-white font-semibold text-lg">
                    {company}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Benefits */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: CheckCircle, text: "14-day free trial" },
                { icon: CheckCircle, text: "No credit card required" },
                { icon: CheckCircle, text: "Setup in 5 minutes" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center text-green-400">
                  <benefit.icon className="w-5 h-5 mr-2" />
                  <span className="text-white font-medium">{benefit.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-6">
              {/* Browser Header */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-white/10 rounded-md px-3 py-1 ml-4">
                  <span className="text-white/60 text-sm">whatsapp-autoresponder.com/dashboard</span>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Messages Sent</p>
                        <p className="text-2xl font-bold">12,847</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-green-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Response Rate</p>
                        <p className="text-2xl font-bold">94%</p>
                      </div>
                      <BarChart2 className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Active Contacts</p>
                        <p className="text-2xl font-bold">3,245</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <BarChart2 className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Real-time Analytics Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={floatingAnimation}
            className="absolute -top-6 -right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-xl shadow-2xl"
          >
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-xs opacity-90">Time Saved</p>
                <p className="font-bold">12 hrs/week</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{...floatingAnimation, transition: {...floatingAnimation.transition, delay: 1}}}
            className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-2xl"
          >
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-5 h-5" />
              <div>
                <p className="text-xs opacity-90">Response Rate</p>
                <p className="font-bold">94%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;