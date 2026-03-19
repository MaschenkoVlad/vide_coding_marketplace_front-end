'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateProfileMutation } from '../api/useUpdateProfileMutation';
import { UserAvatar } from '@/entities/user/components/UserAvatar';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';
import { Label } from '@/shared/ui/shadcn/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/ui/card';
import { Separator } from '@/shared/ui/shadcn/ui/separator';
import { Skeleton } from '@/shared/ui/shadcn/ui/skeleton';
import { Alert, AlertDescription } from '@/shared/ui/shadcn/ui/alert';
import type { UserProfile } from '@/entities/user/model/user.types';

const phoneRegex = /^\+?[1-9]\d{1,14}$|^$/;

const profileSchema = z.object({
  displayName: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user?: UserProfile;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      city: user?.city || '',
      phone: user?.phone || '',
    },
    mode: 'onChange',
  });

  const {
    formState: { errors, isDirty },
  } = form;

  const onSubmit = (data: ProfileFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      },
      onError: (error) => {
        setErrorMessage(error.message || 'Failed to update profile. Please try again.');
        setTimeout(() => setErrorMessage(null), 5000);
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <UserAvatar size="xl" src={undefined} alt={user.email} />
        <div>
          <h2 className="text-2xl font-semibold">
            {user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email}
          </h2>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm capitalize text-muted-foreground">{user.role.toLowerCase()}</p>
        </div>
      </div>

      <Separator />

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your basic account details. Email address cannot be changed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled className="bg-muted" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user.role} disabled className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information.</CardDescription>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    placeholder="How your name appears to others"
                    {...form.register('displayName')}
                  />
                  {errors.displayName && <p className="mt-1 text-sm text-destructive">{errors.displayName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Your city" {...form.register('city')} />
                  {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1234567890" {...form.register('phone')} />
                  {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button type="submit" disabled={!isDirty || isPending}>
                  {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isPending}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Display Name</Label>
                  <p className="font-medium">
                    {user.displayName || <span className="italic text-muted-foreground">Not set</span>}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">City</Label>
                  <p className="font-medium">
                    {user.city || <span className="italic text-muted-foreground">Not set</span>}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">
                    {user.phone || <span className="italic text-muted-foreground">Not set</span>}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
