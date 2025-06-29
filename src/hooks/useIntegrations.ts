import { useState, useEffect } from 'react';
import { integrationService, IntegrationConfig } from '../services/integrationService';
import toast from 'react-hot-toast';

export const useIntegrations = () => {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await integrationService.getAll();
      setIntegrations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load integrations');
      toast.error('Failed to load integrations');
    } finally {
      setLoading(false);
    }
  };

  const connectIntegration = async (config: Partial<IntegrationConfig>) => {
    try {
      setLoading(true);
      const result = await integrationService.connect(config);
      
      if (result.success && result.integration) {
        setIntegrations(prev => [...prev, result.integration!]);
        toast.success(`${config.name} connected successfully!`);
        return true;
      } else {
        throw new Error(result.error || 'Failed to connect integration');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect integration');
      toast.error(err instanceof Error ? err.message : 'Failed to connect integration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const disconnectIntegration = async (id: string) => {
    try {
      setLoading(true);
      const result = await integrationService.disconnect(id);
      
      if (result.success) {
        setIntegrations(prev => 
          prev.map(integration => 
            integration.id === id 
              ? { ...integration, status: 'inactive' } 
              : integration
          )
        );
        toast.success('Integration disconnected successfully');
        return true;
      } else {
        throw new Error(result.error || 'Failed to disconnect integration');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect integration');
      toast.error(err instanceof Error ? err.message : 'Failed to disconnect integration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const testIntegration = async (id: string) => {
    try {
      const result = await integrationService.testConnection(id);
      
      if (result.success) {
        toast.success('Integration test successful!');
        return true;
      } else {
        throw new Error(result.error || 'Integration test failed');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Integration test failed');
      return false;
    }
  };

  const syncIntegration = async (id: string) => {
    try {
      setLoading(true);
      const result = await integrationService.syncData(id);
      
      if (result.success) {
        // Update last sync time
        setIntegrations(prev => 
          prev.map(integration => 
            integration.id === id 
              ? { ...integration, lastSync: new Date() } 
              : integration
          )
        );
        toast.success('Data synchronized successfully');
        return true;
      } else {
        throw new Error(result.error || 'Failed to sync data');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to sync data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    integrations,
    loading,
    error,
    loadIntegrations,
    connectIntegration,
    disconnectIntegration,
    testIntegration,
    syncIntegration
  };
};