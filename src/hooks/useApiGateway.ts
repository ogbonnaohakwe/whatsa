import { useState, useEffect } from 'react';
import { apiGatewayService, ApiEndpoint, ApiKey } from '../services/apiGatewayService';
import toast from 'react-hot-toast';

export const useApiGateway = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [endpointsData, apiKeysData] = await Promise.all([
        apiGatewayService.getEndpoints(),
        apiGatewayService.getApiKeys()
      ]);
      
      setEndpoints(endpointsData);
      setApiKeys(apiKeysData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load API gateway data');
      toast.error('Failed to load API gateway data');
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async (name: string, permissions: string[]) => {
    try {
      setLoading(true);
      const result = await apiGatewayService.generateApiKey(name, permissions);
      
      if (result.success && result.apiKey) {
        setApiKeys(prev => [...prev, result.apiKey!]);
        toast.success('API key generated successfully');
        return result.apiKey;
      } else {
        throw new Error(result.error || 'Failed to generate API key');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate API key');
      toast.error(err instanceof Error ? err.message : 'Failed to generate API key');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const revokeApiKey = async (id: string) => {
    try {
      setLoading(true);
      const result = await apiGatewayService.revokeApiKey(id);
      
      if (result.success) {
        setApiKeys(prev => prev.filter(key => key.id !== id));
        toast.success('API key revoked successfully');
        return true;
      } else {
        throw new Error(result.error || 'Failed to revoke API key');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke API key');
      toast.error(err instanceof Error ? err.message : 'Failed to revoke API key');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createWebhook = async (url: string, events: string[]) => {
    try {
      setLoading(true);
      const result = await apiGatewayService.createWebhook(url, events);
      
      if (result.success) {
        toast.success('Webhook created successfully');
        return { webhookId: result.webhookId, secret: result.secret };
      } else {
        throw new Error(result.error || 'Failed to create webhook');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create webhook');
      toast.error(err instanceof Error ? err.message : 'Failed to create webhook');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const testWebhook = async (url: string) => {
    try {
      const result = await apiGatewayService.testWebhook(url);
      
      if (result.success) {
        toast.success('Webhook test successful!');
        return true;
      } else {
        throw new Error(result.error || 'Webhook test failed');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Webhook test failed');
      return false;
    }
  };

  const getApiUsage = async () => {
    try {
      return await apiGatewayService.getApiUsage();
    } catch (err) {
      toast.error('Failed to get API usage statistics');
      return [];
    }
  };

  return {
    endpoints,
    apiKeys,
    loading,
    error,
    loadData,
    generateApiKey,
    revokeApiKey,
    createWebhook,
    testWebhook,
    getApiUsage
  };
};