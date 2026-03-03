'use client';

import { useTranslations } from "next-intl";
import clsx from "clsx";
import styles from "./slayer.module.scss";
import Button from "@/components/ui/Button/Button";

// Placeholder data – replace with Supabase later
const userStats = {
  rank: 142,
  trophies: 4782,
  highestTrophies: 5120,
  winRate: 68,
  totalDuels: 47,
  threeCrownWins: 12,
  currentStreak: 3,
};

const userDips = [
  { id: 1, name: "Inferno Queso Bomb", category: "Spicy Inferno", wins: 14, losses: 3, rating: 4.8, ready: true, image: "/images/dips/queso.jpg" },
  { id: 2, name: "Midnight Truffle Gouda Melt", category: "Comfort Classic", wins: 8, losses: 5, rating: 4.2, ready: true, image: "/images/dips/truffle.jpg" },
  { id: 3, name: "Experimental Ghost Pepper Caviar", category: "Experimental Weird", wins: 2, losses: 1, rating: 3.9, ready: false, image: "/images/dips/caviar.jpg" },
];

const queueTeaser = {
  pending: 3,
  nextOpponent: "DipLord87",
  timeLeft: "2m 14s",
};

export default function SlayPage() {
  const t = useTranslations("Slay");

  const hasDips = userDips.length > 0;

  return (
    <main className={styles.main}>
      {/* Hero / Status Bar */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.playerBadge}>
            <span className={styles.rank}>#{userStats.rank}</span>
            <span className={styles.trophies}>{userStats.trophies} 🏆</span>
          </div>
          <h1 className={styles.heroTitle}>{t("slayerMode")}</h1>
          <p className={styles.heroSubtitle}>
            {t("winRate")}: <strong>{userStats.winRate}%</strong> • {t("totalDuels")}: <strong>{userStats.totalDuels}</strong>
          </p>
        </div>

        <Button
          variant="slayer"
          size="large"
          className={styles.createButton}
          href="/slay/create"
        >
          {t("createDip")}
        </Button>
      </section>

      {/* Main content + sidebar grid */}
      <div className={styles.contentGrid}>
        {/* Left/main column */}
        <div className={styles.mainColumn}>
          {/* Arsenal */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t("yourArsenal")}</h2>

            {hasDips ? (
              <div className={styles.dipGrid}>
                {userDips.map((dip) => (
                  <div key={dip.id} className={clsx(styles.dipCard, !dip.ready && styles.needsTweak)}>
                    <div className={styles.dipImageWrapper}>
                      {/* <Image src={dip.image} alt={dip.name} fill className={styles.dipImage} /> */}
                      <div className={styles.placeholderImage} />
                      {dip.ready ? (
                        <span className={styles.readyBadge}>✓</span>
                      ) : (
                        <span className={styles.tweakBadge}>⚙️</span>
                      )}
                    </div>
                    <div className={styles.dipInfo}>
                      <h3 className={styles.dipName}>{dip.name}</h3>
                      <p className={styles.dipCategory}>{dip.category}</p>
                      <div className={styles.dipStats}>
                        <span>W: <strong>{dip.wins}</strong></span>
                        <span>L: <strong>{dip.losses}</strong></span>
                        <span className={styles.rating}>★ {dip.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>{t("arsenalEmpty")}</p>
                <Button variant="slayer" size="medium" href="/slay/create">
                  {t("createFirstDip")}
                </Button>
              </div>
            )}
          </section>

          {/* Queue Teaser */}
          <section className={clsx(styles.section, styles.queueSection)}>
            <h2 className={styles.sectionTitle}>{t("duelQueue")}</h2>
            <div className={clsx(styles.queueCard, queueTeaser.pending > 0 && styles.pulsing)}>
              <div className={styles.queueContent}>
                <p className={styles.queuePending}>
                  {t("pendingChallenges")}: <strong>{queueTeaser.pending}</strong>
                </p>
                {queueTeaser.pending > 0 && (
                  <p className={styles.nextOpponent}>
                    {t("nextOpponent")}: <strong>{queueTeaser.nextOpponent}</strong> • {queueTeaser.timeLeft}
                  </p>
                )}
                <Button variant="slayer" size="large" className={styles.queueBtn}>
                  {t("joinQueue")}
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Stats Sidebar (desktop sticky) */}
        <aside className={styles.statsSidebar}>
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>{t("slayerStats")}</h3>

            <div className={styles.rankCircle}>
              <span className={styles.rankNumber}>#{userStats.rank}</span>
              <span className={styles.rankLabel}>{t("globalRank")}</span>
            </div>

            <div className={styles.statsList}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t("trophies")}</span>
                <span className={styles.statValue}>{userStats.trophies}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t("highestTrophies")}</span>
                <span className={styles.statValue}>{userStats.highestTrophies}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t("winRate")}</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${userStats.winRate}%` }}
                  />
                  <span>{userStats.winRate}%</span>
                </div>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t("totalDuels")}</span>
                <span className={styles.statValue}>{userStats.totalDuels}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t("threeCrownWins")}</span>
                <span className={styles.statValue}>{userStats.threeCrownWins}</span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>{t("currentStreak")}</span>
                <span className={clsx(styles.statValue, userStats.currentStreak > 0 && styles.streakHot)}>
                  {userStats.currentStreak > 0 ? `+${userStats.currentStreak}` : userStats.currentStreak}
                </span>
              </div>
            </div>

            <Button variant="outline" size="medium" className={styles.viewFullStats}>
              {t("viewFullStats")}
            </Button>
          </div>
        </aside>
      </div>

      {/* FAB (mobile) */}
      <Button
        variant="slayer"
        size="large"
        className={styles.fab}
        href="/slay/create"
      >
        +
      </Button>
    </main>
  );
}