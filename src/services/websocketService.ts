class WebSocketService {
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private userId: string | null = null;
  private connected = false;
  private messageHandlers: Map<string, Set<(data: any) => void>> = new Map();

  initialize(userId: string) {
    this.userId = userId;
    this.connected = true;
    console.log('WebSocket initialized (mock)');
    
    // Simulate connection events
    setTimeout(() => {
      this.triggerEvent('whatsapp_connection_status', { connected: true });
    }, 1000);
  }

  private triggerEvent(eventName: string, data: any) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }

  sendMessage(contactId: string, message: string) {
    if (!this.userId) {
      console.warn('WebSocket not connected - cannot send message');
      return false;
    }

    console.log(`Sending message to ${contactId}: ${message}`);
    
    // Simulate message sent event
    setTimeout(() => {
      this.triggerEvent('whatsapp_message_status', {
        messageId: `msg_${Date.now()}`,
        status: 'sent',
        timestamp: new Date().toISOString(),
        recipient_id: contactId
      });
      
      // Simulate message delivered event
      setTimeout(() => {
        this.triggerEvent('whatsapp_message_status', {
          messageId: `msg_${Date.now()}`,
          status: 'delivered',
          timestamp: new Date().toISOString(),
          recipient_id: contactId
        });
        
        // Simulate message read event
        setTimeout(() => {
          this.triggerEvent('whatsapp_message_status', {
            messageId: `msg_${Date.now()}`,
            status: 'read',
            timestamp: new Date().toISOString(),
            recipient_id: contactId
          });
        }, 5000);
      }, 2000);
    }, 1000);
    
    return true;
  }

  // Listen for incoming messages
  onMessageReceived(callback: (data: any) => void) {
    const handler = (event: CustomEvent) => callback(event.detail);
    window.addEventListener('whatsapp_message_received', handler as EventListener);
    
    return () => {
      window.removeEventListener('whatsapp_message_received', handler as EventListener);
    };
  }

  // Listen for message status updates
  onMessageStatus(callback: (data: any) => void) {
    const handler = (event: CustomEvent) => callback(event.detail);
    window.addEventListener('whatsapp_message_status', handler as EventListener);
    
    return () => {
      window.removeEventListener('whatsapp_message_status', handler as EventListener);
    };
  }

  // Listen for connection status changes
  onConnectionStatus(callback: (data: any) => void) {
    const handler = (event: CustomEvent) => callback(event.detail);
    window.addEventListener('whatsapp_connection_status', handler as EventListener);
    
    return () => {
      window.removeEventListener('whatsapp_connection_status', handler as EventListener);
    };
  }

  disconnect() {
    this.connected = false;
    this.userId = null;
    this.reconnectAttempts = 0;
    console.log('WebSocket disconnected (mock)');
  }

  isConnected(): boolean {
    return this.connected;
  }
}

export const websocketService = new WebSocketService();