'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface LeaderboardTabsProps {
  activeTab: 'dips' | 'cooks'
  onTabChange: (tab: 'dips' | 'cooks') => void
}

export default function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  const t = useTranslations('Leaderboard.Tabs');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleTabChange = (newTab: 'dips' | 'cooks') => {
    onTabChange(newTab);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('tab', newTab);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <nav className="leaderboard-tabs">
      <div className="tabs-inner">
        <button
          onClick={() => handleTabChange('dips')}
          className={`tab-button ${activeTab === 'dips' ? 'tab-button--active' : ''}`}
          aria-current={activeTab === 'dips' ? 'page' : undefined}
        >
          {t('dips')}
        </button>

        <button
          onClick={() => handleTabChange('cooks')}
          className={`tab-button ${activeTab === 'cooks' ? 'tab-button--active' : ''}`}
          aria-current={activeTab === 'cooks' ? 'page' : undefined}
        >
          {t('cooks')}
        </button>
      </div>
    </nav>
  );
}