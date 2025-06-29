import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface WhatsAppMessage {
  messageId: string;
  from: string;
  text?: string;
  type: string;
  timestamp: string;
  contact?: {
    name?: string;
    wa_id: string;
  };
}

interface MessageStatus {
  messageId: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipient_id?: string;
}

export const useWhatsAppBusiness = () => {
  const { user } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [messageStatuses, setMessageStatuses] = useState<Record<string, MessageStatus>>({});
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

  const initializeWhatsApp = async () => {
    if (!user) return false;
    
    setIsInitializing(true);
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
      setIsWebSocketConnected(true);
      
      toast.success('WhatsApp Business API connected successfully!');
      localStorage.setItem('whatsapp_auto_init', 'true');
      
      return true;
    } catch (error) {
      console.error('WhatsApp initialization error:', error);
      toast.error('WhatsApp connection failed');
      setIsConnected(false);
      return false;
    } finally {
      setIsInitializing(false);
    }
  };

  const sendTextMessage = async (to: string, message: string): Promise<boolean> => {
    try {
      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const messageId = `demo_msg_${Date.now()}`;
      
      // Add to message statuses
      setMessageStatuses(prev => ({
        ...prev,
        [messageId]: {
          messageId,
          status: 'sent',
          timestamp: new Date().toISOString(),
          recipient_id: to
        }
      }));
      
      toast.success('Message sent successfully!');
      return true;
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Failed to send message');
      return false;
    }
  };

  const sendImageMessage = async (to: string, imageUrl: string, caption?: string): Promise<boolean> => {
    try {
      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const messageId = `demo_img_${Date.now()}`;
      
      // Add to message statuses
      setMessageStatuses(prev => ({
        ...prev,
        [messageId]: {
          messageId,
          status: 'sent',
          timestamp: new Date().toISOString(),
          recipient_id: to
        }
      }));
      
      toast.success('Image sent successfully!');
      return true;
    } catch (error) {
      console.error('Send image error:', error);
      toast.error('Failed to send image');
      return false;
    }
  };

  const sendTemplateMessage = async (
    to: string, 
    templateName: string, 
    languageCode?: string,
    components?: any[]
  ): Promise<boolean> => {
    try {
      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const messageId = `demo_template_${Date.now()}`;
      
      // Add to message statuses
      setMessageStatuses(prev => ({
        ...prev,
        [messageId]: {
          messageId,
          status: 'sent',
          timestamp: new Date().toISOString(),
          recipient_id: to
        }
      }));
      
      toast.success('Template message sent successfully!');
      return true;
    } catch (error) {
      console.error('Send template error:', error);
      toast.error('Failed to send template message');
      return false;
    }
  };

  const markMessageAsRead = async (messageId: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update message status
      setMessageStatuses(prev => ({
        ...prev,
        [messageId]: {
          ...prev[messageId],
          status: 'read',
          timestamp: new Date().toISOString()
        }
      }));
      
      return true;
    } catch (error) {
      console.error('Mark as read error:', error);
      return false;
    }
  };

  const getMessageStatus = async (messageId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return messageStatuses[messageId] || {
        messageId,
        status: 'sent',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Get message status error:', error);
      return null;
    }
  };

  return {
    // State
    isConnected,
    isInitializing,
    messages,
    messageStatuses,
    isWebSocketConnected,
    
    // Actions
    sendTextMessage,
    sendImageMessage,
    sendTemplateMessage,
    markMessageAsRead,
    getMessageStatus,
    initializeWhatsApp,
  };
};