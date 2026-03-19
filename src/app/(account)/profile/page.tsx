import { PageContainer } from '@/shared/ui/app/page-container';
import { ProtectedRoute } from '@/components/protected-route';
import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { useCurrentUser } from '@/shared/hooks/use-current-user';

export default function ProfilePage() {
  const { user } = useCurrentUser();

  return (
    <ProtectedRoute>
      <PageContainer>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Manage your account and marketplace activity</p>
          </div>

          <ProfileForm user={user} />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}
