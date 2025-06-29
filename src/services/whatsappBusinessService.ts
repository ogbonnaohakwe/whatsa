import axios from 'axios';

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

  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v18.0';
    this.accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;
    this.webhookVerifyToken = import.meta.env.VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    
    if (!this.accessToken || !this.phoneNumberId) {
      console.error('WhatsApp Business API credentials not found. Please check your .env file.');
    }
  }

  // Initialize WhatsApp Business API
  async initialize(): Promise<boolean> {
    try {
      // Check if we have valid credentials
      if (!this.accessToken || !this.phoneNumberId) {
        throw new Error('WhatsApp Business API credentials not configured');
      }
      
      // Make a test API call to verify credentials
      const response = await axios.get(
        `${this.apiUrl}/${this.phoneNumberId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );
      
      if (response.status === 200) {
        console.log('WhatsApp Business API initialized successfully');
        return true;
      } else {
        console.error('WhatsApp Business API initialization failed:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize WhatsApp Business API:', error);
      return false;
    }
  }

  // Send a text message
  async sendTextMessage(to: string, message: string): Promise<string | null> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: this.formatPhoneNumber(to),
          type: 'text',
          text: {
            body: message,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.messages[0]?.id || null;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  // Send an image message
  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<string | null> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: this.formatPhoneNumber(to),
          type: 'image',
          image: {
            link: imageUrl,
            caption,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.messages[0]?.id || null;
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
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: this.formatPhoneNumber(to),
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: languageCode,
            },
            components,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.messages[0]?.id || null;
    } catch (error) {
      console.error('Failed to send WhatsApp template:', error);
      throw error;
    }
  }

  // Get message status
  async getMessageStatus(messageId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to get message status:', error);
      throw error;
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<boolean> {
    try {
      await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return true;
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