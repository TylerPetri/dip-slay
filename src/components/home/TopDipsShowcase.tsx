'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Dip {
  id: string;
  title: string;
  imageUrl: string;
  creatorHandle: string;
  votes: number;
  slayScore: number;
}

const mockTopDips: Dip[] = [
  {
    id: '1',
    title: 'Spicy Ghost Pepper Queso',
    imageUrl: 'https://images.unsplash.com/photo-1626645738538-2b5a9c5b7c4e?w=800',
    creatorHandle: '@spicyking',
    votes: 1248,
    slayScore: 92,
  },
  {
    id: '2',
    title: 'Truffle & Garlic Aioli',
    imageUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800',
    creatorHandle: '@garlicguru',
    votes: 987,
    slayScore: 88,
  },
  {
    id: '3',
    title: 'Avocado Lime Ranch Smash',
    imageUrl: 'https://images.unsplash.com/photo-1627308595319-9f3b3d5e6b9f?w=800',
    creatorHandle: '@avolover',
    votes: 856,
    slayScore: 85,
  },
];

export default function TopDipsShowcase() {
  const t = useTranslations('Home.TopDips');

  return (
    <div className="top-dips-carousel">
      <div className="carousel-track">
        {mockTopDips.map((dip) => (
          <div key={dip.id} className="top-dip-card-wrapper">
            <Link href={`/dips/${dip.id}`} className="top-dip-card">
              <div className="dip-image-container">
                <Image
                  src={dip.imageUrl}
                  alt={dip.title}
                  fill
                  className="dip-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true} // top 3 = important
                />
              </div>

              <div className="dip-info">
                <h3 className="dip-title">{dip.title}</h3>
                <p className="dip-creator">@{dip.creatorHandle}</p>

                <div className="dip-stats">
                  <div className="dip-votes">
                    <span className="votes-count">{dip.votes.toLocaleString()}</span>
                    <span className="votes-label"> {t('votes')}</span>
                  </div>

                  <div className="slay-meter">
                    <div
                      className="slay-meter-bar"
                      style={{ width: `${dip.slayScore}%` }}
                    />
                    <span className="slay-score">{dip.slayScore}% Slay</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}