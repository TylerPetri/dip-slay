'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, MessageSquare, Upload, UserPlus, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'vote' | 'comment' | 'upload' | 'follow';
  targetId?: string;      // dip id or user handle
  targetTitle?: string;   // dip title or user name
  targetHandle?: string;  // for follows or mentions
  timestamp: string;      // ISO date
  avatarUrl?: string;     // optional actor avatar
}

interface ProfileActivityFeedProps {
  activities: ActivityItem[];
  isOwnProfile?: boolean;
}

export default function ProfileActivityFeed({
  activities,
  isOwnProfile = false,
}: ProfileActivityFeedProps) {
  const t = useTranslations('Profile.Activity');

  if (activities.length === 0) {
    return (
      <div className="profile-empty-state">
        <div className="empty-icon">
          <MessageSquare size={64} strokeWidth={1.5} />
        </div>
        <h3 className="empty-title">{t('empty.title')}</h3>
        <p className="empty-text">
          {isOwnProfile ? t('empty.ownText') : t('empty.otherText')}
        </p>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-icon-wrapper">
            <ActivityIcon type={activity.type} />
          </div>

          <div className="activity-content">
            <div className="activity-header">
              <span className="activity-actor">
                {activity.avatarUrl ? (
                  <Image
                    src={activity.avatarUrl}
                    alt="Actor avatar"
                    width={24}
                    height={24}
                    className="inline-block rounded-full mr-1.5 align-middle"
                  />
                ) : (
                  <User size={20} className="inline mr-1.5 align-middle" />
                )}
                {isOwnProfile ? 'You' : activity.targetHandle || 'Someone'}
              </span>

              <span className="activity-time">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>

            <div className="activity-description">
              {renderActivityDescription(activity, t)}
            </div>

            {activity.targetTitle && activity.targetId && (
              <Link href={`/dips/${activity.targetId}`} className="activity-target">
                {activity.targetTitle}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper: icon per activity type
function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'vote':
      return <Heart size={20} className="text-accent" fill="currentColor" />;
    case 'comment':
      return <MessageSquare size={20} className="text-primary" />;
    case 'upload':
      return <Upload size={20} className="text-success" />;
    case 'follow':
      return <UserPlus size={20} className="text-secondary" />;
    default:
      return <Heart size={20} />;
  }
}

// Helper: generate human-readable description
function renderActivityDescription(activity: ActivityItem, t: any) {
  const { type, targetTitle, targetHandle } = activity;

  switch (type) {
    case 'vote':
      return t('actions.votedOn', { dip: targetTitle || 'a dip' });
    case 'comment':
      return t('actions.commentedOn', { dip: targetTitle || 'a dip' });
    case 'upload':
      return t('actions.uploaded', { dip: targetTitle || 'a new dip' });
    case 'follow':
      return t('actions.followed', { user: targetHandle || 'someone' });
    default:
      return t('actions.unknown');
  }
}