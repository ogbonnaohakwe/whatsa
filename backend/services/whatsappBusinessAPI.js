const axios = require('axios');

class WhatsAppBusinessAPI {
  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v18.0';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.webhookVerifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  }

  // Send text message
  async sendMessage(to, message) {
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

      return response.data.messages[0]?.id;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Send image message
  async sendImage(to, imageUrl, caption) {
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

      return response.data.messages[0]?.id;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Send template message
  async sendTemplate(to, templateName, languageCode = 'en_US', components = []) {
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

      return response.data.messages[0]?.id;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Mark message as read
  async markAsRead(messageId) {
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
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      return false;
    }
  }

  // Get message status
  async getMessageStatus(messageId) {
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
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Upload media
  async uploadMedia(filePath, type) {
    try {
      const FormData = require('form-data');
      const fs = require('fs');
      
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      form.append('type', type);
      form.append('messaging_product', 'whatsapp');

      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/media`,
        form,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            ...form.getHeaders(),
          },
        }
      );

      return response.data.id;
    } catch (error) {
      console.error('WhatsApp API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Process incoming webhook
  processWebhook(webhookData) {
    try {
      const entry = webhookData.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;

      const result = {
        messages: [],
        statuses: [],
      };

      if (value?.messages) {
        result.messages = value.messages.map(message => ({
          id: message.id,
          from: message.from,
          timestamp: message.timestamp,
          type: message.type,
          text: message.text?.body,
          image: message.image,
          document: message.document,
          contact: value.contacts?.[0],
        }));
      }

      if (value?.statuses) {
        result.statuses = value.statuses.map(status => ({
          id: status.id,
          status: status.status,
          timestamp: status.timestamp,
          recipient_id: status.recipient_id,
        }));
      }

      return result;
    } catch (error) {
      console.error('Error processing webhook:', error);
      return { messages: [], statuses: [] };
    }
  }

  // Verify webhook
  verifyWebhook(mode, token, challenge) {
    if (mode === 'subscribe' && token === this.webhookVerifyToken) {
      return challenge;
    }
    return null;
  }

  // Format phone number
  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('1') && cleaned.length === 10) {
      return '1' + cleaned;
    }
    
    return cleaned;
  }

  // Validate configuration
  isConfigured() {
    return !!(this.accessToken && this.phoneNumberId && this.webhookVerifyToken);
  }
}

module.exports = WhatsAppBusinessAPI;