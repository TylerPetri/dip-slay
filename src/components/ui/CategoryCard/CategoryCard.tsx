import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./CategoryCard.module.scss";

type Props = {
  title: string;
  imageSrc: string;
  slug: string;
  description?: string;
};

export default function CategoryCard({
  title,
  imageSrc,
  slug,
  description,
}: Props) {
  const t = useTranslations("Common");

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={`${title} dip category`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          priority={false}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}
        <Link href={`/categories/${slug}`} className={styles.btn}>
          Duel in this category
        </Link>
      </div>
    </div>
  );
}
