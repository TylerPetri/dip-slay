import { useTranslations } from "next-intl";
import styles from "./watch.module.scss";

export default function WatchPage() {
  const t = useTranslations("Watch");

  // Placeholder data – replace with real Supabase / API fetch later
  const liveDuels = [
    {
      id: 1,
      title: "Spicy Inferno Showdown",
      category: "Spicy Inferno",
      votes: { watcher: 68, slayer: 32 },
      live: true,
    },
    {
      id: 2,
      title: "Game Night Classics",
      category: "Game Night",
      votes: { watcher: 45, slayer: 55 },
      live: true,
    },
    {
      id: 3,
      title: "Deep Fried Madness",
      category: "Deep Fried",
      votes: { watcher: 72, slayer: 28 },
      live: true,
    },
    // ... more would be loaded dynamically
  ];

  const topWatchers = [
    { rank: 1, name: "WatcherKing", points: 1240 },
    { rank: 2, name: "DipJudge42", points: 980 },
    { rank: 3, name: "VoteMasterQC", points: 850 },
    { rank: 4, name: "CrowdQueen", points: 720 },
    { rank: 5, name: "NeonVoterX", points: 610 },
  ];

  return (
    <>
      <main className={styles.main}>
        {/* Slim sticky header */}
        <header className={styles.header}>
          <div className={styles.bar}>
            <span className={styles.badge}>Watcher Mode</span>

            <div className={styles.livePill}>
              <span className={styles.liveDot} />
              {t("liveCount", { count: liveDuels.length })}
            </div>

            <button className={styles.joinBtn}>{t("joinCrowd")}</button>
          </div>
        </header>

        {/* Category filters – horizontal scroll on mobile */}
        <div className={styles.filters}>
          <button className={`${styles.filterBtn} ${styles.active}`}>
            {t("filters.all")}
          </button>
          <button className={styles.filterBtn}>Spicy Inferno</button>
          <button className={styles.filterBtn}>Game Night</button>
          <button className={styles.filterBtn}>Deep Fried</button>
          <button className={styles.filterBtn}>Sweet Surprise</button>
          {/* Add more dynamically later */}
        </div>

        {/* Main content area */}
        <div className={styles.content}>
          {/* Duels grid – main focus */}
          <section className={styles.duelsSection}>
            <div className={styles.duelsGrid}>
              {liveDuels.map((duel) => (
                <div key={duel.id} className={styles.duelCard}>
                  <div className={styles.cardImagePlaceholder} />

                  <div className={styles.cardContent}>
                    <span className={styles.categoryBadge}>
                      {duel.category}
                    </span>
                    <h3 className={styles.cardTitle}>{duel.title}</h3>

                    <div className={styles.voteBar}>
                      <div
                        className={styles.watcherBar}
                        style={{ width: `${duel.votes.watcher}%` }}
                      />
                      <div
                        className={styles.slayerBar}
                        style={{ width: `${duel.votes.slayer}%` }}
                      />
                    </div>

                    <button className={styles.watchBtn}>
                      {duel.live ? t("watchLive") : t("viewReplay")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Leaderboard sidebar – sticky on desktop */}
          <aside className={styles.leaderboardSidebar}>
            <h2 className={styles.sidebarTitle}>{t("topWatchers.title")}</h2>
            <p className={styles.sidebarSubtitle}>
              {t("topWatchers.subtitle")}
            </p>

            <div className={styles.rankList}>
              {topWatchers.map((watcher) => (
                <div key={watcher.rank} className={styles.rankItem}>
                  <span className={styles.rankPosition}>
                    {watcher.rank === 1
                      ? "🥇"
                      : watcher.rank === 2
                        ? "🥈"
                        : watcher.rank === 3
                          ? "🥉"
                          : `${watcher.rank}ᵗʰ`}
                  </span>
                  <span className={styles.rankName}>{watcher.name}</span>
                  <span className={styles.rankPoints}>
                    {watcher.points} pts
                  </span>
                </div>
              ))}
            </div>

            <button className={styles.becomeBtn}>{t("becomeWatcher")}</button>
          </aside>
        </div>
      </main>
    </>
  );
}
