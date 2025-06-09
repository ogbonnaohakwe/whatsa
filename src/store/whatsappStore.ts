import { create } from 'zustand';
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
      // For demo users, simulate WhatsApp connection
      if (user.email.includes('demo') || user.email.includes('admin') || user.email.includes('business')) {
        set({ 
          isConnected: true, 
          status: 'connected',
          phoneNumber: '+1 (555) 123-4567'
        });
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
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
      // Simulate QR code generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      
      set({ 
        connecting: false,
        qrCode: mockQRCode,
      });
      
      // Simulate successful connection after QR scan
      setTimeout(() => {
        set({
          isConnected: true,
          status: 'connected',
          phoneNumber: '+1 (555) 123-4567',
          qrCode: null
        });
        toast.success('WhatsApp connected via QR code!');
      }, 5000);
      
      return mockQRCode;
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
      // Simulate disconnection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Message sent successfully!');
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
      // Simulate status update
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Status updated successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to update status');
      return false;
    }
  },
}));