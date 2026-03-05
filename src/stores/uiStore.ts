import { create } from 'zustand';

interface AuthModalOptions {
  onSuccess?: () => void;
  redirectAfter?: string;
}

type Toast = {
  id: string;
  message: string;
  variant?: 'success' | 'error' | 'info';
};

interface UIState {
toasts: Toast[];
  addToast: (message: string, variant?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  authModal: {
    isOpen: boolean;
    options?: AuthModalOptions;
  };
  openAuthModal: (options?: AuthModalOptions) => void;
  closeAuthModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  authModal: {
    isOpen: false,
    options: undefined,
  },

  openAuthModal: (options) => {
    set({
      authModal: {
        isOpen: true,
        options,
      },
    });
  },

  closeAuthModal: () => {
    set({
      authModal: {
        isOpen: false,
        options: undefined,
      },
    });
  },

  toasts: [],

  addToast: (message, variant = 'info') => {
    const id = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant }],
    }));

    // Auto-remove after 4 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));