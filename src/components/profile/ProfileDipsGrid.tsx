'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import Button from '../ui/Button';

interface Dip {
  id: string;
  title: string;
  imageUrl: string;
  votes: number;
  createdAt: string;
  description?: string;
}

interface ProfileDipsGridProps {
  dips: Dip[];
  isOwnProfile?: boolean; // show edit/delete buttons if true
}

export default function ProfileDipsGrid({
  dips,
  isOwnProfile = false,
}: ProfileDipsGridProps) {
  const t = useTranslations('Profile.Dips');

  if (dips.length === 0) {
    return (
      <div className="profile-empty-state">
        <div className="empty-icon">
          <Heart size={64} strokeWidth={1.5} />
        </div>
        <h3 className="empty-title">{t('empty.title')}</h3>
        <p className="empty-text">{t('empty.text')}</p>

        {isOwnProfile && (
          <Link href="/dips/new" className="btn btn--primary btn--large mt-6">
            {t('empty.cta.upload')}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="profile-dips-grid">
      {dips.map((dip) => (
        <Link key={dip.id} href={`/dips/${dip.id}`} className="profile-dip-card">
          <div className="dip-image-wrapper">
            <Image
              src={dip.imageUrl}
              alt={dip.title}
              fill
              className="dip-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="dip-info">
            <h3 className="dip-title">{dip.title}</h3>

            <div className="dip-meta">
              <div className="dip-votes">
                <Heart size={16} className="text-accent" fill="currentColor" />
                <span>{dip.votes.toLocaleString()}</span>
              </div>

              <div className="dip-date">
                {/* {new Date(dip.createdAt).toLocaleDateString()} */}
              </div>
            </div>

            {isOwnProfile && (
              <div className="dip-actions">
                <Button variant="outline" size="small">
                  {t('actions.edit')}
                </Button>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}