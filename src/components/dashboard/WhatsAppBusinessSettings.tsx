import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useWhatsAppGateway } from '../../hooks/useWhatsAppGateway';
import { Smartphone, RefreshCw, Settings, MessageSquare, Globe, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const WhatsAppBusinessSettings: React.FC = () => {
  const { businessProfile, updateBusinessProfile, isConnected } = useWhatsAppGateway();
  
  const [formData, setFormData] = useState({
    description: '',
    email: '',
    websites: [],
    address: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (businessProfile) {
      setFormData({
        description: businessProfile.description || '',
        email: businessProfile.email || '',
        websites: businessProfile.websites || [],
        address: businessProfile.address || ''
      });
    }
  }, [businessProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newWebsites = [...formData.websites];
    newWebsites[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      websites: newWebsites
    }));
  };
  
  const addWebsite = () => {
    setFormData(prev => ({
      ...prev,
      websites: [...prev.websites, '']
    }));
  };
  
  const removeWebsite = (index: number) => {
    const newWebsites = [...formData.websites];
    newWebsites.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      websites: newWebsites
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await updateBusinessProfile({
        description: formData.description,
        email: formData.email,
        websites: formData.websites.filter(Boolean),
        address: formData.address
      });
      
      if (success) {
        setIsEditing(false);
        toast.success('Business profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update business profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isConnected) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-4">
            <p className="text-gray-500">Connect to WhatsApp Business API to manage settings</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Smartphone className="mr-2" size={20} />
          WhatsApp Business Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!businessProfile ? (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading business profile...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {!isEditing ? (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <MessageSquare className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{businessProfile.name || 'Business Account'}</h3>
                      <p className="text-sm text-gray-500">{businessProfile.about || 'WhatsApp Business Account'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                      <p className="text-gray-900">{businessProfile.description || 'No description set'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                      <p className="text-gray-900">{businessProfile.vertical || 'Not specified'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                      <p className="text-gray-900">{businessProfile.email || 'No email set'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                      <p className="text-gray-900">{businessProfile.address || 'No address set'}</p>
                    </div>
                  </div>
                  
                  {businessProfile.websites && businessProfile.websites.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Websites</h4>
                      <ul className="space-y-1">
                        {businessProfile.websites.map((website: string, index: number) => (
                          <li key={index} className="text-primary-600 hover:underline">
                            <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <Globe size={14} className="mr-1" />
                              {website}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                    leftIcon={<Settings size={16} />}
                  >
                    Edit Profile
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    rows={3}
                    placeholder="Business description"
                  />
                </div>
                
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="business@example.com"
                  leftIcon={<Mail size={16} />}
                />
                
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Business address"
                  leftIcon={<Phone size={16} />}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Websites
                  </label>
                  {formData.websites.map((website, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        value={website}
                        onChange={(e) => handleWebsiteChange(e, index)}
                        placeholder="https://example.com"
                        leftIcon={<Globe size={16} />}
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeWebsite(index)}
                        className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addWebsite}
                  >
                    Add Website
                  </Button>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsAppBusinessSettings;