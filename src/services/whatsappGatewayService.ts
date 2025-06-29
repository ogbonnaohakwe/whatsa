import axios from 'axios';
import toast from 'react-hot-toast';

// WhatsApp Business API configuration
const WHATSAPP_API_URL = import.meta.env.VITE_WHATSAPP_API_URL || 'https://graph.facebook.com/v17.0';
const WHATSAPP_ACCESS_TOKEN = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;

class WhatsAppGatewayService {
  private accessToken: string | null = WHATSAPP_ACCESS_TOKEN || null;
  private phoneNumberId: string | null = WHATSAPP_PHONE_NUMBER_ID || null;
  private isInitialized: boolean = false;

  // Initialize WhatsApp Business API
  async initialize(token?: string, phoneId?: string): Promise<boolean> {
    try {
      // Use provided credentials or fallback to environment variables
      this.accessToken = token || this.accessToken;
      this.phoneNumberId = phoneId || this.phoneNumberId;

      if (!this.accessToken || !this.phoneNumberId) {
        console.error('WhatsApp API credentials not provided');
        return false;
      }

      // Verify credentials by making a test API call
      const response = await axios.get(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        this.isInitialized = true;
        console.log('WhatsApp Business API initialized successfully');
        return true;
      } else {
        throw new Error('Failed to verify WhatsApp API credentials');
      }
    } catch (error) {
      console.error('WhatsApp initialization error:', error);
      
      // For demo purposes, simulate successful initialization
      if (import.meta.env.DEV) {
        this.isInitialized = true;
        console.log('WhatsApp Business API initialized in demo mode');
        return true;
      }
      
      return false;
    }
  }

  // Check if the service is initialized
  isConnected(): boolean {
    return this.isInitialized;
  }

