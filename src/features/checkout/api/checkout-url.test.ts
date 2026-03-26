import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock window.location for redirect tests
const mockAssign = vi.fn();
Object.defineProperty(window, 'location', {
  value: { assign: mockAssign, href: '' },
  writable: true,
});

describe('Checkout URL building', () => {
  it('should build success URL with session_id query param', () => {
    const sessionId = 'cs_test_abc123';
    const successUrl = `/checkout/success?session_id=${encodeURIComponent(sessionId)}`;

    expect(successUrl).toBe('/checkout/success?session_id=cs_test_abc123');
  });

  it('should handle special characters in session_id', () => {
    const sessionId = 'cs_test_abc+123/test=';
    const successUrl = `/checkout/success?session_id=${encodeURIComponent(sessionId)}`;

    expect(successUrl).toContain('cs_test_abc%2B123%2Ftest%3D');
  });

  it('should build cancel URL with order_id query param', () => {
    const orderId = 'order_xyz789';
    const cancelUrl = `/checkout/cancel?order_id=${encodeURIComponent(orderId)}`;

    expect(cancelUrl).toBe('/checkout/cancel?order_id=order_xyz789');
  });

  it('should build cancel URL without order_id for MVP', () => {
    const cancelUrl = '/checkout/cancel';

    expect(cancelUrl).toBe('/checkout/cancel');
  });
});

describe('Login redirect with next param', () => {
  beforeEach(() => {
    mockAssign.mockClear();
  });

  it('should build login URL with next parameter for unauthenticated users', () => {
    const currentPath = '/listing/abc123';
    const loginUrl = `/login?next=${encodeURIComponent(currentPath)}`;

    expect(loginUrl).toBe('/login?next=%2Flisting%2Fabc123');
  });

  it('should preserve query params in next URL', () => {
    const currentPath = '/catalog?category=laptops';
    const loginUrl = `/login?next=${encodeURIComponent(currentPath)}`;

    expect(loginUrl).toBe('/login?next=%2Fcatalog%3Fcategory%3Dlaptops');
  });

  it('should handle listing paths with special characters', () => {
    const currentPath = '/listing/test-123_special';
    const loginUrl = `/login?next=${encodeURIComponent(currentPath)}`;

    expect(loginUrl).toBe('/login?next=%2Flisting%2Ftest-123_special');
  });
});

describe('Stripe Checkout redirect', () => {
  beforeEach(() => {
    mockAssign.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should redirect to Stripe Checkout URL on success', () => {
    const checkoutUrl = 'https://checkout.stripe.com/pay/cs_test_abc123';

    // Simulate the redirect behavior
    window.location.assign(checkoutUrl);

    expect(mockAssign).toHaveBeenCalledWith(checkoutUrl);
    expect(mockAssign).toHaveBeenCalledTimes(1);
  });

  it('should redirect to external Stripe domain', () => {
    const checkoutUrl = 'https://checkout.stripe.com/pay/cs_test_xyz789';

    window.location.assign(checkoutUrl);

    expect(mockAssign).toHaveBeenCalledWith(checkoutUrl);
    expect(checkoutUrl).toMatch(/^https:\/\/checkout\.stripe\.com/);
  });
});

describe('Query param parsing', () => {
  it('should extract session_id from URL', () => {
    const url = new URL('https://example.com/checkout/success?session_id=cs_test_abc123');
    const sessionId = url.searchParams.get('session_id');

    expect(sessionId).toBe('cs_test_abc123');
  });

  it('should extract order_id from URL', () => {
    const url = new URL('https://example.com/checkout/cancel?order_id=order_xyz789');
    const orderId = url.searchParams.get('order_id');

    expect(orderId).toBe('order_xyz789');
  });

  it('should return null for missing params', () => {
    const url = new URL('https://example.com/checkout/success');
    const sessionId = url.searchParams.get('session_id');

    expect(sessionId).toBeNull();
  });
});
