import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  profile: {
    id: string;
    username: string;
    preferred_mode: 'slayer' | 'watcher' | null;
    // add more fields later (avatar_url, rank, etc.)
  } | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
  updatePreferredMode: (mode: 'slayer' | 'watcher') => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: true,
      error: null,

      setUser: (user) => {
        set({ user, isLoading: false });
        // Trigger profile fetch if user exists
        if (user) get().fetchProfile();
      },

      fetchProfile: async () => {
        const { user } = get();
        if (!user) return;

        set({ isLoading: true, error: null });

        try {
          const { data, error } = await supabase
            .from('users')
            .select('id, username, preferred_mode')
            .eq('id', user.id)
            .single();

          if (error) throw error;

          set({ profile: data, isLoading: false });
        } catch (err: any) {
          set({
            error: err.message || 'Failed to load profile',
            isLoading: false,
          });
        }
      },

      updatePreferredMode: async (mode) => {
        const { user } = get();
        if (!user) return;

        try {
          const { error } = await supabase
            .from('users')
            .update({ preferred_mode: mode })
            .eq('id', user.id);

          if (error) throw error;

          set((state) => ({
            profile: state.profile ? { ...state.profile, preferred_mode: mode } : null,
          }));

          // Also update cookie for consistency
          Cookies.set('ds_mode', mode, { expires: 30, path: '/' });
        } catch (err: any) {
          console.error('Failed to update mode:', err);
          // Optional: toast.error here
        }
      },

      logout: async () => {
        set({ isLoading: true });
        await supabase.auth.signOut();
        Cookies.remove('ds_mode');
        set({ user: null, profile: null, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, profile: state.profile }), // don't persist loading/error
    }
  )
);