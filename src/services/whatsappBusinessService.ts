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

  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v18.0';
    this.accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || '';
    this.phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || '';
    this.webhookVerifyToken = import.meta.env.VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN || '';
  }

  // Initialize WhatsApp Business API
  async initialize(): Promise<boolean> {
    try {
      // Verify the phone number and access token
      const response = await axios.get(
        `${this.apiUrl}/${this.phoneNumberId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      console.log('WhatsApp Business API initialized:', response.data);
      return true;
    } catch (error) {
      console.error('Failed to initialize WhatsApp Business API:', error);
      return false;
    }
  }

  // Send a text message
  async sendTextMessage(to: string, message: string): Promise<string | null> {
    try {
      const payload: WhatsAppMessage = {
        to: this.formatPhoneNumber(to),
        type: 'text',
        text: {
          body: message,
        },
      };

      const response = await axios.post<WhatsAppResponse>(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          ...payload,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const messageId = response.data.messages[0]?.id;
      console.log('Message sent successfully:', messageId);
      return messageId;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    }
  }

  // Send an image message
  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<string | null> {
    try {
      const payload: WhatsAppMessage = {
        to: this.formatPhoneNumber(to),
        type: 'image',
        image: {
          link: imageUrl,
          caption,
        },
      };

      const response = await axios.post<WhatsAppResponse>(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          ...payload,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const messageId = response.data.messages[0]?.id;
      console.log('Image message sent successfully:', messageId);
      return messageId;
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
      const payload: WhatsAppMessage = {
        to: this.formatPhoneNumber(to),
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components,
        },
      };

      const response = await axios.post<WhatsAppResponse>(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          ...payload,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const messageId = response.data.messages[0]?.id;
      console.log('Template message sent successfully:', messageId);
      return messageId;
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

  // Upload media to WhatsApp
  async uploadMedia(file: File, type: 'image' | 'document' | 'audio' | 'video'): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('messaging_product', 'whatsapp');

      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/media`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.id;
    } catch (error) {
      console.error('Failed to upload media:', error);
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

  // Process incoming webhook
  processWebhook(webhookData: any): void {
    try {
      const entry = webhookData.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      if (value?.messages) {
        // Handle incoming messages
        value.messages.forEach((message: any) => {
          this.handleIncomingMessage(message, value.contacts?.[0]);
        });
      }

      if (value?.statuses) {
        // Handle message status updates
        value.statuses.forEach((status: any) => {
          this.handleMessageStatus(status);
        });
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  // Handle incoming message
  private handleIncomingMessage(message: any, contact: any): void {
    const messageData = {
      messageId: message.id,
      from: message.from,
      timestamp: message.timestamp,
      type: message.type,
      text: message.text?.body,
      image: message.image,
      document: message.document,
      contact: {
        name: contact?.profile?.name,
        wa_id: contact?.wa_id,
      },
    };

    console.log('Incoming WhatsApp message:', messageData);

    // Emit to WebSocket for real-time updates
    if (websocketService.isConnected()) {
      window.dispatchEvent(
        new CustomEvent('whatsapp_message_received', { detail: messageData })
      );
    }

    // Process auto-responses
    this.processAutoResponse(messageData);
  }

  // Handle message status updates
  private handleMessageStatus(status: any): void {
    const statusData = {
      messageId: status.id,
      status: status.status,
      timestamp: status.timestamp,
      recipient_id: status.recipient_id,
    };

    console.log('Message status update:', statusData);

    // Emit to WebSocket for real-time updates
    window.dispatchEvent(
      new CustomEvent('whatsapp_message_status', { detail: statusData })
    );
  }

  // Process auto-response
  private async processAutoResponse(messageData: any): Promise<void> {
    try {
      // Get auto-responses from local storage or API
      const autoResponses = this.getAutoResponses();
      
      for (const autoResponse of autoResponses) {
        if (this.matchesTrigger(messageData.text, autoResponse.trigger)) {
          await this.sendTextMessage(messageData.from, autoResponse.response);
          break; // Send only the first matching response
        }
      }
    } catch (error) {
      console.error('Error processing auto-response:', error);
    }
  }

  // Get auto-responses (you can integrate with your database)
  private getAutoResponses(): Array<{ trigger: string; response: string; isActive: boolean }> {
    // This would typically come from your database
    return [
      {
        trigger: 'hello,hi,hey',
        response: 'Hello! Thanks for reaching out. How can I help you today?',
        isActive: true,
      },
      {
        trigger: 'price,pricing,cost',
        response: 'Our pricing starts at $29/month. Would you like to know more about our plans?',
        isActive: true,
      },
      {
        trigger: 'hours,open,business hours',
        response: 'We\'re available Monday-Friday 9am to 5pm. How else can I assist you?',
        isActive: true,
      },
    ];
  }

  // Check if message matches trigger
  private matchesTrigger(message: string, trigger: string): boolean {
    if (!message) return false;
    
    const triggers = trigger.toLowerCase().split(',').map(t => t.trim());
    const messageText = message.toLowerCase();
    
    return triggers.some(t => messageText.includes(t));
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

  // Verify webhook (for webhook setup)
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    if (mode === 'subscribe' && token === this.webhookVerifyToken) {
      return challenge;
    }
    return null;
  }
}

export const whatsappBusinessService = new WhatsAppBusinessService();