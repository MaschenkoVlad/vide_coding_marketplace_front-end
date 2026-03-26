// Checkout-related API types

export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'FAILED' | 'CANCELLED';

export interface CreateCheckoutSessionRequest {
  listingId: string;
}

export interface CreateCheckoutSessionResponse {
  checkoutUrl: string;
  orderId: string;
}

export interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  status: OrderStatus;
  amount: number;
  currency: string;
  checkoutSessionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetOrderByCheckoutSessionResponse {
  order: Order;
}

export interface CheckoutErrorResponse {
  error: string;
  message: string;
}
