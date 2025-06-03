import { create } from 'zustand';
import { whatsappService } from '../services/whatsappService';
import { websocketService } from '../services/websocketService';
import { useAuthStore } from './authStore';
import toast from 'react-hot-toast';

interface WhatsappState {
  isConnected: boolean;
  phoneNumber: string | null;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  qrCode: string | null;
  error: string | null;
  connecting: boolean;
  initialize: () => Promise<void>;
  connectByPhone: (phoneNumber: string) => Promise<boolean>;
  connectByQR: () => Promise<string>;
  disconnect: () => Promise<boolean>;
  sendMessage: (contactId: string, message: string) => Promise<boolean>;
  updateStatus: (status: string, mediaUrl?: string) => Promise<boolean>;
}

export const useWhatsappStore = create<WhatsappState>((set, get) => ({
  isConnected: false,
  phoneNumber: null,
  status: 'disconnected',
  qrCode: null,
  error: null,
  connecting: false,

  initialize: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    try {
      const isConnected = await whatsappService.checkConnection(user.id);
      if (isConnected) {
        websocketService.initialize(user.id);
        set({ isConnected: true, status: 'connected' });
      }
    } catch (error) {
      console.error('Failed to initialize WhatsApp:', error);
    }
  },

  connectByPhone: async (phoneNumber: string) => {
    const { user } = useAuthStore.getState();
    if (!user) return false;

    set({ connecting: true, error: null, status: 'connecting' });
    
    try {
      await whatsappService.initialize(user.id);
      websocketService.initialize(user.id);
      
      set({ 
        connecting: false, 
        isConnected: true,
        status: 'connected',
        phoneNumber,
      });
      
      toast.success('WhatsApp connected successfully!');
      return true;
    } catch (error) {
      set({ 
        connecting: false, 
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to connect WhatsApp', 
      });
      toast.error('Failed to connect WhatsApp');
      return false;
    }
  },
  
  connectByQR: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return '';

    set({ connecting: true, error: null, status: 'connecting' });
    
    try {
      await whatsappService.initialize(user.id);
      const qrCode = await whatsappService.getQRCode(user.id);
      
      set({ 
        connecting: false,
        qrCode,
      });
      
      // Start WebSocket connection to listen for successful connection
      websocketService.initialize(user.id);
      
      return qrCode;
    } catch (error) {
      set({ 
        connecting: false, 
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to get QR code', 
      });
      return '';
    }
  },
  
  disconnect: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return false;

    set({ connecting: true, error: null });
    
    try {
      await whatsappService.disconnect(user.id);
      websocketService.disconnect();
      
      set({ 
        connecting: false, 
        isConnected: false,
        status: 'disconnected',
        phoneNumber: null,
        qrCode: null,
      });
      
      toast.success('WhatsApp disconnected successfully');
      return true;
    } catch (error) {
      set({ 
        connecting: false, 
        error: error instanceof Error ? error.message : 'Failed to disconnect', 
      });
      toast.error('Failed to disconnect WhatsApp');
      return false;
    }
  },

  sendMessage: async (contactId: string, message: string) => {
    const { user } = useAuthStore.getState();
    if (!user) return false;

    try {
      await whatsappService.sendMessage(user.id, contactId, message);
      return true;
    } catch (error) {
      toast.error('Failed to send message');
      return false;
    }
  },

  updateStatus: async (status: string, mediaUrl?: string) => {
    const { user } = useAuthStore.getState();
    if (!user) return false;

    try {
      await whatsappService.updateStatus(user.id, status, mediaUrl);
      return true;
    } catch (error) {
      toast.error('Failed to update status');
      return false;
    }
  },
}));