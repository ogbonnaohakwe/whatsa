class WhatsAppBusinessService {
  // Initialize WhatsApp Business API
  async initialize(): Promise<boolean> {
    console.log('Demo mode: Simulating WhatsApp connection');
    // Simulate successful connection after a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  }

  // Send a text message
  async sendTextMessage(to: string, message: string): Promise<string | null> {
    console.log('Demo mode: Simulating sending message to', to);
    // Simulate successful message sending
    await new Promise(resolve => setTimeout(resolve, 800));
    return `demo_msg_${Date.now()}`;
  }

  // Send an image message
  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<string | null> {
    console.log('Demo mode: Simulating sending image to', to);
    // Simulate successful message sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `demo_img_${Date.now()}`;
  }

  // Send a template message
  async sendTemplateMessage(
    to: string, 
    templateName: string, 
    languageCode: string = 'en_US',
    components?: any[]
  ): Promise<string | null> {
    console.log('Demo mode: Simulating sending template to', to);
    // Simulate successful message sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `demo_template_${Date.now()}`;
  }

  // Get message status
  async getMessageStatus(messageId: string): Promise<any> {
    console.log('Demo mode: Simulating message status for', messageId);
    // Simulate message status
    return {
      id: messageId,
      status: 'delivered',
      timestamp: new Date().toISOString()
    };
  }

  // Mark message as read
  async markMessageAsRead(messageId: string): Promise<boolean> {
    console.log('Demo mode: Simulating marking message as read', messageId);
    return true;
  }

  // Format phone number for WhatsApp API
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('1') && cleaned.length === 10) {
      return '1' + cleaned; // Assume US number
    }
    
    return cleaned;
  }
}

export const whatsappBusinessService = new WhatsAppBusinessService();