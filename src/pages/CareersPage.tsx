import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { MapPin, DollarSign, Clock, Users, Send } from 'lucide-react';

const CareersPage: React.FC = () => {
  const openings = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $160k'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$110k - $140k'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70k - $90k'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $100k'
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
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600">
              Help us revolutionize business communication through WhatsApp automation
            </p>
          </motion.div>
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Join Us?</h2>
          <p className="text-xl text-gray-600">
            Be part of a team that's transforming how businesses communicate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="text-primary-500\" size={24} />,
              title: 'Great Team Culture',
              description: 'Work with passionate individuals in a collaborative environment'
            },
            {
              icon: <Clock className="text-primary-500" size={24} />,
              title: 'Flexible Hours',
              description: 'Work-life balance is important to us'
            },
            {
              icon: <DollarSign className="text-primary-500\" size={24} />,
              title: 'Competitive Benefits',
              description: 'Comprehensive health coverage and equity packages'
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity with us
            </p>
          </motion.div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-elevation-2 transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <DollarSign size={16} className="mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button
                          variant="primary"
                          rightIcon={<Send size={16} />}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Don't see the right role?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented individuals to join our team.
            Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button
            variant="primary"
            size="lg"
            rightIcon={<Send size={16} />}
          >
            Send General Application
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CareersPage;