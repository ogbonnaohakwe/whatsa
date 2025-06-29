class WebSocketService {
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  initialize(userId: string) {
    console.log('Demo mode: Simulating WebSocket connection');
    // In demo mode, we don't actually connect to any WebSocket server
  }

  // Listen for incoming messages
  onMessageReceived(callback: (data: any) => void) {
    // In demo mode, we don't actually listen for messages
    return () => {};
  }

  // Listen for message status updates
  onMessageStatus(callback: (data: any) => void) {
    // In demo mode, we don't actually listen for status updates
    return () => {};
  }

  // Listen for connection status changes
  onConnectionStatus(callback: (data: any) => void) {
    // In demo mode, we don't actually listen for connection status
    return () => {};
  }

  disconnect() {
    console.log('Demo mode: Simulating WebSocket disconnection');
  }

  isConnected(): boolean {
    // In demo mode, we simulate being connected
    return true;
  }
}

export const websocketService = new WebSocketService();