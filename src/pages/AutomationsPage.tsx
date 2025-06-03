import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockAutoResponses } from '../mock/mockData';
import { formatDate } from '../lib/utils';
import { Plus, Bot, Edit, Trash, Eye, Twitch as Switch } from 'lucide-react';
import { motion } from 'framer-motion';
import { AutoResponse } from '../types';

const AutomationsPage: React.FC = () => {
  const [activeResponses, setActiveResponses] = useState<AutoResponse[]>(mockAutoResponses);

  const handleToggleActive = (id: string) => {
    setActiveResponses(
      activeResponses.map((response) =>
        response.id === id ? { ...response, isActive: !response.isActive } : response
      )
    );
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Automations
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
            Create Automation
          </Button>
        </motion.div>
      </div>

      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Auto Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeResponses.map((response, index) => (
                  <motion.div
                    key={response.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Card className={`border-l-4 ${response.isActive ? 'border-l-primary-500' : 'border-l-gray-300'} hover:shadow-elevation-2 transition-shadow`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{response.name}</CardTitle>
                          <div className="flex items-center">
                            <button
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                                response.isActive ? 'bg-primary-500' : 'bg-gray-200'
                              }`}
                              onClick={() => handleToggleActive(response.id)}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  response.isActive ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="flex mt-1">
                          <span className="text-xs font-medium text-gray-500">
                            Created {formatDate(new Date(response.createdAt))}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Trigger Words
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {response.trigger.split(',').map((trigger, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {trigger.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Response Message
                          </h4>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {response.response}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-error-500 hover:text-error-600 hover:bg-error-50">
                          <Trash size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}

                {/* Add New Response Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + activeResponses.length * 0.05 }}
                >
                  <Card className="border-dashed border-2 border-gray-300 hover:border-primary-300 flex flex-col items-center justify-center h-full py-8 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Bot size={40} className="text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">Create New Auto Response</p>
                    <p className="text-gray-400 text-sm text-center mt-1 max-w-xs">
                      Set up automatic replies for common messages and inquiries
                    </p>
                  </Card>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Additional Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-elevation-2 transition-shadow">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                      <Bot size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Welcome Message</h3>
                    <p className="text-gray-600 mb-4">
                      Automatically send a welcome message to new contacts
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      Set Up
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-elevation-2 transition-shadow">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                      <Bot size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Away Message</h3>
                    <p className="text-gray-600 mb-4">
                      Set up an out-of-office or away message
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      Set Up
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-elevation-2 transition-shadow">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                      <Bot size={24} className="text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Advanced Workflows</h3>
                    <p className="text-gray-600 mb-4">
                      Create multi-step automated conversation flows
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      Set Up
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AutomationsPage;