import { mockContacts, mockAutoResponses } from '../mock/mockData';

export const whatsappService = {
  // Initialize WhatsApp connection
  async initialize(userId: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      throw new Error('Failed to initialize WhatsApp connection');
    }
  },

  // Get QR code for WhatsApp Web
  async getQRCode(userId: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    } catch (error) {
      throw new Error('Failed to get QR code');
    }
  },

  // Send message to a contact
  async sendMessage(userId: string, contactId: string, message: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { messageId: `msg_${Date.now()}` };
    } catch (error) {
      throw new Error('Failed to send message');
    }
  },

  // Send bulk messages (campaign)
  async sendBulkMessages(userId: string, campaignId: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, sent: 25, failed: 0 };
    } catch (error) {
      throw new Error('Failed to send bulk messages');
    }
  },

  // Update WhatsApp status
  async updateStatus(userId: string, status: string, mediaUrl?: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    } catch (error) {
      throw new Error('Failed to update status');
    }
  },

  // Get message history
  async getMessageHistory(userId: string, contactId: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      return [];
    } catch (error) {
      throw new Error('Failed to get message history');
    }
  },

  // Set up auto-response
  async setupAutoResponse(userId: string, trigger: string, response: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      return {
        id: `auto_${Date.now()}`,
        trigger,
        response,
        isActive: true,
        createdAt: new Date()
      };
    } catch (error) {
      throw new Error('Failed to set up auto-response');
    }
  },

  // Check connection status
  async checkConnection(userId: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return true;
    } catch (error) {
      return false;
    }
  },

  // Disconnect WhatsApp
  async disconnect(userId: string) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    } catch (error) {
      throw new Error('Failed to disconnect WhatsApp');
    }
  }
};