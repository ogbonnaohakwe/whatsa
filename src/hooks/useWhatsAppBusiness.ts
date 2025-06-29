import { useEffect, useState } from 'react';
import { whatsappBusinessService } from '../services/whatsappBusinessService';
import { websocketService } from '../services/websocketService';
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

  useEffect(() => {
    if (user) {
      // Check if we should auto-initialize
      const shouldAutoInit = localStorage.getItem('whatsapp_auto_init') === 'true';
      if (shouldAutoInit) {
        initializeWhatsApp();
      }
      
      setupEventListeners();
    }

    return () => {
      cleanupEventListeners();
    };
  }, [user]);

  const initializeWhatsApp = async () => {
    if (!user) return false;
    
    setIsInitializing(true);
    try {
      const success = await whatsappBusinessService.initialize();
      setIsConnected(success);
      
      if (success) {
        toast.success('WhatsApp Business API connected successfully!');
        localStorage.setItem('whatsapp_auto_init', 'true');
        
        // Initialize WebSocket connection
        websocketService.initialize(user.id);
        setIsWebSocketConnected(websocketService.isConnected());
        
        // Set up WebSocket connection status check
        const wsCheckInterval = setInterval(() => {
          setIsWebSocketConnected(websocketService.isConnected());
        }, 5000);
        
        // Store cleanup function
        window.whatsappCleanup = {
          ...window.whatsappCleanup,
          clearWsCheck: () => clearInterval(wsCheckInterval)
        };
      } else {
        toast.error('Failed to connect to WhatsApp Business API');
      }
      
      return success;
    } catch (error) {
      console.error('WhatsApp initialization error:', error);
      toast.error('WhatsApp connection failed');
      setIsConnected(false);
      return false;
    } finally {
      setIsInitializing(false);
    }
  };

  const setupEventListeners = () => {
    // Listen for incoming messages
    const unsubscribeMessages = websocketService.onMessageReceived((messageData: WhatsAppMessage) => {
      setMessages(prev => [messageData, ...prev]);
      toast.success(`New message from ${messageData.contact?.name || messageData.from}`);
    });

    // Listen for message status updates
    const unsubscribeStatus = websocketService.onMessageStatus((statusData: MessageStatus) => {
      setMessageStatuses(prev => ({
        ...prev,
        [statusData.messageId]: statusData
      }));
    });

    // Listen for connection status changes
    const unsubscribeConnection = websocketService.onConnectionStatus((statusData: any) => {
      setIsConnected(statusData.connected);
    });

    // Store cleanup functions
    window.whatsappCleanup = {
      ...window.whatsappCleanup,
      unsubscribeMessages,
      unsubscribeStatus,
      unsubscribeConnection
    };
  };

  const cleanupEventListeners = () => {
    if (window.whatsappCleanup) {
      window.whatsappCleanup.unsubscribeMessages?.();
      window.whatsappCleanup.unsubscribeStatus?.();
      window.whatsappCleanup.unsubscribeConnection?.();
      window.whatsappCleanup.clearWsCheck?.();
    }
  };

  const sendTextMessage = async (to: string, message: string): Promise<boolean> => {
    try {
      const messageId = await whatsappBusinessService.sendTextMessage(to, message);
      
      if (messageId) {
        toast.success('Message sent successfully!');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Failed to send message');
      return false;
    }
  };

  const sendImageMessage = async (to: string, imageUrl: string, caption?: string): Promise<boolean> => {
    try {
      const messageId = await whatsappBusinessService.sendImageMessage(to, imageUrl, caption);
      
      if (messageId) {
        toast.success('Image sent successfully!');
        return true;
      }
      
      return false;
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
      const messageId = await whatsappBusinessService.sendTemplateMessage(
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
      return false;
    }
  };

  const markMessageAsRead = async (messageId: string): Promise<boolean> => {
    try {
      return await whatsappBusinessService.markMessageAsRead(messageId);
    } catch (error) {
      console.error('Mark as read error:', error);
      return false;
    }
  };

  const getMessageStatus = async (messageId: string) => {
    try {
      return await whatsappBusinessService.getMessageStatus(messageId);
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

// Extend window interface for cleanup functions
declare global {
  interface Window {
    whatsappCleanup?: {
      unsubscribeMessages?: () => void;
      unsubscribeStatus?: () => void;
      unsubscribeConnection?: () => void;
      clearWsCheck?: () => void;
    };
  }
}