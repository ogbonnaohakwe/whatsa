import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockCampaigns } from '../mock/mockData';
import { formatDate } from '../lib/utils';
import { Plus, Send, Clock, CheckCircle, AlertCircle, BarChart, Copy, Eye, Edit, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

const CampaignsPage: React.FC = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Campaigns
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
          >
            Create Campaign
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target Groups
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <Send className="text-primary-600" size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">{campaign.message}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          campaign.status === 'completed' ? 'bg-success-100 text-success-800' : 
                          campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status === 'completed' && <CheckCircle size={12} className="mr-1" />}
                          {campaign.status === 'scheduled' && <Clock size={12} className="mr-1" />}
                          {campaign.status === 'draft' && <Edit size={12} className="mr-1" />}
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {campaign.targetGroups.map((group, index) => (
                            <span
                              key={group}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-1"
                            >
                              Group {group}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {campaign.status === 'completed' ? (
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className="mr-2">Sent: {campaign.sentCount}</span>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 w-20">
                                <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2">Read: {campaign.readCount}</span>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 w-20">
                                <div className="bg-primary-500 h-1.5 rounded-full" style={{ width: `${(campaign.readCount / campaign.sentCount) * 100}%` }}></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">Not available</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.scheduledFor ? formatDate(new Date(campaign.scheduledFor)) : formatDate(new Date(campaign.createdAt))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {campaign.status === 'completed' && (
                            <button className="text-gray-600 hover:text-gray-900">
                              <BarChart size={18} />
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900">
                            <Eye size={18} />
                          </button>
                          {campaign.status !== 'completed' && (
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit size={18} />
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900">
                            <Copy size={18} />
                          </button>
                          <button className="text-error-500 hover:text-error-600">
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Campaign Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle className="text-primary-600" size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Keep messages concise</span>. WhatsApp messages work best when they're brief and to the point.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle className="text-primary-600" size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Personalize your messages</span>. Use contact names and relevant details to increase engagement.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle className="text-primary-600" size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Avoid spam-like content</span>. Ensure your messages provide value to your audience.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle className="text-primary-600" size={14} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Test before sending</span>. Send a test message to yourself to check formatting and links.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Need to send a message right away? Use Quick Campaign to send a message to your contacts in just a few clicks.
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="quickMessage" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="quickMessage"
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Enter your message here..."
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="quickGroups" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Contact Groups
                    </label>
                    <select
                      id="quickGroups"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="">All Contacts</option>
                      <option value="1">Friends</option>
                      <option value="2">Work</option>
                      <option value="3">Family</option>
                      <option value="4">Leads</option>
                      <option value="5">VIP Customers</option>
                    </select>
                  </div>
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<Send size={16} />}
                  >
                    Send Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignsPage;