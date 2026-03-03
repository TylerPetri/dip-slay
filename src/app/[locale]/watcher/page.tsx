'use client';

import { useTranslations } from "next-intl";
import clsx from "clsx";
import styles from "./watcher.module.scss";
import Button from "@/components/ui/Button/Button";

// Placeholder data — replace with Supabase + realtime later
const liveDuels = [
  { id: 1, title: "Spicy Inferno Showdown", category: "Spicy Inferno", votes: { watcher: 68, slayer: 32 }, viewers: 1240, live: true },
  { id: 2, title: "Game Night Classics", category: "Game Night", votes: { watcher: 45, slayer: 55 }, viewers: 890, live: true },
  { id: 3, title: "Deep Fried Madness", category: "Deep Fried", votes: { watcher: 72, slayer: 28 }, viewers: 2100, live: true },
  { id: 4, title: "Sweet Surprise Battle", category: "Sweet Surprise", votes: { watcher: 81, slayer: 19 }, viewers: 560, live: true },
];

const topWatchers = [
  { rank: 1, name: "WatcherKing", points: 1240 },
  { rank: 2, name: "DipJudge42", points: 980 },
  { rank: 3, name: "VoteMasterX", points: 850 },
  { rank: 4, name: "CrowdQueen", points: 720 },
];

export default function WatcherPage() {
  const t = useTranslations("Watch");

  const totalLive = liveDuels.length;

  return (
    <main className={styles.main}>
      {/* Compact Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t("arenaTitle")}</h1>
          <p className={clsx(styles.liveCount, styles.pulsing)}>
            {totalLive} {t("liveDuels")}
          </p>
          <Button
            variant="watcher"
            size="large"
            className={styles.joinCrowd}
          >
            {t("joinCrowd")}
          </Button>
        </div>
      </section>

      {/* Main content + sidebar grid */}
      <div className={styles.contentGrid}>
        {/* Main column: filters + duels */}
        <div className={styles.mainColumn}>
          {/* Filters */}
          <div className={styles.filters}>
            <div className={clsx(styles.filterPill, styles.active)}>{t("filters.all")}</div>
            <div className={styles.filterPill}>Spicy Inferno</div>
            <div className={styles.filterPill}>Game Night</div>
            <div className={styles.filterPill}>Deep Fried</div>
            <div className={styles.filterPill}>Sweet Surprise</div>
          </div>

          {/* Live Duels */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("liveDuels")}</h2>
            <div className={styles.duelGrid}>
              {liveDuels.map((duel) => (
                <div key={duel.id} className={styles.duelCard}>
                  <div className={styles.duelHeader}>
                    <span className={styles.categoryBadge}>{duel.category}</span>
                    <span className={styles.viewers}>{duel.viewers} 👀</span>
                  </div>
                  <h3 className={styles.duelTitle}>{duel.title}</h3>
                  <div className={styles.voteBar}>
                    <div
                      className={styles.watcherFill}
                      style={{ width: `${duel.votes.watcher}%` }}
                    />
                    <div
                      className={styles.slayerFill}
                      style={{ width: `${duel.votes.slayer}%` }}
                    />
                    <span className={styles.votePercent}>
                      {duel.votes.watcher}% Watcher • {duel.votes.slayer}% Slayer
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    <Button variant="watcher" size="medium" href={`/watcher/duel/${duel.id}`}>
                      {t("watchLive")}
                    </Button>
                    <Button variant="outline" size="medium">
                      {t("voteNow")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Leaderboard Sidebar */}
        <aside className={styles.leaderboardSidebar}>
          <div className={styles.leaderboardCard}>
            <h2 className={styles.leaderboardTitle}>{t("leaderboard.title")}</h2>
            <div className={styles.leaderboard}>
              {topWatchers.map((w) => (
                <div key={w.rank} className={styles.leaderItem}>
                  <span className={styles.rankPosition}>
                    {w.rank === 1 ? "🥇" : w.rank === 2 ? "🥈" : w.rank === 3 ? "🥉" : w.rank}
                  </span>
                  <span className={styles.rankName}>{w.name}</span>
                  <span className={styles.rankPoints}>{w.points} pts</span>
                </div>
              ))}
            </div>
            <Button variant="watcher" size="large" className={styles.becomeWatcher}>
              {t("becomeWatcher")}
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}