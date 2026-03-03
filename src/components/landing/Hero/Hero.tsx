import { Link } from "@/i18n/navigation";
import Button from '@/components/ui/Button/Button';
import styles from './Hero.module.scss';

type Props = {
  title: string;
  subtitle: string;
  watchTitle: string;
  watchDesc: string;
  slayTitle: string;
  slayDesc: string;
  legal: string;
};

export default function Hero({ title, subtitle, watchTitle, watchDesc, slayTitle, slayDesc, legal }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.slayerSide} />
        <div className={styles.watcherSide} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.ctaContainer}>
          <Button 
            variant="watcher" 
            size="large"
            mode="watcher"
            className={styles.cta}
          >
            <span className={styles.ctaTitle}>{watchTitle}</span>
            <span className={styles.ctaDesc}>{watchDesc}</span>
          </Button>

          <Button 
            variant="slayer" 
            size="large"
            mode="slayer"
            className={styles.cta}
          >
            <span className={styles.ctaTitle}>{slayTitle}</span>
            <span className={styles.ctaDesc}>{slayDesc}</span>
          </Button>
        </div>

        <p className={styles.legal}>{legal}</p>
      </div>
    </section>
  );
}