import { useEffect, useState } from 'react';
import { useWhatsappStore } from '../store/whatsappStore';
import { useAuthStore } from '../store/authStore';
import { whatsappService } from '../services/whatsappService';
import { websocketService } from '../services/websocketService';

export const useWhatsapp = () => {
  const { user } = useAuthStore();
  const whatsapp = useWhatsappStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      initializeWhatsapp();
    }
  }, [user]);

  const initializeWhatsapp = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const isConnected = await whatsappService.checkConnection(user.id);
      
      if (isConnected) {
        websocketService.initialize(user.id);
        whatsapp.initialize();
      }
    } catch (error) {
      console.error('Failed to initialize WhatsApp:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...whatsapp,
    loading,
    initialized: !loading && whatsapp.isConnected,
  };
};