import { useState, useEffect } from 'react';
import { whatsappGatewayService } from '../services/whatsappGatewayService';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface MessageStatus {
  id: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  recipientId?: string;
}

interface WhatsAppMessage {
  id: string;
  from: string;
  text?: string;
  type: string;
  timestamp: string;
  contact?: {
    name?: string;
    wa_id: string;
  };
}

export const useWhatsAppGateway = () => {
  const { user } = useAuthStore();
  const [isConnected, setIsConnected] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [messageStatuses, setMessageStatuses] = useState<Record<string, MessageStatus>>({});
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we should auto-initialize
    const shouldAutoInit = localStorage.getItem('whatsapp_auto_init') === 'true';
    if (shouldAutoInit) {
      initializeWhatsApp();
    }
    
    setupEventListeners();
    
    return () => {
      cleanupEventListeners();
    };
  }, []);

  const initializeWhatsApp = async (token?: string, phoneId?: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsInitializing(true);
    setError(null);
    
    try {
      const success = await whatsappGatewayService.initialize(token, phoneId);
      setIsConnected(success);
      
      if (success) {
        toast.success('WhatsApp Business API connected successfully!');
        localStorage.setItem('whatsapp_auto_init', 'true');
        
        // Fetch business profile
        try {
          const profile = await whatsappGatewayService.getBusinessProfile();
          setBusinessProfile(profile);
        } catch (profileError) {
          console.error('Failed to fetch business profile:', profileError);
        }
      } else {
        toast.error('Failed to connect to WhatsApp Business API');
        setError('Failed to connect to WhatsApp Business API');
      }
      
      return success;
    } catch (error) {
      console.error('WhatsApp initialization error:', error);
      toast.error('WhatsApp connection failed');
      setIsConnected(false);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      return false;
    } finally {
      setIsInitializing(false);
    }
  };

  const setupEventListeners = () => {
    // Listen for incoming messages
    const handleMessageReceived = (event: CustomEvent) => {
      const messageData = event.detail;
      setMessages(prev => [messageData, ...prev]);
      toast.success(`New message from ${messageData.contact?.name || messageData.from}`);
    };

    // Listen for message status updates
    const handleMessageStatus = (event: CustomEvent) => {
      const statusData = event.detail;
      setMessageStatuses(prev => ({
        ...prev,
        [statusData.id]: statusData
      }));
    };

    window.addEventListener('whatsapp_message_received', handleMessageReceived as EventListener);
    window.addEventListener('whatsapp_message_status', handleMessageStatus as EventListener);

    // Store cleanup functions
    return () => {
      window.removeEventListener('whatsapp_message_received', handleMessageReceived as EventListener);
      window.removeEventListener('whatsapp_message_status', handleMessageStatus as EventListener);
    };
  };

  const cleanupEventListeners = () => {
    // This will be populated by the return function from setupEventListeners
  };

  const sendTextMessage = async (to: string, message: string): Promise<boolean> => {
    try {
      setError(null);
      const messageId = await whatsappGatewayService.sendTextMessage(to, message);
      
      if (messageId) {
        toast.success('Message sent successfully!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Failed to send message');
      setError(error instanceof Error ? error.message : 'Failed to send message');
      return false;
    }
  };

  const sendImageMessage = async (to: string, imageUrl: string, caption?: string): Promise<boolean> => {
    try {
      setError(null);
      const messageId = await whatsappGatewayService.sendImageMessage(to, imageUrl, caption);
      
      if (messageId) {
        toast.success('Image sent successfully!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Send image error:', error);
      toast.error('Failed to send image');
      setError(error instanceof Error ? error.message : 'Failed to send image');
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
      setError(null);
      const messageId = await whatsappGatewayService.sendTemplateMessage(
        to, 
        templateName, 
        languageCode, 
        components
      );
      
      if (messageId) {
        toast.success('Template message sent successfully!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Send template error:', error);
      toast.error('Failed to send template message');
      setError(error instanceof Error ? error.message : 'Failed to send template message');
      return false;
    }
  };

  const markMessageAsRead = async (messageId: string): Promise<boolean> => {
    try {
      setError(null);
      return await whatsappGatewayService.markMessageAsRead(messageId);
    } catch (error) {
      console.error('Mark as read error:', error);
      setError(error instanceof Error ? error.message : 'Failed to mark message as read');
      return false;
    }
  };

  const getMessageStatus = async (messageId: string) => {
    try {
      setError(null);
      return await whatsappGatewayService.getMessageStatus(messageId);
    } catch (error) {
      console.error('Get message status error:', error);
      setError(error instanceof Error ? error.message : 'Failed to get message status');
      return null;
    }
  };

  const updateBusinessProfile = async (profileData: any): Promise<boolean> => {
    try {
      setError(null);
      const success = await whatsappGatewayService.updateBusinessProfile(profileData);
      
      if (success) {
        // Refresh business profile
        const profile = await whatsappGatewayService.getBusinessProfile();
        setBusinessProfile(profile);
        toast.success('Business profile updated successfully!');
      }
      
      return success;
    } catch (error) {
      console.error('Update business profile error:', error);
      toast.error('Failed to update business profile');
      setError(error instanceof Error ? error.message : 'Failed to update business profile');
      return false;
    }
  };

  return {
    // State
    isConnected,
    isInitializing,
    messages,
    messageStatuses,
    businessProfile,
    error,
    
    // Actions
    initializeWhatsApp,
    sendTextMessage,
    sendImageMessage,
    sendTemplateMessage,
    markMessageAsRead,
    getMessageStatus,
    updateBusinessProfile
  };
};