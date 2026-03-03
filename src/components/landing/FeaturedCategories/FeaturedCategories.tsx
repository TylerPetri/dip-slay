import { useTranslations } from "next-intl";
import CategoryCard from "@/components/ui/CategoryCard/CategoryCard";
import styles from "./FeaturedCategories.module.scss";

// Static data for now — later pull from Supabase categories table
const categories = [
  {
    title: "Game Night",
    slug: "game-night",
    image: "/images/categories/game-night.jpg",
  },
  {
    title: "Deep Fried",
    slug: "deep-fried",
    image: "/images/categories/deep-fried.jpg",
  },
  {
    title: "Crackers & Dips",
    slug: "crackers-dips",
    image: "/images/categories/crackers-dips.jpg",
  },
  {
    title: "Spicy Inferno",
    slug: "spicy-inferno",
    image: "/images/categories/spicy-inferno.jpg",
  },
  {
    title: "Sweet Surprise",
    slug: "sweet-surprise",
    image: "/images/categories/sweet-surprise.jpg",
  },
  {
    title: "Quick Bite",
    slug: "quick-bite",
    image: "/images/categories/quick-bite.jpg",
  },
  {
    title: "Comfort Classic",
    slug: "comfort-classic",
    image: "/images/categories/comfort-classic.jpg",
  },
  {
    title: "Experimental Weird",
    slug: "experimental-weird",
    image: "/images/categories/experimental-weird.jpg",
  },
];

export default function FeaturedCategories() {
  const t = useTranslations("Landing.featured");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t("heading")}</h2>
        <p className={styles.subheading}>{t("subheading")}</p>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              title={t(`categories.${cat.slug}.title`)}
              description={t(`categories.${cat.slug}.description`)}
              slug={cat.slug}
              imageSrc={cat.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
