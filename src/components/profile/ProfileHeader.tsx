'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { User } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    handle: string;
    displayName?: string;
    avatarUrl?: string;
    bio?: string;
    totalDips: number;
    totalVotes: number;
    slayScore: number;
    rank?: number;
    isOwnProfile?: boolean;
    isFollowing?: boolean;
  };
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const t = useTranslations('Profile.Header');

  const displayName = user.displayName || user.handle;

  return (
    <header className="profile-header">
      <div className="profile-hero-bg" />

      <div className="profile-container">
        <div className="profile-avatar-wrapper">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`${displayName} avatar`}
              width={160}
              height={160}
              className="profile-avatar"
              priority
            />
          ) : (
            <div className="profile-avatar-placeholder">
              <User size={80} />
            </div>
          )}
        </div>

        {/* Name & Handle */}
        <h1 className="profile-name">{displayName}</h1>
        <p className="profile-handle">{user.handle}</p>

        {/* Bio */}
        {user.bio && <p className="profile-bio">{user.bio}</p>}

        <div className="profile-stats">
          {user.rank && (
            <div className={`stat-box stat-rank stat-rank-${user.rank}`}>
              <span className="stat-value">
                {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
              </span>
              <span className="stat-label">{t('stats.rank')}</span>
            </div>
          )}

          <div className="stat-box">
            <span className="stat-value">{user.totalDips}</span>
            <span className="stat-label">{t('stats.dips')}</span>
          </div>

          <div className="stat-box">
            <span className="stat-value">{user.totalVotes.toLocaleString()}</span>
            <span className="stat-label">{t('stats.votes')}</span>
          </div>

          <div className="stat-box stat-slay">
            <div className="slay-progress">
              <div
                className="slay-fill"
                style={{ width: `${user.slayScore}%` }}
              />
              <span className="slay-score">{user.slayScore}%</span>
            </div>
            <span className="stat-label">{t('stats.slayScore')}</span>
          </div>
        </div>

        <div className="profile-actions">
          {user.isOwnProfile ? (
            <>
              <Button variant="primary" size="large">
                {t('actions.editProfile')}
              </Button>
              <Button variant="outline" size="large">
                {t('actions.uploadDip')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={user.isFollowing ? 'outline' : 'primary'}
                size="large"
              >
                {user.isFollowing ? t('actions.unfollow') : t('actions.follow')}
              </Button>
              <Button variant="outline" size="large">
                {t('actions.message')}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}