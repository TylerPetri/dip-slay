'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface ProfileTabsProps {
  activeTab: 'created' | 'voted' | 'activity'
  onTabChange: (tabs: 'created' | 'voted' | 'activity') => void
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const t = useTranslations('Profile.Tabs');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Sync tab change to URL query param (no reload)
  const handleTabChange = (newTab: ProfileTabsProps["activeTab"]) => {
    onTabChange(newTab);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('tab', newTab);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const tabs = [
    { id: 'created', label: t('created') },
    { id: 'voted',   label: t('voted') },
    { id: 'activity', label: t('activity') },
  ];

  return (
    <nav className="profile-tabs">
      <div className="tabs-list">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as ProfileTabsProps["activeTab"])}
              className={`tab-button ${isActive ? 'tab-button--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}