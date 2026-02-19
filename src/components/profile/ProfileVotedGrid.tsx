'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

interface VotedDip {
  id: string;
  title: string;
  imageUrl: string;
  creatorHandle: string;
  totalVotes: number;
  votedAt: string; // ISO date when this user voted
}

interface ProfileVotedGridProps {
  votedDips: VotedDip[];
}

export default function ProfileVotedGrid({ votedDips }: ProfileVotedGridProps) {
  const t = useTranslations('Profile.Voted');

  if (votedDips.length === 0) {
    return (
      <div className="profile-empty-state">
        <div className="empty-icon">
          <Heart size={64} strokeWidth={1.5} />
        </div>
        <h3 className="empty-title">{t('empty.title')}</h3>
        <p className="empty-text">{t('empty.text')}</p>
      </div>
    );
  }

  return (
    <div className="profile-voted-grid">
      {votedDips.map((dip) => (
        <Link key={dip.id} href={`/dips/${dip.id}`} className="voted-dip-card">
          <div className="voted-image-wrapper">
            <Image
              src={dip.imageUrl}
              alt={dip.title}
              fill
              className="voted-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="voted-info">
            <h3 className="voted-title">{dip.title}</h3>
            <p className="voted-creator">@{dip.creatorHandle}</p>

            <div className="voted-meta">
              <div className="voted-count">
                <Heart size={16} className="text-accent" fill="currentColor" />
                <span>{dip.totalVotes.toLocaleString()}</span>
              </div>

              <div className="voted-date">
                {t('votedOn', { date: new Date(dip.votedAt).toLocaleDateString() })}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}