import { useTranslations } from "next-intl";
import styles from "./HowItWorks.module.scss";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    {
      key: "upload",
      icon: "🍳⚔️",
      titleKey: "upload.title",
      descKey: "upload.description",
    },
    {
      key: "duel",
      icon: "🔥👀",
      titleKey: "duel.title",
      descKey: "duel.description",
    },
    {
      key: "win",
      icon: "🏆📈",
      titleKey: "win.title",
      descKey: "win.description",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t("heading")}</h2>
        <p className={styles.subheading}>{t("subheading")}</p>

        <div className={styles.grid}>
          {steps.map((step) => (
            <div
              key={step.key}
              className={styles.card}
            >
              <div className={styles.icon}>{step.icon}</div>
              <h3 className={styles.title}>{t(step.titleKey)}</h3>
              <p className={styles.description}>{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
