import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { HexColorPicker } from 'react-colorful';
import { FormField } from '../../types';
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
  Save
} from 'lucide-react';

interface LeadPageDesignerProps {
  onSave: (formData: any) => void;
}

const LeadPageDesigner: React.FC<LeadPageDesignerProps> = ({ onSave }) => {
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', type: 'text', label: 'Name', placeholder: 'Enter your name', required: true },
    { id: '2', type: 'email', label: 'Email', placeholder: 'Enter your email', required: true },
    { id: '3', type: 'phone', label: 'WhatsApp Number', placeholder: 'Enter your WhatsApp number', required: true }
  ]);
  const [theme, setTheme] = useState<'light' | 'dark' | 'custom'>('light');
  const [customColors, setCustomColors] = useState({
    primary: '#25D366',
    background: '#ffffff',
    text: '#000000'
  });
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);

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
    onSave({
      name: formName,
      description: formDescription,
      fields,
      theme,
      customColors
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Form Designer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Form Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter form name"
                />
                <Input
                  label="Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter form description"
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
              >
                Preview Form
              </Button>
              <Button
                variant="outline"
                fullWidth
                leftIcon={<Code size={16} />}
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
    </div>
  );
};

export default LeadPageDesigner;