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
  mode?: 'slayer' | 'watcher';
  href?: string; 
  children: React.ReactNode;
} & Omit<
  ComponentPropsWithoutRef<'button'>,
  'type'
>;

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
    if (onClick) {
      onClick(e);
    }

    if (mode) {
      Cookies.set('ds_mode', mode, {
        expires: 30,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      router.push(`/${mode}`);

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