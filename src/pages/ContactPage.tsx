import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { MessageSquare, Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

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
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help. Contact our friendly team for support or inquiries.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  rows={6}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <Button type="submit" variant="primary" fullWidth>
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="text-primary-500 mt-1 mr-4" size={20} />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">support@whatsapp-autoresponder.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-primary-500 mt-1 mr-4" size={20} />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-primary-500 mt-1 mr-4" size={20} />
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-gray-600">
                      123 Business Street<br />
                      Suite 100<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-primary-500 mt-1 mr-4" size={20} />
                  <div>
                    <h3 className="font-medium">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Need immediate help?</h3>
                <p className="text-gray-600 mb-6">
                  Check out our comprehensive help center for quick answers to common questions.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.location.href = '/help'}
                >
                  Visit Help Center
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-video rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Office location"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;