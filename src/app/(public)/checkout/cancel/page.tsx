'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/shadcn/ui/card';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Alert, AlertDescription } from '@/shared/ui/shadcn/ui/alert';
import { useOrderByIdQuery } from '@/features/checkout/api/useOrderStatusQuery';
import { XCircle, ArrowLeft, ShoppingCart, AlertTriangle } from 'lucide-react';

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const { data: order, isLoading } = useOrderByIdQuery(orderId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <XCircle className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="mt-4">Checkout Cancelled</CardTitle>
            <CardDescription>Your payment was not completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderId && isLoading && (
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            )}

            {orderId && order && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Order <strong>{order.id}</strong> has been cancelled. You can try purchasing again
                  anytime.
                </AlertDescription>
              </Alert>
            )}

            <p className="text-center text-muted-foreground">
              You can return to the product page and try again, or continue browsing our catalog.
            </p>

            <div className="flex flex-col gap-2">
              {/* If we came from a specific listing, show a back button */}
              <Button asChild>
                <Link href="/catalog">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Browse Catalog
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>

            <div className="border-t pt-4">
              <p className="text-center text-xs text-muted-foreground">
                Need help? Contact our{' '}
                <Link href="/support" className="underline hover:text-primary">
                  support team
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
