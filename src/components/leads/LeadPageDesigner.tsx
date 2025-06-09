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
  Check
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
    text: '#000000'
  });
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copied, setCopied] = useState(false);

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
      required: false
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
      customColors
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
    onSuccess: function(data) {
      console.log('Form submitted:', data);
      ${redirectUrl ? `window.location.href = "${redirectUrl}";` : '// Handle success'}
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Form Designer</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplates(true)}
                leftIcon={<ArrowLeft size={16} />}
              >
                Templates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Form Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter form name"
                  required
                />
                <Input
                  label="Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter form description"
                />
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
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
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
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-2">{formName}</h2>
                {formDescription && (
                  <p className="mb-6 opacity-80">{formDescription}</p>
                )}
                
                <form className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium mb-1">
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
                    className={`w-full py-2 px-4 rounded-md font-medium ${getButtonStyles()}`}
                    disabled
                  >
                    Submit
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