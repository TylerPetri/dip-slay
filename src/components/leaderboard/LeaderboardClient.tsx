'use client';

import { useState } from 'react';
import LeaderboardTabs from '@/components/leaderboard/LeaderboardTabs';
import TopDipsLeaderboard from '@/components/leaderboard/TopDipsLeaderboard';
import TopCooksLeaderboard from '@/components/leaderboard/TopCooksLeaderboard';

export default function LeaderboardClient() {
  const [activeTab, setActiveTab] = useState<'dips' | 'cooks'>('dips');

  return (
    <>
      <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="leaderboard-content">
        {activeTab === 'cooks' ? <TopCooksLeaderboard /> : <TopDipsLeaderboard />}
      </div>
    </>
  );
}