  // Send a text message
  async sendTextMessage(to: string, message: string): Promise<string | null> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Simulate successful message sending in demo mode
          console.log(`[DEMO] Sending message to ${to}: ${message}`);
          return `msg_${Date.now()}`;
        }
        throw new Error('WhatsApp API not initialized');
      }

      // Format phone number (remove any non-numeric characters and ensure it has country code)
      const formattedNumber = this.formatPhoneNumber(to);

      const response = await axios.post(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: formattedNumber,
          type: 'text',
          text: {
            body: message
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.messages && response.data.messages.length > 0) {
        return response.data.messages[0].id;
      }
      
      throw new Error('No message ID returned from WhatsApp API');
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      
      // For demo purposes, return a mock message ID
      if (import.meta.env.DEV) {
        return `msg_${Date.now()}`;
      }
      
      throw error;
    }
  }

  // Send an image message
  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<string | null> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Simulate successful message sending in demo mode
          console.log(`[DEMO] Sending image to ${to}: ${imageUrl} ${caption ? `with caption: ${caption}` : ''}`);
          return `img_${Date.now()}`;
        }
        throw new Error('WhatsApp API not initialized');
      }

      // Format phone number
      const formattedNumber = this.formatPhoneNumber(to);

      const response = await axios.post(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: formattedNumber,
          type: 'image',
          image: {
            link: imageUrl,
            caption: caption || ''
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.messages && response.data.messages.length > 0) {
        return response.data.messages[0].id;
      }
      
      throw new Error('No message ID returned from WhatsApp API');
    } catch (error) {
      console.error('Failed to send WhatsApp image:', error);
      
      // For demo purposes, return a mock message ID
      if (import.meta.env.DEV) {
        return `img_${Date.now()}`;
      }
      
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
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Simulate successful message sending in demo mode
          console.log(`[DEMO] Sending template ${templateName} to ${to}`);
          return `template_${Date.now()}`;
        }
        throw new Error('WhatsApp API not initialized');
      }

      // Format phone number
      const formattedNumber = this.formatPhoneNumber(to);

      const payload: any = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: formattedNumber,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode
          }
        }
      };

      // Add components if provided
      if (components && components.length > 0) {
        payload.template.components = components;
      }

      const response = await axios.post(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.messages && response.data.messages.length > 0) {
        return response.data.messages[0].id;
      }
      
      throw new Error('No message ID returned from WhatsApp API');
    } catch (error) {
      console.error('Failed to send WhatsApp template:', error);
      
      // For demo purposes, return a mock message ID
      if (import.meta.env.DEV) {
        return `template_${Date.now()}`;
      }
      
      throw error;
    }
  }

  // Get message status
  async getMessageStatus(messageId: string): Promise<any> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Simulate message status in demo mode
          return {
            id: messageId,
            status: ['sent', 'delivered', 'read'][Math.floor(Math.random() * 3)],
            timestamp: new Date().toISOString()
          };
        }
        throw new Error('WhatsApp API not initialized');
      }

      const response = await axios.get(
        `${WHATSAPP_API_URL}/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to get message status:', error);
      
      // For demo purposes, return a mock status
      if (import.meta.env.DEV) {
        return {
          id: messageId,
          status: 'delivered',
          timestamp: new Date().toISOString()
        };
      }
      
      throw error;
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Simulate success in demo mode
          console.log(`[DEMO] Marking message as read: ${messageId}`);
          return true;
        }
        throw new Error('WhatsApp API not initialized');
      }

      const response = await axios.post(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      
      // For demo purposes, return success
      if (import.meta.env.DEV) {
        return true;
      }
      
      return false;
    }
  }

  // Get WhatsApp Business Account information
  async getBusinessProfile(): Promise<any> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Return mock business profile in demo mode
          return {
            name: 'Demo Business',
            description: 'This is a demo WhatsApp Business account',
            vertical: 'RETAIL',
            about: 'Automated messaging with WhatsApp Autoresponder'
          };
        }
        throw new Error('WhatsApp API not initialized');
      }

      const response = await axios.get(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}/whatsapp_business_profile`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          params: {
            fields: 'about,address,description,email,profile_picture_url,websites,vertical'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Failed to get business profile:', error);
      throw error;
    }
  }

  // Update WhatsApp Business profile
  async updateBusinessProfile(profileData: any): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Simulate success in demo mode
          console.log(`[DEMO] Updating business profile:`, profileData);
          return true;
        }
        throw new Error('WhatsApp API not initialized');
      }

      const response = await axios.patch(
        `${WHATSAPP_API_URL}/${this.phoneNumberId}/whatsapp_business_profile`,
        {
          messaging_product: 'whatsapp',
          ...profileData
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error('Failed to update business profile:', error);
      return false;
    }
  }

  // Get media URL from media ID
  async getMediaUrl(mediaId: string): Promise<string | null> {
    try {
      if (!this.isInitialized) {
        if (import.meta.env.DEV) {
          // Return mock URL in demo mode
          return 'https://example.com/mock-media.jpg';
        }
        throw new Error('WhatsApp API not initialized');
      }

      const response = await axios.get(
        `${WHATSAPP_API_URL}/${mediaId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.url) {
        // Get the actual media content
        const mediaResponse = await axios.get(
          response.data.url,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`
            },
            responseType: 'arraybuffer'
          }
        );

        // Convert to base64 for display
        const base64 = Buffer.from(mediaResponse.data, 'binary').toString('base64');
        const mimeType = response.data.mime_type || 'application/octet-stream';
        return `data:${mimeType};base64,${base64}`;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get media URL:', error);
      return null;
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

  // Verify webhook
  verifyWebhook(mode: string, token: string, challenge: string): string | null {
    const verifyToken = import.meta.env.VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    
    return null;
  }

  // Process webhook payload
  processWebhook(payload: any): boolean {
    try {
      console.log('Processing webhook payload:', payload);
      
      // Extract relevant information from the payload
      if (payload.object === 'whatsapp_business_account') {
        const entries = payload.entry || [];
        
        for (const entry of entries) {
          const changes = entry.changes || [];
          
          for (const change of changes) {
            if (change.field === 'messages') {
              const messages = change.value.messages || [];
              
              for (const message of messages) {
                // Process incoming message
                console.log('Received message:', message);
                
                // Dispatch event for the application to handle
                const event = new CustomEvent('whatsapp_message_received', { 
                  detail: message 
                });
                window.dispatchEvent(event);
              }
              
              const statuses = change.value.statuses || [];
              
              for (const status of statuses) {
                // Process status update
                console.log('Received status update:', status);
                
                // Dispatch event for the application to handle
                const event = new CustomEvent('whatsapp_message_status', { 
                  detail: status 
                });
                window.dispatchEvent(event);
              }
            }
          }
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error processing webhook:', error);
      return false;
    }
  }
}

export const whatsappGatewayService = new WhatsAppGatewayService();