import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { 
  Plus, 
  Trash2, 
  Save, 
  Play, 
  MessageSquare, 
  Clock, 
  Filter, 
  Send, 
  ArrowRight, 
  Check, 
  X, 
  Settings,
  Zap,
  Users,
  Tag,
  Mail,
  Phone,
  FileText,
  Database,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Move
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import { Textarea } from '../ui/FormElements';

type NodeType = 'trigger' | 'condition' | 'action' | 'delay';

interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

interface Connection {
  id: string;
  source: string;
  target: string;
  label?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  connections: Connection[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TRIGGER_TEMPLATES = [
  { id: 'message_received', title: 'Message Received', description: 'When a new message is received' },
  { id: 'keyword_detected', title: 'Keyword Detected', description: 'When a specific keyword is detected in a message' },
  { id: 'new_contact', title: 'New Contact', description: 'When a new contact is added' },
  { id: 'scheduled', title: 'Scheduled', description: 'Trigger at a specific time or interval' }
];

const CONDITION_TEMPLATES = [
  { id: 'message_contains', title: 'Message Contains', description: 'Check if message contains specific text' },
  { id: 'contact_in_group', title: 'Contact in Group', description: 'Check if contact belongs to a specific group' },
  { id: 'has_tag', title: 'Has Tag', description: 'Check if contact has a specific tag' },
  { id: 'time_condition', title: 'Time Condition', description: 'Check if current time meets condition' }
];

const ACTION_TEMPLATES = [
  { id: 'send_message', title: 'Send Message', description: 'Send a WhatsApp message' },
  { id: 'add_tag', title: 'Add Tag', description: 'Add a tag to the contact' },
  { id: 'add_to_group', title: 'Add to Group', description: 'Add contact to a group' },
  { id: 'send_email', title: 'Send Email', description: 'Send an email notification' }
];

const DELAY_TEMPLATES = [
  { id: 'wait_time', title: 'Wait Time', description: 'Wait for a specific amount of time' },
  { id: 'wait_until', title: 'Wait Until', description: 'Wait until a specific date/time' },
  { id: 'wait_condition', title: 'Wait for Condition', description: 'Wait until a condition is met' }
];

const SAMPLE_WORKFLOWS = [
  {
    id: '1',
    name: 'Welcome Message Sequence',
    description: 'Send a series of welcome messages to new contacts',
    isActive: true,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-10')
  },
  {
    id: '2',
    name: 'Lead Qualification',
    description: 'Qualify leads based on their responses',
    isActive: false,
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-02-20')
  },
  {
    id: '3',
    name: 'Appointment Reminder',
    description: 'Send reminders before appointments',
    isActive: true,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-15')
  }
];

const WorkflowBuilder: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateType, setTemplateType] = useState<NodeType>('trigger');
  const [workflows, setWorkflows] = useState(SAMPLE_WORKFLOWS);
  const [showWorkflowList, setShowWorkflowList] = useState(true);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDescription, setNewWorkflowDescription] = useState('');
  const [showNewWorkflowForm, setShowNewWorkflowForm] = useState(false);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [nodeConfigOpen, setNodeConfigOpen] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const workflowCanvasRef = useRef<HTMLDivElement>(null);
  const [isDrawingConnection, setIsDrawingConnection] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [canvasScale, setCanvasScale] = useState(1);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  // Sample workflow data
  const sampleWorkflowData: Workflow = {
    id: '1',
    name: 'Welcome Message Sequence',
    description: 'Send a series of welcome messages to new contacts',
    nodes: [
      {
        id: 'node1',
        type: 'trigger',
        title: 'New Contact Added',
        description: 'Triggered when a new contact is added',
        config: {},
        position: { x: 100, y: 100 }
      },
      {
        id: 'node2',
        type: 'action',
        title: 'Send Welcome Message',
        description: 'Send initial welcome message',
        config: {
          message: 'Welcome to our service! We\'re glad to have you on board.'
        },
        position: { x: 100, y: 250 }
      },
      {
        id: 'node3',
        type: 'delay',
        title: 'Wait 1 Day',
        description: 'Wait for 1 day before next action',
        config: {
          delay: 86400 // seconds
        },
        position: { x: 100, y: 400 }
      },
      {
        id: 'node4',
        type: 'action',
        title: 'Send Follow-up',
        description: 'Send follow-up message',
        config: {
          message: 'How are you enjoying our service so far? Let us know if you have any questions!'
        },
        position: { x: 100, y: 550 }
      }
    ],
    connections: [
      {
        id: 'conn1',
        source: 'node1',
        target: 'node2'
      },
      {
        id: 'conn2',
        source: 'node2',
        target: 'node3'
      },
      {
        id: 'conn3',
        source: 'node3',
        target: 'node4'
      }
    ],
    isActive: true,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-10')
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (workflowCanvasRef.current && (draggedNode || isDrawingConnection || isDraggingCanvas)) {
        const rect = workflowCanvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / canvasScale;
        const y = (e.clientY - rect.top) / canvasScale;
        
        setMousePosition({ x, y });
        
        if (draggedNode && activeWorkflow) {
          const nodeIndex = activeWorkflow.nodes.findIndex(node => node.id === draggedNode);
          if (nodeIndex !== -1) {
            const updatedNodes = [...activeWorkflow.nodes];
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              position: {
                x: x - dragOffset.x,
                y: y - dragOffset.y
              }
            };
            setActiveWorkflow({
              ...activeWorkflow,
              nodes: updatedNodes
            });
          }
        }
        
        if (isDraggingCanvas) {
          const dx = e.clientX - lastMousePosition.x;
          const dy = e.clientY - lastMousePosition.y;
          setCanvasOffset({
            x: canvasOffset.x + dx / canvasScale,
            y: canvasOffset.y + dy / canvasScale
          });
          setLastMousePosition({ x: e.clientX, y: e.clientY });
        }
      }
    };
    
    const handleMouseUp = () => {
      setDraggedNode(null);
      setIsDrawingConnection(false);
      setIsDraggingCanvas(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedNode, dragOffset, activeWorkflow, isDrawingConnection, isDraggingCanvas, canvasOffset, canvasScale, lastMousePosition]);

  const handleCreateWorkflow = () => {
    if (!newWorkflowName) {
      toast.error('Please enter a workflow name');
      return;
    }

    const newWorkflow = {
      id: Date.now().toString(),
      name: newWorkflowName,
      description: newWorkflowDescription,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setWorkflows([...workflows, newWorkflow]);
    setNewWorkflowName('');
    setNewWorkflowDescription('');
    setShowNewWorkflowForm(false);
    toast.success('Workflow created successfully!');
  };

  const handleEditWorkflow = (workflow: any) => {
    setActiveWorkflow(sampleWorkflowData);
    setShowWorkflowList(false);
  };

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
    toast.success('Workflow deleted successfully!');
  };

  const handleToggleWorkflowStatus = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
    toast.success(`Workflow ${workflows.find(w => w.id === id)?.isActive ? 'deactivated' : 'activated'} successfully!`);
  };

  const handleAddNode = (type: NodeType) => {
    setTemplateType(type);
    setShowTemplates(true);
  };

  const handleSelectTemplate = (template: any) => {
    if (!activeWorkflow) return;
    
    const newNode: WorkflowNode = {
      id: `node${Date.now()}`,
      type: templateType,
      title: template.title,
      description: template.description,
      config: {},
      position: { 
        x: 250, 
        y: activeWorkflow.nodes.length > 0 
          ? Math.max(...activeWorkflow.nodes.map(n => n.position.y)) + 150 
          : 100 
      }
    };
    
    setActiveWorkflow({
      ...activeWorkflow,
      nodes: [...activeWorkflow.nodes, newNode]
    });
    
    toast.success(`Added ${template.title} node to workflow`);
    setShowTemplates(false);
  };

  const handleSaveWorkflow = () => {
    if (!activeWorkflow) return;
    
    setWorkflows(workflows.map(w => 
      w.id === activeWorkflow.id 
        ? { ...w, name: activeWorkflow.name, description: activeWorkflow.description, updatedAt: new Date() } 
        : w
    ));
    
    toast.success('Workflow saved successfully!');
  };

  const handleRunWorkflow = () => {
    toast.success('Workflow execution started!');
  };

  const handleBackToList = () => {
    setActiveWorkflow(null);
    setShowWorkflowList(true);
  };

  const handleNodeClick = (node: WorkflowNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(node);
    setNodeConfigOpen(true);
  };
  
  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.button === 0) { // Left mouse button
      const node = activeWorkflow?.nodes.find(n => n.id === nodeId);
      if (node) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setDraggedNode(nodeId);
      }
    }
  };
  
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !draggedNode && !isDrawingConnection) { // Left mouse button
      setIsDraggingCanvas(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleConnectionStart = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConnectionStart(nodeId);
    setIsDrawingConnection(true);
  };
  
  const handleConnectionEnd = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDrawingConnection && connectionStart && nodeId !== connectionStart) {
      if (activeWorkflow) {
        const newConnection: Connection = {
          id: `conn${Date.now()}`,
          source: connectionStart,
          target: nodeId
        };
        
        setActiveWorkflow({
          ...activeWorkflow,
          connections: [...activeWorkflow.connections, newConnection]
        });
        
        toast.success('Connection created');
      }
    }
    
    setIsDrawingConnection(false);
    setConnectionStart(null);
  };
  
  const handleDeleteNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeWorkflow) return;
    
    const updatedNodes = activeWorkflow.nodes.filter(node => node.id !== nodeId);
    const updatedConnections = activeWorkflow.connections.filter(
      conn => conn.source !== nodeId && conn.target !== nodeId
    );
    
    setActiveWorkflow({
      ...activeWorkflow,
      nodes: updatedNodes,
      connections: updatedConnections
    });
    
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
      setNodeConfigOpen(false);
    }
    
    toast.success('Node deleted');
  };
  
  const handleDeleteConnection = (connectionId: string) => {
    if (!activeWorkflow) return;
    
    setActiveWorkflow({
      ...activeWorkflow,
      connections: activeWorkflow.connections.filter(conn => conn.id !== connectionId)
    });
    
    toast.success('Connection deleted');
  };
  
  const handleDuplicateNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeWorkflow) return;
    
    const nodeToDuplicate = activeWorkflow.nodes.find(node => node.id === nodeId);
    if (!nodeToDuplicate) return;
    
    const newNode: WorkflowNode = {
      ...nodeToDuplicate,
      id: `node${Date.now()}`,
      position: {
        x: nodeToDuplicate.position.x + 50,
        y: nodeToDuplicate.position.y + 50
      }
    };
    
    setActiveWorkflow({
      ...activeWorkflow,
      nodes: [...activeWorkflow.nodes, newNode]
    });
    
    toast.success('Node duplicated');
  };
  
  const handleCanvasWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(canvasScale * delta, 0.5), 2);
    setCanvasScale(newScale);
  };

  const getTemplates = () => {
    switch (templateType) {
      case 'trigger':
        return TRIGGER_TEMPLATES;
      case 'condition':
        return CONDITION_TEMPLATES;
      case 'action':
        return ACTION_TEMPLATES;
      case 'delay':
        return DELAY_TEMPLATES;
      default:
        return [];
    }
  };

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'trigger':
        return <Zap size={20} className="text-yellow-500" />;
      case 'condition':
        return <Filter size={20} className="text-blue-500" />;
      case 'action':
        return <Send size={20} className="text-green-500" />;
      case 'delay':
        return <Clock size={20} className="text-purple-500" />;
      default:
        return <Settings size={20} />;
    }
  };

  const updateNodeConfig = (key: string, value: any) => {
    if (!selectedNode || !activeWorkflow) return;
    
    const updatedNodes = activeWorkflow.nodes.map(node => 
      node.id === selectedNode.id 
        ? { 
            ...node, 
            config: { 
              ...node.config, 
              [key]: value 
            } 
          } 
        : node
    );
    
    setActiveWorkflow({
      ...activeWorkflow,
      nodes: updatedNodes
    });
    
    setSelectedNode({
      ...selectedNode,
      config: {
        ...selectedNode.config,
        [key]: value
      }
    });
  };
  
  const updateNodeTitle = (title: string) => {
    if (!selectedNode || !activeWorkflow) return;
    
    const updatedNodes = activeWorkflow.nodes.map(node => 
      node.id === selectedNode.id 
        ? { ...node, title } 
        : node
    );
    
    setActiveWorkflow({
      ...activeWorkflow,
      nodes: updatedNodes
    });
    
    setSelectedNode({
      ...selectedNode,
      title
    });
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
          Workflow Builder
        </motion.h1>
        {showWorkflowList && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowNewWorkflowForm(true)}
            >
              Create Workflow
            </Button>
          </motion.div>
        )}
        {!showWorkflowList && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-3"
          >
            <Button
              variant="outline"
              leftIcon={<ArrowRight size={16} className="transform rotate-180" />}
              onClick={handleBackToList}
            >
              Back to List
            </Button>
            <Button
              variant="outline"
              leftIcon={<Play size={16} />}
              onClick={handleRunWorkflow}
            >
              Run Workflow
            </Button>
            <Button
              variant="primary"
              leftIcon={<Save size={16} />}
              onClick={handleSaveWorkflow}
            >
              Save Workflow
            </Button>
          </motion.div>
        )}
      </div>

      {showWorkflowList ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {showNewWorkflowForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="text-lg font-medium mb-4">Create New Workflow</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Workflow Name
                        </label>
                        <input
                          type="text"
                          value={newWorkflowName}
                          onChange={(e) => setNewWorkflowName(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          placeholder="Enter workflow name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={newWorkflowDescription}
                          onChange={(e) => setNewWorkflowDescription(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          rows={3}
                          placeholder="Enter workflow description"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowNewWorkflowForm(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleCreateWorkflow}
                        >
                          Create Workflow
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {workflows.length === 0 ? (
                  <div className="text-center py-12">
                    <Zap size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows yet</h3>
                    <p className="text-gray-500 mb-6">Create your first workflow to automate your WhatsApp communications</p>
                    <Button
                      variant="primary"
                      leftIcon={<Plus size={16} />}
                      onClick={() => setShowNewWorkflowForm(true)}
                    >
                      Create Workflow
                    </Button>
                  </div>
                ) : (
                  workflows.map((workflow, index) => (
                    <motion.div
                      key={workflow.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{workflow.description}</p>
                            <div className="flex items-center mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                workflow.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {workflow.isActive ? (
                                  <>
                                    <Check size={12} className="mr-1" />
                                    Active
                                  </>
                                ) : (
                                  <>
                                    <X size={12} className="mr-1" />
                                    Inactive
                                  </>
                                )}
                              </span>
                              <span className="text-xs text-gray-500 ml-3">
                                Created: {workflow.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleWorkflowStatus(workflow.id)}
                              className={workflow.isActive ? "text-red-500" : "text-green-500"}
                            >
                              {workflow.isActive ? <X size={16} /> : <Check size={16} />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditWorkflow(workflow)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteWorkflow(workflow.id)}
                              className="text-red-500"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Last updated: {workflow.updatedAt.toLocaleDateString()}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditWorkflow(workflow)}
                        >
                          Edit Workflow
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Welcome Sequence',
                      description: 'Send a series of welcome messages to new contacts',
                      icon: <MessageSquare size={24} className="text-primary-500" />
                    },
                    {
                      title: 'Lead Qualification',
                      description: 'Qualify leads based on their responses',
                      icon: <Users size={24} className="text-primary-500" />
                    },
                    {
                      title: 'Appointment Reminder',
                      description: 'Send reminders before appointments',
                      icon: <Clock size={24} className="text-primary-500" />
                    }
                  ].map((template, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-elevation-2 transition-shadow h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                            {template.icon}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                          <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setActiveWorkflow(sampleWorkflowData);
                              setShowWorkflowList(false);
                            }}
                          >
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{activeWorkflow?.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeWorkflow?.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activeWorkflow?.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Settings size={16} />}
                  >
                    Settings
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">{activeWorkflow?.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => handleAddNode('trigger')}
                >
                  Add Trigger
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => handleAddNode('condition')}
                >
                  Add Condition
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => handleAddNode('action')}
                >
                  Add Action
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => handleAddNode('delay')}
                >
                  Add Delay
                </Button>
              </div>

              <div 
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[500px] relative overflow-hidden"
                ref={workflowCanvasRef}
                onMouseDown={handleCanvasMouseDown}
                onWheel={handleCanvasWheel}
                style={{ cursor: isDraggingCanvas ? 'grabbing' : 'grab' }}
              >
                <div 
                  className="absolute inset-0 transition-transform"
                  style={{ 
                    transform: `scale(${canvasScale}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
                    transformOrigin: '0 0'
                  }}
                >
                  {activeWorkflow?.nodes.map((node) => (
                    <div 
                      key={node.id}
                      className="absolute"
                      style={{ 
                        left: `${node.position.x}px`, 
                        top: `${node.position.y}px`,
                        zIndex: selectedNode?.id === node.id ? 10 : 1
                      }}
                    >
                      <div 
                        className={`bg-white rounded-lg shadow-md p-4 w-64 cursor-pointer border-2 ${
                          selectedNode?.id === node.id ? 'border-primary-500' : 'border-transparent'
                        }`}
                        onClick={(e) => handleNodeClick(node, e)}
                        onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getNodeIcon(node.type)}
                            <h3 className="ml-2 font-medium">{node.title}</h3>
                          </div>
                          <div className="flex space-x-1">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={(e) => handleDuplicateNode(node.id, e)}
                            >
                              <Copy size={14} />
                            </button>
                            <button 
                              className="text-red-400 hover:text-red-600"
                              onClick={(e) => handleDeleteNode(node.id, e)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{node.description}</p>
                        
                        {/* Show some config details if available */}
                        {Object.keys(node.config).length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            {node.type === 'action' && node.config.message && (
                              <div className="text-xs text-gray-600 truncate">
                                Message: "{node.config.message.substring(0, 30)}..."
                              </div>
                            )}
                            {node.type === 'delay' && node.config.delay && (
                              <div className="text-xs text-gray-600">
                                Delay: {Math.floor(node.config.delay / 3600)} hours
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Connection points */}
                        <div 
                          className="absolute top-1/2 -right-3 w-6 h-6 bg-blue-500 rounded-full transform -translate-y-1/2 cursor-pointer z-20"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleConnectionStart(node.id, e);
                          }}
                        >
                          <ArrowRight size={16} className="text-white m-auto h-full" />
                        </div>
                        
                        <div 
                          className="absolute top-1/2 -left-3 w-6 h-6 bg-blue-500 rounded-full transform -translate-y-1/2 cursor-pointer z-20"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                          }}
                          onMouseUp={(e) => {
                            if (isDrawingConnection) {
                              handleConnectionEnd(node.id, e);
                            }
                          }}
                        >
                          <ArrowRight size={16} className="text-white m-auto h-full transform rotate-180" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Connection lines */}
                  <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                    {activeWorkflow?.connections.map(connection => {
                      const sourceNode = activeWorkflow.nodes.find(n => n.id === connection.source);
                      const targetNode = activeWorkflow.nodes.find(n => n.id === connection.target);
                      
                      if (!sourceNode || !targetNode) return null;
                      
                      const sourceX = sourceNode.position.x + 264; // right side of node
                      const sourceY = sourceNode.position.y + 40; // middle of node
                      const targetX = targetNode.position.x; // left side of node
                      const targetY = targetNode.position.y + 40; // middle of node
                      
                      // Create a curved path
                      const dx = targetX - sourceX;
                      const dy = targetY - sourceY;
                      const controlPointX = sourceX + dx / 2;
                      
                      const path = `M${sourceX},${sourceY} C${controlPointX},${sourceY} ${controlPointX},${targetY} ${targetX},${targetY}`;
                      
                      return (
                        <g key={connection.id}>
                          <path
                            d={path}
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                          />
                          <circle 
                            cx={sourceX} 
                            cy={sourceY} 
                            r="4" 
                            fill="#9CA3AF" 
                          />
                          <circle 
                            cx={targetX} 
                            cy={targetY} 
                            r="4" 
                            fill="#9CA3AF" 
                          />
                          {/* Delete connection button */}
                          <g
                            transform={`translate(${controlPointX - 8}, ${(sourceY + targetY) / 2 - 8})`}
                            className="cursor-pointer"
                            onClick={() => handleDeleteConnection(connection.id)}
                          >
                            <circle cx="8" cy="8" r="8" fill="white" stroke="#9CA3AF" />
                            <line x1="5" y1="5" x2="11" y2="11" stroke="#9CA3AF" strokeWidth="2" />
                            <line x1="11" y1="5" x2="5" y2="11" stroke="#9CA3AF" strokeWidth="2" />
                          </g>
                        </g>
                      );
                    })}
                    
                    {/* Drawing connection line */}
                    {isDrawingConnection && connectionStart && activeWorkflow && (
                      (() => {
                        const sourceNode = activeWorkflow.nodes.find(n => n.id === connectionStart);
                        if (!sourceNode) return null;
                        
                        const sourceX = sourceNode.position.x + 264; // right side of node
                        const sourceY = sourceNode.position.y + 40; // middle of node
                        
                        // Create a path to the mouse position
                        const path = `M${sourceX},${sourceY} L${mousePosition.x},${mousePosition.y}`;
                        
                        return (
                          <path
                            d={path}
                            stroke="#9CA3AF"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            fill="none"
                          />
                        );
                      })()
                    )}
                    
                    {/* Arrowhead marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                      </marker>
                    </defs>
                  </svg>

                  {/* Empty state */}
                  {activeWorkflow?.nodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Zap size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 mb-2">Start Building Your Workflow</h3>
                        <p className="text-sm text-gray-400 mb-4">Add a trigger to start your workflow</p>
                        <Button
                          variant="outline"
                          leftIcon={<Plus size={16} />}
                          onClick={() => handleAddNode('trigger')}
                        >
                          Add Trigger
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Zoom controls */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCanvasScale(Math.min(canvasScale + 0.1, 2))}
                  >
                    +
                  </Button>
                  <div className="px-2 py-1 text-sm">
                    {Math.round(canvasScale * 100)}%
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCanvasScale(Math.max(canvasScale - 0.1, 0.5))}
                  >
                    -
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCanvasScale(1);
                      setCanvasOffset({ x: 0, y: 0 });
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Node Configuration Panel */}
          <AnimatePresence>
            {nodeConfigOpen && selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {getNodeIcon(selectedNode.type)}
                        <span className="ml-2">{selectedNode.title} Configuration</span>
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNodeConfigOpen(false)}
                    >
                      <X size={16} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Node Name
                        </label>
                        <input
                          type="text"
                          value={selectedNode.title}
                          onChange={(e) => updateNodeTitle(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                      </div>

                      {selectedNode.type === 'trigger' && selectedNode.title === 'Keyword Detected' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Keywords (comma separated)
                          </label>
                          <input
                            type="text"
                            placeholder="hello, hi, hey"
                            value={selectedNode.config.keywords || ''}
                            onChange={(e) => updateNodeConfig('keywords', e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                      )}

                      {selectedNode.type === 'action' && selectedNode.title === 'Send Message' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message Text
                          </label>
                          <textarea
                            value={selectedNode.config.message || ''}
                            onChange={(e) => updateNodeConfig('message', e.target.value)}
                            rows={4}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            You can use variables like {'{name}'} or {'{phone}'} in your message
                          </p>
                        </div>
                      )}

                      {selectedNode.type === 'delay' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delay Duration
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              value={selectedNode.config.delay ? Math.floor(selectedNode.config.delay / 3600) : 24}
                              onChange={(e) => updateNodeConfig('delay', parseInt(e.target.value) * 3600)}
                              min="0"
                              className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                            <select 
                              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                              value={selectedNode.config.delayUnit || 'hours'}
                              onChange={(e) => updateNodeConfig('delayUnit', e.target.value)}
                            >
                              <option value="hours">Hours</option>
                              <option value="days">Days</option>
                              <option value="minutes">Minutes</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {selectedNode.type === 'condition' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Condition Type
                          </label>
                          <select 
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            value={selectedNode.config.conditionType || 'contains'}
                            onChange={(e) => updateNodeConfig('conditionType', e.target.value)}
                          >
                            <option value="contains">Message Contains</option>
                            <option value="equals">Message Equals</option>
                            <option value="starts_with">Message Starts With</option>
                            <option value="ends_with">Message Ends With</option>
                          </select>
                          
                          <div className="mt-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Value
                            </label>
                            <input
                              type="text"
                              placeholder="Enter value"
                              value={selectedNode.config.conditionValue || ''}
                              onChange={(e) => updateNodeConfig('conditionValue', e.target.value)}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setNodeConfigOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        toast.success('Node configuration saved!');
                        setNodeConfigOpen(false);
                      }}
                    >
                      Save Configuration
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Node Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select {templateType.charAt(0).toUpperCase() + templateType.slice(1)} Template
                </h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getTemplates().map((template, index) => (
                    <div
                      key={template.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-md cursor-pointer transition-all"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <div className="flex items-center mb-2">
                        {getNodeIcon(templateType)}
                        <h4 className="ml-2 font-medium">{template.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end p-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplates(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkflowBuilder;