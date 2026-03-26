import { authApiClient } from './auth-client';
import type {
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  Order,
} from './checkout-types';

export const checkoutAPI = {
  async createCheckoutSession(
    data: CreateCheckoutSessionRequest
  ): Promise<CreateCheckoutSessionResponse> {
    return authApiClient.post<CreateCheckoutSessionResponse>('/api/checkout/session', data);
  },

  async getOrderByCheckoutSession(sessionId: string): Promise<Order> {
    return authApiClient.get<Order>(`/api/orders/by-checkout-session/${sessionId}`);
  },

  async getOrderById(orderId: string): Promise<Order> {
    return authApiClient.get<Order>(`/api/orders/${orderId}`);
  },
};
