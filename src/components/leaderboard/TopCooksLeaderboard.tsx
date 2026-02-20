'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from '../ui/Button';
import SlayMeter from '../ui/SlayMeter';

interface CookEntry {
  rank: number;
  handle: string;
  avatarUrl: string;
  totalDips: number;
  totalVotes: number;
  slayScore: number;
}

const mockTopCooks: CookEntry[] = [
  {
    rank: 1,
    handle: '@spicyking',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    totalDips: 18,
    totalVotes: 5892,
    slayScore: 94,
  },
  {
    rank: 2,
    handle: '@garlicguru',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    totalDips: 14,
    totalVotes: 4217,
    slayScore: 89,
  },
  {
    rank: 3,
    handle: '@avolover',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    totalDips: 11,
    totalVotes: 3789,
    slayScore: 86,
  },
  {
    rank: 4,
    handle: '@cheesedreamer',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    totalDips: 9,
    totalVotes: 3124,
    slayScore: 82,
  },
];

export default function TopCooksLeaderboard() {
  const t = useTranslations('Leaderboard.Cooks');

  return (
    <div className="top-cooks-leaderboard">
      <h2 className="leaderboard-section-title">{t('title')}</h2>

      <div className="cooks-grid">
        {mockTopCooks.map((cook) => (
          <Link
            key={cook.handle}
            href={`/cooks/${cook.handle.slice(1)}`} // /cooks/spicyking
            className="cook-leaderboard-card"
          >
            <div className="cook-rank">
              {cook.rank <= 3 ? (
                <span className={`rank-medal rank-${cook.rank}`}>
                  {cook.rank === 1 ? '🥇' : cook.rank === 2 ? '🥈' : '🥉'}
                </span>
              ) : (
                <span className="rank-number">#{cook.rank}</span>
              )}
            </div>

            <div className="cook-avatar-wrapper">
              <Image
                src={cook.avatarUrl}
                alt={`${cook.handle} avatar`}
                width={80}
                height={80}
                className="cook-avatar"
              />
            </div>

            <div className="cook-details">
              <h3 className="cook-handle">{cook.handle}</h3>

              <div className="cook-stats">
                <div className="stat-item">
                  <span className="stat-label">{t('dips')}</span>
                  <span className="stat-value">{cook.totalDips}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">{t('votes')}</span>
                  <span className="stat-value">{cook.totalVotes.toLocaleString()}</span>
                </div>

                <div className="stat-item">
                  <span className="stat-label">{t('slayScore')}</span>
                  <SlayMeter slayScore={cook.slayScore}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="load-more">
        <Button size="large">
          {t('loadMore')}
        </Button>
      </div>
    </div>
  );
}