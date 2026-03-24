import { getRequiredEnvVar } from '@/shared/lib/env-validation';

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  details?: Record<string, unknown>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: ApiErrorResponse
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, unknown>;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = this.getApiURL();
  }

  private getApiURL(): string {
    try {
      return getRequiredEnvVar('NEXT_PUBLIC_API_URL');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `API Configuration Error: ${error.message}\n\n` +
            `This error means your frontend cannot connect to your backend server.\n` +
            `Make sure your NestJS server is running and the environment is configured.`
        );
      }
      throw error;
    }
  }

  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const responseData: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.error || responseData.message || 'Request failed',
          response.status,
          responseData
        );
      }

      return responseData.data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        throw new ApiError(error.message, 0);
      }

      throw new ApiError('Unknown error occurred', 0);
    }
  }

  async get<T>(endpoint: string, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export { ApiClient };
