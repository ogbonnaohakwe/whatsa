import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

class WebSocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;

  initialize(userId: string) {
    this.userId = userId;
    this.socket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      query: { userId }
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('message_received', (data) => {
      // Handle incoming message
      console.log('New message received:', data);
    });

    this.socket.on('message_status', (data) => {
      // Handle message status updates
      console.log('Message status update:', data);
    });

    this.socket.on('connection_status', (data) => {
      // Handle WhatsApp connection status changes
      console.log('Connection status:', data);
    });
  }

  sendMessage(contactId: string, message: string) {
    if (!this.socket || !this.userId) return;

    this.socket.emit('send_message', {
      userId: this.userId,
      contactId,
      message
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
    }
  }
}

export const websocketService = new WebSocketService();