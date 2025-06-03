import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import LeadPageDesigner from '../components/leads/LeadPageDesigner';
import { mockOptinPages } from '../mock/mockData';
import { formatDate } from '../lib/utils';
import { Plus, ExternalLink, Copy, Edit, Trash, LineChart, Download, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { OptinPage } from '../types';
import toast from 'react-hot-toast';

const LeadPagesPage: React.FC = () => {
  const [optinPages, setOptinPages] = useState<OptinPage[]>(mockOptinPages);
  const [showDesigner, setShowDesigner] = useState(false);
  const [editingPage, setEditingPage] = useState<OptinPage | null>(null);

  const handleSaveForm = (formData: any) => {
    const newPage: OptinPage = {
      id: editingPage?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      fields: formData.fields,
      theme: formData.theme,
      customColors: formData.customColors,
      createdAt: editingPage?.createdAt || new Date(),
      visits: editingPage?.visits || 0,
      conversions: editingPage?.conversions || 0,
    };

    if (editingPage) {
      setOptinPages(pages => pages.map(p => p.id === editingPage.id ? newPage : p));
    } else {
      setOptinPages(pages => [...pages, newPage]);
    }
    
    setShowDesigner(false);
    setEditingPage(null);
    toast.success(editingPage ? 'Lead page updated successfully!' : 'Lead page created successfully!');
  };

  const handleViewPage = (page: OptinPage) => {
    window.open(`https://whatsapp-responder.com/l/${page.id}`, '_blank');
  };

  const handleEditPage = (page: OptinPage) => {
    setEditingPage(page);
    setShowDesigner(true);
  };

  const handleExportCode = (page: OptinPage) => {
    const code = `
<!-- WhatsApp Lead Form Widget -->
<div id="whatsapp-lead-form-${page.id}"></div>
<script src="https://whatsapp-autoresponder.com/widgets/lead-form.js"></script>
<script>
  WhatsAppLeadForm.init({
    formId: "${page.id}",
    containerId: "whatsapp-lead-form-${page.id}"
  });
</script>
    `.trim();

    navigator.clipboard.writeText(code);
    toast.success('Widget code copied to clipboard!');
  };

  const handleExportJson = (page: OptinPage) => {
    const json = JSON.stringify(page, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lead-page-${page.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('JSON configuration exported!');
  };

  const handleDeletePage = (id: string) => {
    setOptinPages(pages => pages.filter(page => page.id !== id));
    toast.success('Lead page deleted successfully!');
  };

  const handleViewAnalytics = (page: OptinPage) => {
    // In a real app, this would navigate to an analytics page
    toast.info('Analytics feature coming soon!');
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
          Lead Pages
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => {
              setEditingPage(null);
              setShowDesigner(true);
            }}
          >
            Create Lead Page
          </Button>
        </motion.div>
      </div>

      {showDesigner ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPage ? 'Edit Lead Page' : 'Create Lead Page'}</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadPageDesigner onSave={handleSaveForm} initialData={editingPage} />
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDesigner(false);
                  setEditingPage(null);
                }}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {optinPages.map((page) => (
              <Card key={page.id} className="hover:shadow-elevation-2 transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle>{page.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditPage(page)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeletePage(page.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{page.description}</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Visits</p>
                      <p className="text-2xl font-bold">{page.visits}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Conversions</p>
                      <p className="text-2xl font-bold text-primary-600">{page.conversions}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Conversion Rate</span>
                      <span className="font-medium">
                        {page.visits > 0 ? Math.round((page.conversions / page.visits) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ 
                          width: `${page.visits > 0 ? (page.conversions / page.visits) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Fields
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {page.fields.map((field) => (
                        <span
                          key={field.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {field.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Page URL
                    </h4>
                    <div className="flex items-center bg-gray-50 p-2 rounded text-sm">
                      <code className="text-gray-700 flex-1 overflow-hidden text-ellipsis">
                        https://whatsapp-responder.com/l/{page.id}
                      </code>
                      <button 
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          navigator.clipboard.writeText(`https://whatsapp-responder.com/l/${page.id}`);
                          toast.success('URL copied to clipboard!');
                        }}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<ExternalLink size={14} />}
                    onClick={() => handleViewPage(page)}
                  >
                    View Page
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Code size={14} />}
                      onClick={() => handleExportCode(page)}
                    >
                      Embed
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download size={14} />}
                      onClick={() => handleExportJson(page)}
                    >
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<LineChart size={14} />}
                      onClick={() => handleViewAnalytics(page)}
                    >
                      Analytics
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LeadPagesPage;