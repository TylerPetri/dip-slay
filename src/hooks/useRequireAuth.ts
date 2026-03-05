'use client';

import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';

type RequireAuthOptions = {
  onSuccess?: () => void;
  redirectAfter?: string;
};

/**
 * Hook to require authentication before running an action.
 * Opens AuthModal if not logged in.
 */
export function useRequireAuth() {
  const { user, profile } = useAuthStore();
  const { openAuthModal } = useUIStore();

  const requireAuth = (action: () => void, options: RequireAuthOptions = {}) => {
    if (user && profile) {
      action();
    } else {
      openAuthModal({
        onSuccess: () => {
          action();
        },
        redirectAfter: options.redirectAfter,
      });
    }
  };

  return { requireAuth, isAuthenticated: !!user };
}