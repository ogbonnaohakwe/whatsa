import toast from 'react-hot-toast';

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'oauth' | 'database';
  credentials: Record<string, string>;
  endpoint?: string;
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
}

class IntegrationService {
  private integrations: Map<string, IntegrationConfig> = new Map();

  // Connect to an integration
  async connect(config: Partial<IntegrationConfig>): Promise<{ success: boolean; integration?: IntegrationConfig; error?: string }> {
    try {
      // Validate required fields
      if (!config.id || !config.name || !config.type) {
        throw new Error('Missing required integration configuration');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const integration: IntegrationConfig = {
        id: config.id,
        name: config.name,
        type: config.type,
        credentials: config.credentials || {},
        endpoint: config.endpoint,
        status: 'active',
        lastSync: new Date()
      };
      
      // Store integration
      this.integrations.set(integration.id, integration);
      
      return { success: true, integration };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect integration' 
      };
    }
  }
  
  // Disconnect an integration
  async disconnect(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.integrations.has(id)) {
        throw new Error('Integration not found');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update status to inactive
      const integration = this.integrations.get(id);
      if (integration) {
        integration.status = 'inactive';
        this.integrations.set(id, integration);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to disconnect integration' 
      };
    }
  }
  
  // Get all integrations
  async getAll(): Promise<IntegrationConfig[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Array.from(this.integrations.values());
  }
  
  // Get integration by ID
  async getById(id: string): Promise<IntegrationConfig | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.integrations.get(id) || null;
  }
  
  // Test integration connection
  async testConnection(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.integrations.has(id)) {
        throw new Error('Integration not found');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // 90% success rate for testing
      if (Math.random() > 0.9) {
        throw new Error('Connection test failed');
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to test integration' 
      };
    }
  }
  
  // Sync data with integration
  async syncData(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.integrations.has(id)) {
        throw new Error('Integration not found');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update last sync time
      const integration = this.integrations.get(id);
      if (integration) {
        integration.lastSync = new Date();
        this.integrations.set(id, integration);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to sync data' 
      };
    }
  }
}

export const integrationService = new IntegrationService();