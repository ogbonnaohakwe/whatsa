import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  initialize(userId: string) {
    // Get WebSocket URL from environment variables
    const wsUrl = import.meta.env.VITE_WEBSOCKET_URL;
    
    if (!wsUrl) {
      console.error('WebSocket URL not configured. Please check your .env file.');
      return;
    }

    this.userId = userId;
    this.socket = io(wsUrl, {
      query: { userId },
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      
      // Authenticate user
      if (this.userId) {
        this.socket?.emit('authenticate', this.userId);
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      
      // Auto-reconnect if disconnected unexpectedly
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        this.reconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnect();
    });

    this.socket.on('message_received', (data) => {
      console.log('New message received:', data);
      // Dispatch custom event for components to listen to
      window.dispatchEvent(new CustomEvent('whatsapp_message_received', { detail: data }));
    });

    this.socket.on('message_status', (data) => {
      console.log('Message status update:', data);
      window.dispatchEvent(new CustomEvent('whatsapp_message_status', { detail: data }));
    });

    this.socket.on('connection_status', (data) => {
      console.log('WhatsApp connection status:', data);
      window.dispatchEvent(new CustomEvent('whatsapp_connection_status', { detail: data }));
    });

    this.socket.on('message_error', (data) => {
      console.error('Message error:', data);
      window.dispatchEvent(new CustomEvent('whatsapp_message_error', { detail: data }));
    });
  }

  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      if (this.socket) {
        this.socket.connect();
      }
    }, delay);
  }

  sendMessage(contactId: string, message: string) {
    if (!this.socket || !this.userId) {
      console.error('WebSocket not connected - cannot send message');
      return false;
    }

    this.socket.emit('send_message', {
      userId: this.userId,
      contactId,
      message
    });
    
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
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
      this.reconnectAttempts = 0;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const websocketService = new WebSocketService();