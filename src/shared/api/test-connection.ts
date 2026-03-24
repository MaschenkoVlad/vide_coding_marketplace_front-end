// Test API connection
import { useState } from 'react';
import { apiClient } from '@/shared/api/client';

// Test function to verify connection to NestJS server
export async function testApiConnection() {
  try {
    // Test a simple endpoint - adjust based on your NestJS endpoints
    const response = (await apiClient.get('/health')) || (await apiClient.get('/'));
    console.log('✅ API Connection successful:', response);
    return response;
  } catch (error) {
    console.error('❌ API Connection failed:', error);
    throw error;
  }
}

// Example usage in a component
export function useApiTest() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      await testApiConnection();
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      setIsConnected(false);
    }
  };

  return { isConnected, error, testConnection };
}
