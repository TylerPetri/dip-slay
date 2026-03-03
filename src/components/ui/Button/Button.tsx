'use client';

import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useRouter } from '@/i18n/navigation';
import styles from './Button.module.scss';

type ButtonVariant = 'slayer' | 'watcher' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  mode?: 'slayer' | 'watcher';           // triggers cookie + navigation
  href?: string;                         // optional (for future <a> or prefetch hints)
  children: React.ReactNode;
} & Omit<
  ComponentPropsWithoutRef<'button'>,
  'type' // we hardcode type="button" below
>;

// We could also extend HTMLAnchorElement if you ever want <a> support,
// but for now button is simpler and more appropriate for this use-case.

export default function Button({
  variant = 'slayer',
  size = 'medium',
  mode,
  href,
  className,
  children,
  onClick,
  ...restProps
}: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Run any custom onClick passed from parent
    if (onClick) {
      onClick(e);
    }

    // If this is a mode-selection button
    if (mode) {
      Cookies.set('ds_mode', mode, {
        expires: 30,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      router.push(`/${mode}`);

      // Prevent any default behavior (though unlikely on <button>)
      e.preventDefault();
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        styles.btn,
        styles[`variant--${variant}`],
        styles[`size--${size}`],
        className
      )}
      onClick={handleClick}
      {...restProps}
    >
      {children}
    </button>
  );
}