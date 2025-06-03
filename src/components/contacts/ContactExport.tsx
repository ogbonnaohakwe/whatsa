import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Download, FileText, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactExport: React.FC = () => {
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');

  const handleExport = async () => {
    setExporting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be a blob from the API
      const dummyData = 'Name,Phone,Email\nJohn Doe,+1234567890,john@example.com';
      
      const blob = new Blob([dummyData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts_export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Contacts exported successfully!');
    } catch (error) {
      toast.error('Failed to export contacts');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Export Format
              </label>
              <div className="flex space-x-3">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    format === 'csv'
                      ? 'bg-primary-50 text-primary-700 border-2 border-primary-500'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFormat('csv')}
                >
                  CSV
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    format === 'json'
                      ? 'bg-primary-50 text-primary-700 border-2 border-primary-500'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFormat('json')}
                >
                  JSON
                </button>
              </div>
            </div>

            <div>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Settings size={16} />}
                className="justify-start"
              >
                Export Settings
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Button
              variant="primary"
              fullWidth
              onClick={handleExport}
              isLoading={exporting}
              leftIcon={<Download size={16} />}
            >
              Export Contacts
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Export includes: Name, Phone Number, Email, Groups, Tags, and Notes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactExport;