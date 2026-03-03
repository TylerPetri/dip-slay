'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import styles from './Header.module.scss';
import Button from '@/components/ui/Button/Button';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [mode, setMode] = useState<'slayer' | 'watcher' | null>(null);

  useEffect(() => {
    const stored = Cookies.get('ds_mode') as 'slayer' | 'watcher' | undefined;

    // Derive from pathname if cookie not set or mismatched
    let derivedMode: 'slayer' | 'watcher' | null = null;
    if (pathname.startsWith('/slayer') || pathname.startsWith('/en/slayer') || pathname.startsWith('/fr/slayer')) {
      derivedMode = 'slayer';
    } else if (pathname.startsWith('/watcher') || pathname.startsWith('/en/watcher') || pathname.startsWith('/fr/watcher')) {
      derivedMode = 'watcher';
    }

    const finalMode = stored || derivedMode;
    setMode(finalMode || null);
  }, [pathname]);

  const oppositeMode = mode === 'slayer' ? 'watcher' : 'slayer';
  const isSlayer = mode === 'slayer';

  const handleSwitchMode = () => {
    if (!oppositeMode) return;

    Cookies.set('ds_mode', oppositeMode, {
      expires: 30,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // Clear any query params if needed, keep locale
    router.push(`/${oppositeMode}`);
  };

  const handleLogout = async () => {
    Cookies.remove('ds_mode', { path: '/' });
    // await supabase.auth.signOut().catch(console.error);
    router.push('/');
  };

  // Hide on landing
  if (!mode || pathname === '/' || pathname === '/en' || pathname === '/fr') {
    return null;
  }

  return (
    <header className={clsx(styles.header, isSlayer ? styles.slayer : styles.watcher)}>
      <div className={styles.inner}>
        <div className={styles.modeBadge}>
          <span className={styles.modeText}>
            {isSlayer ? 'Slayer Mode' : 'Watcher Mode'}
          </span>
        </div>

        <Button
          variant={isSlayer ? 'watcher' : 'slayer'}
          size="medium"
          onClick={handleSwitchMode}
          className={styles.switchButton}
        >
          Switch to {oppositeMode === 'slayer' ? 'Slayer' : 'Watcher'}
        </Button>

        <Button
          variant="outline"
          size="small"
          onClick={handleLogout}
          className={styles.logout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}