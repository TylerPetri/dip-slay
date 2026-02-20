"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "../ui/Button";
import SlayMeter from "../ui/SlayMeter";

interface DipEntry {
  rank: number;
  id: string;
  title: string;
  imageUrl: string;
  creatorHandle: string;
  votes: number;
  slayScore: number;
}

const mockTopDips: DipEntry[] = [
  {
    rank: 1,
    id: "1",
    title: "Spicy Ghost Pepper Queso",
    imageUrl:
      "https://images.unsplash.com/photo-1626645738538-2b5a9c5b7c4e?w=800",
    creatorHandle: "@spicyking",
    votes: 1248,
    slayScore: 92,
  },
  {
    rank: 2,
    id: "2",
    title: "Truffle & Garlic Aioli",
    imageUrl:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800",
    creatorHandle: "@garlicguru",
    votes: 987,
    slayScore: 88,
  },
  {
    rank: 3,
    id: "3",
    title: "Avocado Lime Ranch Smash",
    imageUrl:
      "https://images.unsplash.com/photo-1627308595319-9f3b3d5e6b9f?w=800",
    creatorHandle: "@avolover",
    votes: 856,
    slayScore: 85,
  },
];

export default function TopDipsLeaderboard() {
  const t = useTranslations("Leaderboard.Dips");

  return (
    <div className="top-dips-leaderboard">
      <h2 className="leaderboard-section-title">{t("title")}</h2>

      <div className="dips-grid">
        {mockTopDips.map((dip) => (
          <Link
            key={dip.id}
            href={`/dips/${dip.id}`}
            className="dip-leaderboard-card"
          >
            <div className="dip-rank">
              {dip.rank <= 3 ? (
                <span className={`rank-medal rank-${dip.rank}`}>
                  {dip.rank === 1 ? "🥇" : dip.rank === 2 ? "🥈" : "🥉"}
                </span>
              ) : (
                <span className="rank-number">#{dip.rank}</span>
              )}
            </div>

            <div className="dip-card-content">
              <div className="dip-image-wrapper">
                <Image
                  src={dip.imageUrl}
                  alt={dip.title}
                  fill
                  className="dip-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="dip-details">
                <h3 className="dip-title">{dip.title}</h3>
                <p className="dip-creator">@{dip.creatorHandle}</p>

                <div className="dip-stats">
                  <div className="dip-votes">
                    <span className="votes-count">
                      {dip.votes.toLocaleString()}
                    </span>
                    <span className="votes-label"> {t("votes")}</span>
                  </div>

                  <SlayMeter slayScore={dip.slayScore}/>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="load-more">
        <Button size="large"> {t("loadMore")}</Button>
      </div>
    </div>
  );
}
