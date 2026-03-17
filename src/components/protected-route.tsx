'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from '../shared/hooks/use-auth';
import { useCurrentUser } from '../shared/hooks/use-current-user';
import { Skeleton } from '../shared/ui/shadcn/ui/skeleton';
import { Alert, AlertDescription } from '../shared/ui/shadcn/ui/alert';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'BUYER' | 'SELLER' | 'ADMIN';
  fallbackPath?: string;
}

export function ProtectedRoute({ children, requiredRole, fallbackPath = '/login' }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthState();
  const { user, isLoading: userLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      const redirectUrl = `${fallbackPath}?next=${encodeURIComponent(currentPath)}`;
      router.push(redirectUrl);
      return;
    }
  }, [authLoading, isAuthenticated, router, fallbackPath]);

  if (authLoading || userLoading) {
    return (
      <div className="container mx-auto space-y-4 py-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load user information. Please try refreshing the page or log in again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertDescription>Access denied. This page requires {requiredRole} privileges.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
