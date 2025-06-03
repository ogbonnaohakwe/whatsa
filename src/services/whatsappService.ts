import axios from 'axios';
import { supabase } from '../lib/supabase';

const WHATSAPP_API_URL = import.meta.env.VITE_WHATSAPP_API_URL;

export const whatsappService = {
  // Initialize WhatsApp connection
  async initialize(userId: string) {
    try {
      const response = await axios.post(`${WHATSAPP_API_URL}/init`, { userId });
      return response.data;
    } catch (error) {
      throw new Error('Failed to initialize WhatsApp connection');
    }
  },

  // Get QR code for WhatsApp Web
  async getQRCode(userId: string) {
    try {
      const response = await axios.get(`${WHATSAPP_API_URL}/qr/${userId}`);
      return response.data.qrCode;
    } catch (error) {
      throw new Error('Failed to get QR code');
    }
  },

  // Send message to a contact
  async sendMessage(userId: string, contactId: string, message: string) {
    try {
      const response = await axios.post(`${WHATSAPP_API_URL}/send`, {
        userId,
        contactId,
        message
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send message');
    }
  },

  // Send bulk messages (campaign)
  async sendBulkMessages(userId: string, campaignId: string) {
    try {
      const response = await axios.post(`${WHATSAPP_API_URL}/send-bulk`, {
        userId,
        campaignId
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to send bulk messages');
    }
  },

  // Update WhatsApp status
  async updateStatus(userId: string, status: string, mediaUrl?: string) {
    try {
      const response = await axios.post(`${WHATSAPP_API_URL}/status`, {
        userId,
        status,
        mediaUrl
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update status');
    }
  },

  // Get message history
  async getMessageHistory(userId: string, contactId: string) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', userId)
        .eq('contact_id', contactId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Failed to get message history');
    }
  },

  // Set up auto-response
  async setupAutoResponse(userId: string, trigger: string, response: string) {
    try {
      const { data, error } = await supabase
        .from('auto_responses')
        .insert([
          {
            user_id: userId,
            trigger,
            response,
            is_active: true
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error('Failed to set up auto-response');
    }
  },

  // Check connection status
  async checkConnection(userId: string) {
    try {
      const response = await axios.get(`${WHATSAPP_API_URL}/status/${userId}`);
      return response.data.connected;
    } catch (error) {
      return false;
    }
  },

  // Disconnect WhatsApp
  async disconnect(userId: string) {
    try {
      const response = await axios.post(`${WHATSAPP_API_URL}/disconnect`, {
        userId
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to disconnect WhatsApp');
    }
  }
};