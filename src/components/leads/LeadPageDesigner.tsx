import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { HexColorPicker } from 'react-colorful';
import { FormField } from '../../types';
import LeadPageTemplates from './LeadPageTemplates';
import { 
  Plus, 
  Grip, 
  Trash2, 
  Type, 
  Mail, 
  Phone, 
  CheckSquare, 
  List, 
  Palette,
  Eye,
  Code,
  Save,
  ArrowLeft,
  Copy,
  Check,
  Settings,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Link,
  Zap,
  Shield,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LeadPageDesignerProps {
  onSave: (formData: any) => void;
  initialData?: any;
}

const LeadPageDesigner: React.FC<LeadPageDesignerProps> = ({ onSave, initialData }) => {
  const [showTemplates, setShowTemplates] = useState(!initialData);
  const [formName, setFormName] = useState(initialData?.name || '');
  const [formDescription, setFormDescription] = useState(initialData?.description || '');
  const [redirectUrl, setRedirectUrl] = useState(initialData?.redirectUrl || '');
  const [fields, setFields] = useState<FormField[]>(initialData?.fields || [
    { id: '1', type: 'text', label: 'Name', placeholder: 'Enter your name', required: true },
    { id: '2', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true },
    { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Enter your WhatsApp number', required: true }
  ]);
  const [theme, setTheme] = useState<'light' | 'dark' | 'custom'>(initialData?.theme || 'light');
  const [customColors, setCustomColors] = useState(initialData?.customColors || {
    primary: '#25D366',
    background: '#ffffff',
    text: '#000000',
    accent: '#075E54',
    border: '#e5e7eb'
  });
  
  // Advanced settings
  const [formSettings, setFormSettings] = useState({
    submitButtonText: 'Submit',
    successMessage: 'Thank you for your submission!',
    errorMessage: 'Please check your information and try again.',
    enableProgressBar: false,
    enableFieldValidation: true,
    enableAutoSave: false,
    enableCaptcha: false,
    enableAnalytics: true,
    maxSubmissions: 0, // 0 = unlimited
    enableScheduling: false,
    startDate: '',
    endDate: '',
    enableGeoTargeting: false,
    allowedCountries: [],
    enableDeviceTargeting: false,
    allowedDevices: ['desktop', 'tablet', 'mobile'],
    enableABTesting: false,
    formWidth: 'medium', // small, medium, large, full
    formAlignment: 'center', // left, center, right
    enableShadow: true,
    enableBorder: true,
    borderRadius: 'medium', // none, small, medium, large, full
    enableAnimation: true,
    animationType: 'fadeIn', // fadeIn, slideUp, slideDown, zoomIn
    enableTypography: true,
    fontFamily: 'Inter',
    fontSize: 'medium', // small, medium, large
    lineHeight: 'normal', // tight, normal, relaxed
    enableSpacing: true,
    fieldSpacing: 'medium', // small, medium, large
    sectionSpacing: 'medium'
  });

  const [textFormatting, setTextFormatting] = useState({
    headingStyle: {
      fontSize: '2xl',
      fontWeight: 'bold',
      color: customColors.text,
      alignment: 'center',
      decoration: 'none'
    },
    descriptionStyle: {
      fontSize: 'base',
      fontWeight: 'normal',
      color: customColors.text,
      alignment: 'center',
      decoration: 'none'
    },
    labelStyle: {
      fontSize: 'sm',
      fontWeight: 'medium',
      color: customColors.text,
      alignment: 'left',
      decoration: 'none'
    },
    buttonStyle: {
      fontSize: 'base',
      fontWeight: 'semibold',
      color: customColors.background,
      backgroundColor: customColors.primary,
      borderRadius: 'medium',
      padding: 'medium'
    }
  });

  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'settings' | 'typography' | 'validation'>('design');

  const handleSelectTemplate = (template: any) => {
    setFormName(template.name);
    setFormDescription(template.description);
    setFields(template.fields);
    setTheme(template.theme);
    if (template.customColors) {
      setCustomColors(template.customColors);
    }
    setShowTemplates(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFields(items);
  };

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}`,
      required: false,
      validation: {
        minLength: type === 'text' ? 2 : undefined,
        maxLength: type === 'text' ? 100 : undefined,
        pattern: type === 'email' ? '^[^@]+@[^@]+\.[^@]+$' : undefined
      }
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSave = () => {
    if (!formName.trim()) {
      toast.error('Please enter a form name');
      return;
    }

    onSave({
      name: formName,
      description: formDescription,
      redirectUrl,
      fields,
      theme,
      customColors,
      formSettings,
      textFormatting
    });
  };

  const handlePreview = () => {
    if (!formName.trim()) {
      toast.error('Please enter a form name to preview');
      return;
    }
    setShowPreviewModal(true);
  };

  const handleExportCode = () => {
    if (!formName.trim()) {
      toast.error('Please save the form first to get export code');
      return;
    }
    setShowExportModal(true);
  };

  const generateEmbedCode = () => {
    const formId = initialData?.id || 'new-form';
    return `<!-- WhatsApp Lead Form Widget -->
<div id="whatsapp-lead-form-${formId}"></div>
<script src="https://whatsapp-autoresponder.com/widgets/lead-form.js"></script>
<script>
  WhatsAppLeadForm.init({
    formId: "${formId}",
    containerId: "whatsapp-lead-form-${formId}",
    theme: "${theme}",
    ${theme === 'custom' ? `customColors: ${JSON.stringify(customColors)},` : ''}
    ${redirectUrl ? `redirectUrl: "${redirectUrl}",` : ''}
    settings: ${JSON.stringify(formSettings)},
    typography: ${JSON.stringify(textFormatting)},
    onSuccess: function(data) {
      console.log('Form submitted:', data);
      ${redirectUrl ? `window.location.href = "${redirectUrl}";` : '// Handle success'}
    },
    onError: function(error) {
      console.error('Form error:', error);
    }
  });
</script>`;
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      toast.success('Embed code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy embed code');
    }
  };

  const getThemeStyles = () => {
    if (theme === 'dark') {
      return 'bg-gray-900 text-white';
    } else if (theme === 'custom' && customColors) {
      return '';
    }
    return 'bg-white text-gray-900';
  };

  const getCustomStyles = () => {
    if (theme === 'custom' && customColors) {
      return {
        backgroundColor: customColors.background,
        color: customColors.text,
      };
    }
    return {};
  };

  const getButtonStyles = () => {
    if (theme === 'custom' && customColors) {
      return {
        backgroundColor: customColors.primary,
        color: customColors.background,
      };
    }
    return theme === 'dark' ? 'bg-white text-gray-900' : 'bg-primary-500 text-white';
  };

  if (showTemplates) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Create Lead Page</h2>
          <Button
            variant="outline"
            onClick={() => setShowTemplates(false)}
          >
            Start from Scratch
          </Button>
        </div>
        <LeadPageTemplates onSelectTemplate={handleSelectTemplate} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Form Designer</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplates(true)}
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Templates
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  leftIcon={<Settings size={16} />}
                >
                  Advanced
                </Button>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { id: 'design', label: 'Design', icon: <Palette size={16} /> },
                { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
                { id: 'typography', label: 'Typography', icon: <Type size={16} /> },
                { id: 'validation', label: 'Validation', icon: <Shield size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            {activeTab === 'design' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Form Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter form name"
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      rows={3}
                      placeholder="Enter form description"
                    />
                  </div>
                  
                  <Input
                    label="Redirect URL (after submission)"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="https://yoursite.com/thank-you"
                    helperText="Optional: URL to redirect users after form submission"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Fields
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addField('text')}
                      leftIcon={<Type size={16} />}
                    >
                      Text
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addField('email')}
                      leftIcon={<Mail size={16} />}
                    >
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addField('phone')}
                      leftIcon={<Phone size={16} />}
                    >
                      Phone
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addField('checkbox')}
                      leftIcon={<CheckSquare size={16} />}
                    >
                      Checkbox
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addField('select')}
                      leftIcon={<List size={16} />}
                    >
                      Select
                    </Button>
                  </div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="fields">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {fields.map((field, index) => (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="border rounded-lg p-4 bg-white"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-move"
                                  >
                                    <Grip size={20} className="text-gray-400" />
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeField(field.id)}
                                    className="text-error-500 hover:text-error-600"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                                
                                <div className="space-y-4">
                                  <Input
                                    label="Field Label"
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                                  />
                                  <Input
                                    label="Placeholder"
                                    value={field.placeholder}
                                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                  />
                                  {field.type === 'select' && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Options (comma separated)
                                      </label>
                                      <Input
                                        value={field.options?.join(', ') || ''}
                                        onChange={(e) => updateField(field.id, { 
                                          options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                                        })}
                                        placeholder="Option 1, Option 2, Option 3"
                                      />
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        id={`required-${field.id}`}
                                        checked={field.required}
                                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                                      />
                                      <label
                                        htmlFor={`required-${field.id}`}
                                        className="ml-2 block text-sm text-gray-700"
                                      >
                                        Required field
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Submit Button Text"
                    value={formSettings.submitButtonText}
                    onChange={(e) => setFormSettings({...formSettings, submitButtonText: e.target.value})}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Form Width
                    </label>
                    <select
                      value={formSettings.formWidth}
                      onChange={(e) => setFormSettings({...formSettings, formWidth: e.target.value as any})}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="small">Small (400px)</option>
                      <option value="medium">Medium (600px)</option>
                      <option value="large">Large (800px)</option>
                      <option value="full">Full Width</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Success Message
                  </label>
                  <textarea
                    value={formSettings.successMessage}
                    onChange={(e) => setFormSettings({...formSettings, successMessage: e.target.value})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableProgressBar"
                      checked={formSettings.enableProgressBar}
                      onChange={(e) => setFormSettings({...formSettings, enableProgressBar: e.target.checked})}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableProgressBar" className="ml-2 text-sm text-gray-700">
                      Enable Progress Bar
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableCaptcha"
                      checked={formSettings.enableCaptcha}
                      onChange={(e) => setFormSettings({...formSettings, enableCaptcha: e.target.checked})}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableCaptcha" className="ml-2 text-sm text-gray-700">
                      Enable CAPTCHA
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Max Submissions (0 = unlimited)"
                    type="number"
                    value={formSettings.maxSubmissions}
                    onChange={(e) => setFormSettings({...formSettings, maxSubmissions: parseInt(e.target.value) || 0})}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Animation Type
                    </label>
                    <select
                      value={formSettings.animationType}
                      onChange={(e) => setFormSettings({...formSettings, animationType: e.target.value as any})}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="fadeIn">Fade In</option>
                      <option value="slideUp">Slide Up</option>
                      <option value="slideDown">Slide Down</option>
                      <option value="zoomIn">Zoom In</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'typography' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Heading Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                      <select
                        value={textFormatting.headingStyle.fontSize}
                        onChange={(e) => setTextFormatting({
                          ...textFormatting,
                          headingStyle: {...textFormatting.headingStyle, fontSize: e.target.value}
                        })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                        <option value="2xl">2X Large</option>
                        <option value="3xl">3X Large</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
                      <select
                        value={textFormatting.headingStyle.fontWeight}
                        onChange={(e) => setTextFormatting({
                          ...textFormatting,
                          headingStyle: {...textFormatting.headingStyle, fontWeight: e.target.value}
                        })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="normal">Normal</option>
                        <option value="medium">Medium</option>
                        <option value="semibold">Semi Bold</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant={textFormatting.headingStyle.alignment === 'left' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setTextFormatting({
                        ...textFormatting,
                        headingStyle: {...textFormatting.headingStyle, alignment: 'left'}
                      })}
                    >
                      <AlignLeft size={16} />
                    </Button>
                    <Button
                      variant={textFormatting.headingStyle.alignment === 'center' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setTextFormatting({
                        ...textFormatting,
                        headingStyle: {...textFormatting.headingStyle, alignment: 'center'}
                      })}
                    >
                      <AlignCenter size={16} />
                    </Button>
                    <Button
                      variant={textFormatting.headingStyle.alignment === 'right' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setTextFormatting({
                        ...textFormatting,
                        headingStyle: {...textFormatting.headingStyle, alignment: 'right'}
                      })}
                    >
                      <AlignRight size={16} />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Button Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                      <select
                        value={textFormatting.buttonStyle.borderRadius}
                        onChange={(e) => setTextFormatting({
                          ...textFormatting,
                          buttonStyle: {...textFormatting.buttonStyle, borderRadius: e.target.value}
                        })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="none">None</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="full">Full</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
                      <select
                        value={textFormatting.buttonStyle.padding}
                        onChange={(e) => setTextFormatting({
                          ...textFormatting,
                          buttonStyle: {...textFormatting.buttonStyle, padding: e.target.value}
                        })}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'validation' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Field Validation Rules</h3>
                  <p className="text-sm text-blue-700">Configure validation rules for each field to ensure data quality.</p>
                </div>

                {fields.map((field) => (
                  <div key={field.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{field.label} ({field.type})</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {field.type === 'text' && (
                        <>
                          <Input
                            label="Min Length"
                            type="number"
                            value={field.validation?.minLength || ''}
                            onChange={(e) => updateField(field.id, {
                              validation: {
                                ...field.validation,
                                minLength: parseInt(e.target.value) || undefined
                              }
                            })}
                          />
                          <Input
                            label="Max Length"
                            type="number"
                            value={field.validation?.maxLength || ''}
                            onChange={(e) => updateField(field.id, {
                              validation: {
                                ...field.validation,
                                maxLength: parseInt(e.target.value) || undefined
                              }
                            })}
                          />
                        </>
                      )}
                      <div className="col-span-2">
                        <Input
                          label="Custom Pattern (Regex)"
                          value={field.validation?.pattern || ''}
                          onChange={(e) => updateField(field.id, {
                            validation: {
                              ...field.validation,
                              pattern: e.target.value || undefined
                            }
                          })}
                          placeholder="^[A-Za-z]+$"
                          helperText="Optional: Regular expression for custom validation"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                  >
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'custom' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('custom')}
                  >
                    Custom
                  </Button>
                </div>
              </div>

              {theme === 'custom' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Colors
                    </label>
                    <div className="space-y-2">
                      {Object.entries(customColors).map(([key, color]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded border cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={() => setShowColorPicker(key)}
                          />
                          <span className="text-sm capitalize">{key}</span>
                          {showColorPicker === key && (
                            <div className="absolute z-10">
                              <div
                                className="fixed inset-0"
                                onClick={() => setShowColorPicker(null)}
                              />
                              <HexColorPicker
                                color={color}
                                onChange={(newColor) =>
                                  setCustomColors({ ...customColors, [key]: newColor })
                                }
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Device
                </label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Monitor size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tablet size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smartphone size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Eye size={16} />}
                onClick={handlePreview}
              >
                Preview Form
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Code size={16} />}
                onClick={handleExportCode}
              >
                Export Code
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={handleSave}
                leftIcon={<Save size={16} />}
              >
                Save Form
              </Button>
            </div>
          </CardContent>
        </Card>

        {showAdvancedSettings && (
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Analytics Tracking</span>
                  <input
                    type="checkbox"
                    checked={formSettings.enableAnalytics}
                    onChange={(e) => setFormSettings({...formSettings, enableAnalytics: e.target.checked})}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">A/B Testing</span>
                  <input
                    type="checkbox"
                    checked={formSettings.enableABTesting}
                    onChange={(e) => setFormSettings({...formSettings, enableABTesting: e.target.checked})}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Geo Targeting</span>
                  <input
                    type="checkbox"
                    checked={formSettings.enableGeoTargeting}
                    onChange={(e) => setFormSettings({...formSettings, enableGeoTargeting: e.target.checked})}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Lead Page Preview"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Preview URL:</p>
            <code className="text-sm bg-white p-2 rounded border">
              https://whatsapp-autoresponder.com/l/{initialData?.id || 'new-form'}
            </code>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div 
              className={`p-8 ${getThemeStyles()}`}
              style={getCustomStyles()}
            >
              <div className={`max-w-md mx-auto ${formSettings.formAlignment === 'left' ? 'ml-0' : formSettings.formAlignment === 'right' ? 'mr-0' : ''}`}>
                <h2 className={`text-${textFormatting.headingStyle.fontSize} font-${textFormatting.headingStyle.fontWeight} mb-2 text-${textFormatting.headingStyle.alignment}`}>
                  {formName}
                </h2>
                {formDescription && (
                  <p className={`mb-6 opacity-80 text-${textFormatting.descriptionStyle.alignment}`}>
                    {formDescription}
                  </p>
                )}
                
                <form className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label className={`block text-sm font-${textFormatting.labelStyle.fontWeight} mb-1`}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select 
                          className="w-full p-2 border rounded-md"
                          disabled
                        >
                          <option>{field.placeholder}</option>
                          {field.options?.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="mr-2"
                            disabled
                          />
                          <span className="text-sm">{field.label}</span>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full p-2 border rounded-md"
                          disabled
                        />
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    className={`w-full py-2 px-4 rounded-${textFormatting.buttonStyle.borderRadius} font-${textFormatting.buttonStyle.fontWeight} ${getButtonStyles()}`}
                    disabled
                  >
                    {formSettings.submitButtonText}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Export Code Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Embed Code"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Embed Code
            </label>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto max-h-64">
                <code>{generateEmbedCode()}</code>
              </pre>
              <Button
                onClick={handleCopyCode}
                className="absolute top-2 right-2"
                size="sm"
                variant="outline"
                leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Integration Instructions:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Copy the embed code above</li>
              <li>• Paste it into your website's HTML where you want the form to appear</li>
              <li>• The form will automatically load and handle submissions</li>
              <li>• Customize the styling using CSS if needed</li>
              {redirectUrl && <li>• Users will be redirected to: {redirectUrl}</li>}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadPageDesigner;