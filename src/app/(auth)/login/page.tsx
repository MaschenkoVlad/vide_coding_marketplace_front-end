'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/login-form';
import { PageContainer } from '@/shared/ui/app/page-container';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';

const Fallback = () => (
  <PageContainer size="sm">
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  </PageContainer>
);

export default function LoginPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <PageContainer size="sm">
        <div className="flex min-h-screen items-center justify-center">
          <LoginForm />
        </div>
      </PageContainer>
    </Suspense>
  );
}
