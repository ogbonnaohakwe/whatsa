import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockContacts, mockContactGroups } from '../mock/mockData';
import { formatDate } from '../lib/utils';
import { User, Plus, Search, Tag, Filter, Trash, MoreHorizontal, MessageSquare, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Contact, ContactGroup } from '../types';

const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  const filteredContacts = mockContacts.filter((contact) => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGroup = selectedGroup ? contact.groups.includes(selectedGroup) : true;
    
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contacts
        </motion.h1>
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            leftIcon={<UserPlus size={16} />}
          >
            Import Contacts
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
          >
            Add Contact
          </Button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contact Groups Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Groups</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Plus size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                    selectedGroup === null ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">All Contacts</span>
                  <span className="text-sm text-gray-500">{mockContacts.length}</span>
                </button>
                
                {mockContactGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.name.toLowerCase())}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                      selectedGroup === group.name.toLowerCase() ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{group.name}</span>
                    <span className="text-sm text-gray-500">{group.contactCount}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Contacts List */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
                  Filter
                </Button>
                <Button variant="outline" size="sm" leftIcon={<Tag size={16} />}>
                  Manage Tags
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Groups
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="text-gray-500" size={20} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                              <div className="text-sm text-gray-500">{contact.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{contact.phoneNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {contact.groups.map((group) => (
                              <span
                                key={group}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {group}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.lastMessageAt ? formatDate(new Date(contact.lastMessageAt)) : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <MessageSquare size={18} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreHorizontal size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredContacts.length === 0 && (
                <div className="text-center py-6">
                  <User size={48} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No contacts found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactsPage;