import axios from 'axios';
import { websocketService } from './websocketService';

interface WhatsAppMessage {
  to: string;
  type: 'text' | 'image' | 'document' | 'template';
  text?: {
    body: string;
  };
  image?: {
    link: string;
    caption?: string;
  };
  document?: {
    link: string;
    filename: string;
    caption?: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: any[];
  };
}

interface WhatsAppResponse {
  messaging_product: string;
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

class WhatsAppBusinessService {
  private apiUrl: string;
  private accessToken: string;
  private phoneNumberId: string;
  private webhookVerifyToken: string;
  private backendUrl: string;

  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v18.0';
    this.accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || '';
    this.webhookVerifyToken = import.meta.env.VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';
    this.backendUrl = import.meta.env.VITE_API_URL || '';
  }

  // Check if we're in demo mode
  isDemoMode(): boolean {
    return !this.accessToken || !this.phoneNumberId || !this.backendUrl;
  }

  // Initialize WhatsApp Business API
  async initialize(): Promise<boolean> {
    if (this.isDemoMode()) {
      console.log('Running in demo mode - simulating WhatsApp connection');
      // Simulate successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return true;
    }

    try {
      // Check if our backend is configured properly
      const response = await axios.get(`${this.backendUrl}/api/whatsapp/config`);
      
      if (response.data.configured) {
        console.log('WhatsApp Business API initialized successfully');
        return true;
      } else {
        console.error('WhatsApp Business API not configured properly');
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize WhatsApp Business API:', error);
      return false;
    }
  }

  // Send a text message
  async sendTextMessage(to: string, message: string): Promise<string | null> {
    if (this.isDemoMode()) {
      console.log('Demo mode: Simulating sending message to', to);
      // Simulate successful message sending
      await new Promise(resolve => setTimeout(resolve, 800));
      return `demo_msg_${Date.now()}`;
    }

    try {
      const response = await axios.post(
        `${this.backendUrl}/api/whatsapp/send`,
        {
          to: this.formatPhoneNumber(to),
          message,
          type: 'text'
        }
      );

      return response.data.messageId;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  // Send an image message
  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<string | null> {
    if (this.isDemoMode()) {
      console.log('Demo mode: Simulating sending image to', to);
      // Simulate successful message sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `demo_img_${Date.now()}`;
    }

    try {
      const response = await axios.post(
        `${this.backendUrl}/api/whatsapp/send`,
        {
          to: this.formatPhoneNumber(to),
          message: caption || '',
          mediaUrl: imageUrl,
          type: 'image',
          caption
        }
      );

      return response.data.messageId;
    } catch (error) {
      console.error('Failed to send WhatsApp image:', error);
      throw error;
    }
  }

  // Send a template message
  async sendTemplateMessage(
    to: string, 
    templateName: string, 
    languageCode: string = 'en_US',
    components?: any[]
  ): Promise<string | null> {
    if (this.isDemoMode()) {
      console.log('Demo mode: Simulating sending template to', to);
      // Simulate successful message sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `demo_template_${Date.now()}`;
    }

    try {
      const response = await axios.post(
        `${this.backendUrl}/api/whatsapp/send-template`,
        {
          to: this.formatPhoneNumber(to),
          templateName,
          languageCode,
          components
        }
      );

      return response.data.messageId;
    } catch (error) {
      console.error('Failed to send WhatsApp template:', error);
      throw error;
    }
  }

  // Get message status
  async getMessageStatus(messageId: string): Promise<any> {
    if (this.isDemoMode()) {
      console.log('Demo mode: Simulating message status for', messageId);
      // Simulate message status
      return {
        id: messageId,
        status: 'delivered',
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await axios.get(
        `${this.backendUrl}/api/whatsapp/status/${messageId}`
      );

      return response.data.status;
    } catch (error) {
      console.error('Failed to get message status:', error);
      throw error;
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<boolean> {
    if (this.isDemoMode()) {
      console.log('Demo mode: Simulating marking message as read', messageId);
      return true;
    }

    try {
      const response = await axios.post(
        `${this.backendUrl}/api/whatsapp/mark-read`,
        { messageId }
      );

      return response.data.success;
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      return false;
    }
  }

  // Format phone number for WhatsApp API
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('1') && cleaned.length === 10) {
      return '1' + cleaned; // Assume US number
    }
    
    return cleaned;
  }
}

export const whatsappBusinessService = new WhatsAppBusinessService();