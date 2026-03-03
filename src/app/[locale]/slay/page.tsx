import { useTranslations } from "next-intl";
import styles from "./slay.module.scss";

export default function SlayPage() {
  const t = useTranslations("Slay"); // Assume namespace "Slay" in en/fr.json

  // Placeholder – later from Supabase / user profile
  const userDips = [
    {
      id: 1,
      name: "Inferno Queso Bomb",
      category: "Spicy Inferno",
      wins: 14,
      losses: 3,
      rating: 4.8,
      ready: true,
    },
    {
      id: 2,
      name: "Midnight Truffle Gouda Melt",
      category: "Comfort Classic",
      wins: 8,
      losses: 5,
      rating: 4.2,
      ready: true,
    },
    {
      id: 3,
      name: "Experimental Ghost Pepper Caviar",
      category: "Experimental Weird",
      wins: 2,
      losses: 1,
      rating: 3.9,
      ready: false, // needs tweak / photo
    },
    // ...
  ];

  const duelQueueTeaser = {
    pendingChallenges: 3,
    upcomingDuels: 2,
    nextOpponent: "DipLord69",
  };

  return (
    <>
      <main className={styles.main}>
        {/* Slim sticky header – slayer red energy */}
        <header className={styles.header}>
          <div className={styles.bar}>
            <span className={styles.badge}>Slayer Mode</span>

            <div className={styles.statsPill}>
              <span className={styles.fireIcon}>🔥</span>
              {t("arsenalSize", { count: userDips.length })}
            </div>

            <button className={styles.createBtn}>{t("createNewDip")}</button>
          </div>
        </header>

        {/* Quick filters / tabs for your dips */}
        <div className={styles.filters}>
          <button className={`${styles.filterBtn} ${styles.active}`}>
            {t("filters.allDips")}
          </button>
          <button className={styles.filterBtn}>
            {t("filters.readyToDuel")}
          </button>
          <button className={styles.filterBtn}>
            {t("filters.needsTweak")}
          </button>
          <button className={styles.filterBtn}>
            {t("filters.topPerformers")}
          </button>
        </div>

        {/* Main content */}
        <div className={styles.content}>
          {/* Your Arsenal – main focus */}
          <section className={styles.arsenalSection}>
            <h1 className={styles.sectionTitle}>{t("yourArsenal")}</h1>

            <div className={styles.dipsGrid}>
              {userDips.map((dip) => (
                <div key={dip.id} className={styles.dipCard}>
                  <div className={styles.cardImagePlaceholder} />

                  <div className={styles.cardContent}>
                    <span className={styles.categoryBadge}>{dip.category}</span>
                    <h3 className={styles.cardTitle}>{dip.name}</h3>

                    <div className={styles.statsRow}>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Wins</span>
                        <span className={styles.statValue}>{dip.wins}</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Rating</span>
                        <span className={styles.statValue}>{dip.rating}★</span>
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <button className={styles.editBtn}>{t("edit")}</button>
                      {dip.ready ? (
                        <button className={styles.duelBtn}>
                          {t("challenge")}
                        </button>
                      ) : (
                        <button className={styles.fixBtn}>
                          {t("completeSetup")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* "Add new" card */}
              <div className={styles.addCard}>
                <div className={styles.addIcon}>+</div>
                <p className={styles.addText}>{t("addNewDip")}</p>
              </div>
            </div>
          </section>

          {/* Sidebar – stats, queue, leaderboard teaser */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>{t("duelQueue")}</h3>
              <p className={styles.queueInfo}>
                {t("pendingChallenges", {
                  count: duelQueueTeaser.pendingChallenges,
                })}
              </p>
              <p className={styles.queueInfo}>
                {t("upcomingDuels", { count: duelQueueTeaser.upcomingDuels })}
              </p>
              {duelQueueTeaser.nextOpponent && (
                <p className={styles.nextOpponent}>
                  Next: <strong>{duelQueueTeaser.nextOpponent}</strong>
                </p>
              )}
              <button className={styles.queueBtn}>{t("joinQueue")}</button>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>{t("slayerStats")}</h3>
              <div className={styles.statList}>
                <div className={styles.statItem}>
                  Total Duels: <strong>47</strong>
                </div>
                <div className={styles.statItem}>
                  Win Rate: <strong>68%</strong>
                </div>
                <div className={styles.statItem}>
                  Rank: <strong>#142</strong> (Top 5%)
                </div>
              </div>
              <button className={styles.statsBtn}>{t("viewFullStats")}</button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
