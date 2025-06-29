import { Contact, ContactGroup, Message, AutoResponse, Campaign, StatusUpdate, OptinPage } from '../types';
import { mockContacts, mockContactGroups, mockAutoResponses, mockCampaigns, mockOptinPages } from '../mock/mockData';

export const databaseService = {
  // Users
  async createUser(userData: any) {
    return { id: Date.now().toString(), ...userData };
  },

  async getUserById(id: string) {
    return { id, name: 'Test User', email: 'test@example.com' };
  },

  // Contacts
  async getContacts(userId: string) {
    return mockContacts;
  },

  async createContact(contactData: Partial<Contact>) {
    const newContact = {
      id: Date.now().toString(),
      name: contactData.name || '',
      phoneNumber: contactData.phoneNumber || '',
      email: contactData.email,
      notes: contactData.notes,
      groups: contactData.groups || [],
      tags: contactData.tags || [],
      createdAt: new Date(),
      lastMessageAt: undefined
    };
    
    return newContact;
  },

  async updateContact(id: string, updates: Partial<Contact>) {
    const contact = mockContacts.find(c => c.id === id);
    if (!contact) throw new Error('Contact not found');
    
    return { ...contact, ...updates };
  },

  async deleteContact(id: string) {
    // Simulate deletion
    return;
  },

  // Auto Responses
  async getAutoResponses(userId: string) {
    return mockAutoResponses;
  },

  async createAutoResponse(responseData: Partial<AutoResponse>) {
    const newResponse = {
      id: Date.now().toString(),
      name: responseData.name || '',
      trigger: responseData.trigger || '',
      response: responseData.response || '',
      isActive: responseData.isActive !== undefined ? responseData.isActive : true,
      createdAt: new Date()
    };
    
    return newResponse;
  },

  async updateAutoResponse(id: string, updates: Partial<AutoResponse>) {
    const response = mockAutoResponses.find(r => r.id === id);
    if (!response) throw new Error('Auto response not found');
    
    return { ...response, ...updates };
  },

  async deleteAutoResponse(id: string) {
    // Simulate deletion
    return;
  },

  // Campaigns
  async getCampaigns(userId: string) {
    return mockCampaigns;
  },

  async createCampaign(campaignData: Partial<Campaign>) {
    const newCampaign = {
      id: Date.now().toString(),
      name: campaignData.name || '',
      message: campaignData.message || '',
      status: campaignData.status || 'draft',
      targetGroups: campaignData.targetGroups || [],
      scheduledFor: campaignData.scheduledFor,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      createdAt: new Date()
    };
    
    return newCampaign;
  },

  async updateCampaign(id: string, updates: Partial<Campaign>) {
    const campaign = mockCampaigns.find(c => c.id === id);
    if (!campaign) throw new Error('Campaign not found');
    
    return { ...campaign, ...updates };
  },

  // Lead Pages
  async getLeadPages(userId: string) {
    return mockOptinPages;
  },

  async createLeadPage(pageData: Partial<OptinPage>) {
    const newPage = {
      id: Date.now().toString(),
      name: pageData.name || '',
      description: pageData.description,
      fields: pageData.fields || [],
      theme: pageData.theme || 'light',
      customColors: pageData.customColors,
      targetGroup: pageData.targetGroup,
      createdAt: new Date(),
      visits: 0,
      conversions: 0
    };
    
    return newPage;
  },

  // Messages
  async getMessages(userId: string, contactId: string) {
    return [];
  },

  async createMessage(messageData: any) {
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      createdAt: new Date()
    };
    
    return newMessage;
  },

  // Status Updates
  async getStatusUpdates(userId: string) {
    return [];
  },

  async createStatusUpdate(updateData: any) {
    const newUpdate = {
      id: Date.now().toString(),
      ...updateData,
      createdAt: new Date()
    };
    
    return newUpdate;
  }
};