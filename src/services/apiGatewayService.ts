import toast from 'react-hot-toast';

export interface ApiEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  requiresAuth: boolean;
  rateLimit: number;
}

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  createdAt: Date;
  expiresAt?: Date;
  lastUsed?: Date;
  permissions: string[];
}

class ApiGatewayService {
  private endpoints: ApiEndpoint[] = [
    {
      id: 'get-contacts',
      path: '/api/contacts',
      method: 'GET',
      description: 'Get all contacts',
      requiresAuth: true,
      rateLimit: 100
    },
    {
      id: 'create-contact',
      path: '/api/contacts',
      method: 'POST',
      description: 'Create a new contact',
      requiresAuth: true,
      rateLimit: 50
    },
    {
      id: 'send-message',
      path: '/api/messages',
      method: 'POST',
      description: 'Send a message',
      requiresAuth: true,
      rateLimit: 200
    },
    {
      id: 'get-automations',
      path: '/api/automations',
      method: 'GET',
      description: 'Get all automations',
      requiresAuth: true,
      rateLimit: 100
    },
    {
      id: 'webhook-receiver',
      path: '/api/webhooks/receive',
      method: 'POST',
      description: 'Receive webhook events',
      requiresAuth: false,
      rateLimit: 500
    }
  ];
  
  private apiKeys: Map<string, ApiKey> = new Map();
  
  // Get all API endpoints
  async getEndpoints(): Promise<ApiEndpoint[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.endpoints;
  }
  
  // Generate a new API key
  async generateApiKey(name: string, permissions: string[]): Promise<{ success: boolean; apiKey?: ApiKey; error?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate random API key
      const key = `waa_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      
      const apiKey: ApiKey = {
        id: Date.now().toString(),
        key,
        name,
        createdAt: new Date(),
        permissions
      };
      
      this.apiKeys.set(apiKey.id, apiKey);
      
      return { success: true, apiKey };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate API key' 
      };
    }
  }
  
  // Revoke an API key
  async revokeApiKey(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.apiKeys.has(id)) {
        throw new Error('API key not found');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      this.apiKeys.delete(id);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to revoke API key' 
      };
    }
  }
  
  // Get all API keys
  async getApiKeys(): Promise<ApiKey[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Array.from(this.apiKeys.values());
  }
  
  // Create a new webhook
  async createWebhook(url: string, events: string[]): Promise<{ success: boolean; webhookId?: string; secret?: string; error?: string }> {
    try {
      // Validate URL
      if (!url || !url.startsWith('http')) {
        throw new Error('Invalid webhook URL');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Generate webhook ID and secret
      const webhookId = `wh_${Date.now()}`;
      const secret = `whsec_${Math.random().toString(36).substring(2, 15)}`;
      
      return { success: true, webhookId, secret };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create webhook' 
      };
    }
  }
  
  // Test a webhook
  async testWebhook(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Validate URL
      if (!url || !url.startsWith('http')) {
        throw new Error('Invalid webhook URL');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 80% success rate for testing
      if (Math.random() > 0.8) {
        throw new Error('Webhook test failed: endpoint not reachable');
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to test webhook' 
      };
    }
  }
  
  // Get API usage statistics
  async getApiUsage(): Promise<{ endpoint: string; calls: number; errors: number }[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock usage data
    return this.endpoints.map(endpoint => ({
      endpoint: endpoint.path,
      calls: Math.floor(Math.random() * 1000),
      errors: Math.floor(Math.random() * 50)
    }));
  }
}

export const apiGatewayService = new ApiGatewayService();