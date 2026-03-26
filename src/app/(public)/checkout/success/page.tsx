'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';
import { Alert, AlertDescription } from '@/shared/ui/shadcn/ui/alert';
import { useOrderByCheckoutSessionQuery } from '@/features/checkout/api/useOrderStatusQuery';
import { CheckCircle, Loader2, XCircle, Clock, ArrowLeft, Package } from 'lucide-react';

// Maximum time to poll for (60 seconds)
const MAX_POLLING_DURATION = 60000;
// Polling interval (3 seconds)
const POLL_INTERVAL = 3000;

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [pollingElapsed, setPollingElapsed] = useState(0);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  const { data: order, isLoading, error } = useOrderByCheckoutSessionQuery(sessionId);

  // Track polling duration
  useEffect(() => {
    if (!sessionId || order?.status === 'PAID' || order?.status === 'FAILED') {
      return;
    }

    const interval = setInterval(() => {
      setPollingElapsed((prev) => {
        const next = prev + POLL_INTERVAL;
        if (next >= MAX_POLLING_DURATION) {
          setHasTimedOut(true);
          clearInterval(interval);
        }
        return next;
      });
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [sessionId, order?.status]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="mx-auto h-16 w-16 rounded-full" />
              <Skeleton className="mx-auto mt-4 h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="mt-4">Order Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>
                  {error instanceof Error ? error.message : 'Failed to load order status'}
                </AlertDescription>
              </Alert>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/catalog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Catalog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Determine status display
  const getStatusDisplay = () => {
    if (!order) {
      return {
        icon: <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />,
        title: 'Processing Payment',
        message: 'We are confirming your payment. Please wait a moment...',
        bgColor: 'bg-muted',
      };
    }

    switch (order.status) {
      case 'PAID':
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          title: 'Payment Successful!',
          message: 'Your order has been confirmed. You will receive a confirmation email shortly.',
          bgColor: 'bg-green-100',
          textColor: 'text-green-900',
        };
      case 'FAILED':
        return {
          icon: <XCircle className="h-8 w-8 text-destructive" />,
          title: 'Payment Failed',
          message: 'We could not process your payment. Please try again or contact support.',
          bgColor: 'bg-destructive/10',
        };
      case 'PENDING_PAYMENT':
      default:
        if (hasTimedOut) {
          return {
            icon: <Clock className="h-8 w-8 text-amber-600" />,
            title: 'Payment Pending',
            message:
              'Your payment is still being processed. Please check your orders page later for the final status.',
            bgColor: 'bg-amber-100',
          };
        }
        return {
          icon: <Loader2 className="h-8 w-8 animate-spin text-blue-600" />,
          title: 'Processing Payment',
          message: 'We are confirming your payment. This usually takes a few seconds...',
          bgColor: 'bg-blue-100',
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${status.bgColor}`}>
              {status.icon}
            </div>
            <CardTitle className="mt-4">{status.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">{status.message}</p>

            {order && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-mono text-sm">{order.id}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-semibold">
                    ${order.amount.toFixed(2)} {order.currency.toUpperCase()}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {order?.status === 'PAID' && (
                <Button asChild>
                  <Link href={`/orders/${order.id}`}>
                    <Package className="mr-2 h-4 w-4" />
                    View Order Details
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/catalog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {order?.status === 'PENDING_PAYMENT' && !hasTimedOut && (
              <p className="text-center text-xs text-muted-foreground">
                Checking payment status... ({Math.ceil((MAX_POLLING_DURATION - pollingElapsed) / 1000)}s remaining)
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
