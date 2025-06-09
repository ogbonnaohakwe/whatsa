import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { Select, Textarea } from '../components/ui/FormElements';
import { mockAutoResponses } from '../mock/mockData';
import { formatDate } from '../lib/utils';
import { Plus, Bot, Edit, Trash, Eye, Settings, Clock, MessageSquare, Users, Zap, ArrowRight, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { AutoResponse } from '../types';
import toast from 'react-hot-toast';

const AutomationsPage: React.FC = () => {
  const [activeResponses, setActiveResponses] = useState<AutoResponse[]>(mockAutoResponses);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [newResponse, setNewResponse] = useState({
    name: '',
    trigger: '',
    response: '',
    type: 'keyword' as 'keyword' | 'time' | 'event'
  });

  const handleToggleActive = (id: string) => {
    setActiveResponses(
      activeResponses.map((response) =>
        response.id === id ? { ...response, isActive: !response.isActive } : response
      )
    );
  };

  const handleCreateResponse = () => {
    if (!newResponse.name || !newResponse.trigger || !newResponse.response) {
      toast.error('Please fill in all required fields');
      return;
    }

    const response: AutoResponse = {
      id: Date.now().toString(),
      name: newResponse.name,
      trigger: newResponse.trigger,
      response: newResponse.response,
      isActive: true,
      createdAt: new Date(),
    };

    setActiveResponses([response, ...activeResponses]);
    setShowCreateModal(false);
    setNewResponse({ name: '', trigger: '', response: '', type: 'keyword' });
    toast.success('Auto-response created successfully!');
  };

  const automationTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Message',
      description: 'Automatically send a welcome message to new contacts',
      icon: <MessageSquare size={24} className="text-primary-500" />,
      category: 'engagement'
    },
    {
      id: 'away',
      name: 'Away Message',
      description: 'Set up an out-of-office or away message',
      icon: <Clock size={24} className="text-primary-500" />,
      category: 'availability'
    },
    {
      id: 'birthday',
      name: 'Birthday Wishes',
      description: 'Send automatic birthday messages to contacts',
      icon: <Users size={24} className="text-primary-500" />,
      category: 'engagement'
    },
    {
      id: 'followup',
      name: 'Follow-up Sequence',
      description: 'Create automated follow-up message sequences',
      icon: <ArrowRight size={24} className="text-primary-500" />,
      category: 'sales'
    },
    {
      id: 'appointment',
      name: 'Appointment Reminders',
      description: 'Send automatic appointment reminders',
      icon: <Clock size={24} className="text-primary-500" />,
      category: 'scheduling'
    },
    {
      id: 'feedback',
      name: 'Feedback Collection',
      description: 'Automatically request feedback after interactions',
      icon: <MessageSquare size={24} className="text-primary-500" />,
      category: 'feedback'
    }
  ];

  const workflowSteps = [
    { id: 1, type: 'trigger', title: 'Trigger', description: 'When someone sends a message' },
    { id: 2, type: 'condition', title: 'Condition', description: 'If message contains "pricing"' },
    { id: 3, type: 'action', title: 'Action', description: 'Send pricing information' },
    { id: 4, type: 'delay', title: 'Wait', description: 'Wait 5 minutes' },
    { id: 5, type: 'action', title: 'Follow-up', description: 'Send follow-up message' }
  ];

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
          className="flex space-x-3"
        >
          <Button
            variant="outline"
            leftIcon={<Settings size={16} />}
            onClick={() => setShowWorkflowModal(true)}
          >
            Workflow Builder
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowCreateModal(true)}
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
                          <div className="flex items-center space-x-2">
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
                  <Card 
                    className="border-dashed border-2 border-gray-300 hover:border-primary-300 flex flex-col items-center justify-center h-full py-8 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowCreateModal(true)}
                  >
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

      {/* Automation Templates */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Automation Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automationTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-elevation-2 transition-shadow h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                          {template.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                            {template.category}
                          </span>
                          <Button variant="outline" size="sm">
                            Set Up
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Advanced Workflows */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Advanced Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Visual Workflow Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Create complex automation workflows with our drag-and-drop builder
                  </p>
                  <Button
                    variant="primary"
                    leftIcon={<Zap size={16} />}
                    onClick={() => setShowWorkflowModal(true)}
                  >
                    Open Workflow Builder
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2">Sample Workflow: Lead Nurturing</h4>
                      <div className="space-y-2">
                        {workflowSteps.map((step, index) => (
                          <div key={step.id} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              step.type === 'trigger' ? 'bg-green-100 text-green-800' :
                              step.type === 'condition' ? 'bg-yellow-100 text-yellow-800' :
                              step.type === 'action' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {index + 1}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{step.title}</p>
                              <p className="text-xs text-gray-500">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Workflow Statistics</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Active Workflows</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Messages Automated</span>
                          <span className="font-medium">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Time Saved</span>
                          <span className="font-medium">24 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Success Rate</span>
                          <span className="font-medium text-green-600">94%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Create Automation Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Auto Response"
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Response Name"
            value={newResponse.name}
            onChange={(e) => setNewResponse({ ...newResponse, name: e.target.value })}
            placeholder="Enter response name"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Automation Type
            </label>
            <div className="flex space-x-4">
              {[
                { value: 'keyword', label: 'Keyword Trigger' },
                { value: 'time', label: 'Time-based' },
                { value: 'event', label: 'Event-based' }
              ].map((type) => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    checked={newResponse.type === type.value}
                    onChange={() => setNewResponse({ ...newResponse, type: type.value as any })}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Trigger Words or Phrases"
            value={newResponse.trigger}
            onChange={(e) => setNewResponse({ ...newResponse, trigger: e.target.value })}
            placeholder="hello, hi, hey, pricing"
            helperText="Separate multiple triggers with commas"
            required
          />

          <Textarea
            label="Auto Response Message"
            value={newResponse.response}
            onChange={(e) => setNewResponse({ ...newResponse, response: e.target.value })}
            placeholder="Type your automated response here..."
            rows={4}
            required
          />

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateResponse}
            >
              Create Auto Response
            </Button>
          </div>
        </div>
      </Modal>

      {/* Workflow Builder Modal */}
      <Modal
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
        title="Workflow Builder"
        size="xl"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Zap size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Visual Workflow Builder</h3>
            <p className="text-gray-600 mb-4">
              Create complex automation workflows with our drag-and-drop interface
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="primary">
                Start Building
              </Button>
              <Button variant="outline">
                View Templates
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-2">
                <Play size={24} className="mx-auto text-green-600" />
              </div>
              <h4 className="font-medium">Triggers</h4>
              <p className="text-sm text-gray-500">Start workflows</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-2">
                <Settings size={24} className="mx-auto text-blue-600" />
              </div>
              <h4 className="font-medium">Actions</h4>
              <p className="text-sm text-gray-500">Perform tasks</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-2">
                <Pause size={24} className="mx-auto text-yellow-600" />
              </div>
              <h4 className="font-medium">Conditions</h4>
              <p className="text-sm text-gray-500">Add logic</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AutomationsPage;