import React from 'react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { FormField } from '../../types';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  fields: FormField[];
  theme: 'light' | 'dark' | 'custom';
  customColors?: {
    primary: string;
    background: string;
    text: string;
  };
}

interface LeadPageTemplatesProps {
  onSelectTemplate: (template: Template) => void;
}

const LeadPageTemplates: React.FC<LeadPageTemplatesProps> = ({ onSelectTemplate }) => {
  const templates: Template[] = [
    {
      id: 'newsletter',
      name: 'Newsletter Signup',
      description: 'Simple email collection for newsletters',
      preview: 'https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=300',
      fields: [
        { id: '1', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
        { id: '2', type: 'email', label: 'Email', placeholder: 'Your email address', required: true },
        { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true }
      ],
      theme: 'light'
    },
    {
      id: 'ebook',
      name: 'Free eBook Download',
      description: 'Lead magnet for digital content',
      preview: 'https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=300',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
        { id: '2', type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
        { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true },
        { id: '4', type: 'select', label: 'Industry', placeholder: 'Select your industry', required: false, options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Other'] }
      ],
      theme: 'custom',
      customColors: {
        primary: '#4F46E5',
        background: '#F9FAFB',
        text: '#1F2937'
      }
    },
    {
      id: 'webinar',
      name: 'Webinar Registration',
      description: 'Event registration with additional details',
      preview: 'https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=300',
      fields: [
        { id: '1', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: true },
        { id: '2', type: 'email', label: 'Email', placeholder: 'Your email address', required: true },
        { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true },
        { id: '4', type: 'select', label: 'Company Size', placeholder: 'Select company size', required: false, options: ['1-10', '11-50', '51-200', '200+'] },
        { id: '5', type: 'checkbox', label: 'I agree to receive marketing communications', required: true }
      ],
      theme: 'dark'
    },
    {
      id: 'consultation',
      name: 'Free Consultation',
      description: 'Service booking with contact details',
      preview: 'https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg?auto=compress&cs=tinysrgb&w=300',
      fields: [
        { id: '1', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
        { id: '2', type: 'email', label: 'Email', placeholder: 'Your email', required: true },
        { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Your WhatsApp number', required: true },
        { id: '4', type: 'text', label: 'Company', placeholder: 'Your company name', required: false },
        { id: '5', type: 'select', label: 'Service Interest', placeholder: 'What service are you interested in?', required: true, options: ['Marketing', 'Sales', 'Support', 'Custom Development'] }
      ],
      theme: 'custom',
      customColors: {
        primary: '#059669',
        background: '#FFFFFF',
        text: '#111827'
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
        <p className="text-gray-600">Start with a pre-designed template and customize it to your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-elevation-2 transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2">{template.name}</h4>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {template.fields.length} fields
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    template.theme === 'light' ? 'bg-blue-100 text-blue-800' :
                    template.theme === 'dark' ? 'bg-gray-800 text-white' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {template.theme}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onSelectTemplate(template)}
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeadPageTemplates;