import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button/Button";
import styles from "./FinalCta.module.scss";
import { Link } from "@/i18n/navigation";

export default function FinalCta() {
  const t = useTranslations("Landing.finalCta");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t("heading")}</h2>
        <p className={styles.subheading}>{t("subheading")}</p>

        <div className={styles.ctaGroup}>
          <Button
            variant="slayer"
            size="large"
            as={Link}
            href="/slay"
            className={styles.mainBtn}
          >
            {t("buttonSlay")}
          </Button>

          <Button
            variant="watcher"
            size="large"
            as={Link}
            href="/watch"
            className={styles.secondaryBtn}
          >
            {t("buttonWatch")}
          </Button>
        </div>

        <p className={styles.legal}>{t("legal")}</p>
      </div>
    </section>
  );
}
