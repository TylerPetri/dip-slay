'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="auth-modal-overlay" />

        {/* Modal content */}
        <Dialog.Content className="auth-modal-content">
          {/* Close button */}
          <Dialog.Close asChild>
            <button className="auth-modal-close" aria-label="Close modal">
              <X size={24} />
            </button>
          </Dialog.Close>

          {/* Header */}
          <Dialog.Title className="auth-modal-title">
            Join the Dip Slayers
          </Dialog.Title>
          <Dialog.Description className="auth-modal-subtitle">
            Sign in or create an account to upload your dips, vote, and compete on the leaderboard.
          </Dialog.Description>

          {/* Social login buttons */}
          <div className="auth-modal-social-buttons">
            <Button variant="outline" size="large" className="auth-social-btn">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                {/* Simplified X/Twitter icon SVG */}
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Continue with X
            </Button>

            <Button variant="outline" size="large" className="auth-social-btn">
              <svg className="social-icon" viewBox="0 0 24 24">
                {/* Google icon SVG */}
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.09-4.47 3.09-7.99z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.35-2.63c-1.01.68-2.29 1.08-3.93 1.08-3.02 0-5.58-2.04-6.49-4.79H.96v2.67C2.75 20.99 6.87 23 12 23z" />
                <path fill="#FBBC05" d="M5.51 14.21c-.23-.68-.36-1.41-.36-2.21s.13-1.53.36-2.21V7.34H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.66l4.55-2.45z" />
                <path fill="#EA4335" d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.97 0 12 0 6.87 0 2.75 2.01.96 4.96l4.55 2.45C6.42 5.02 9.02 4.98 12 4.98z" />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="auth-modal-divider">
            <span>or</span>
          </div>

          {/* Email option */}
          <Button variant="primary" size="large" className="w-full mb-6">
            Sign in with Email
          </Button>

          {/* Footer legal text */}
          <p className="auth-modal-legal">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-primary">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}