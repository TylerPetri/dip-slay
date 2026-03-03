import { useTranslations } from "next-intl";
import Hero from "@/components/landing/Hero/Hero";
import HowItWorks from "@/components/landing/HowItWorks/HowItWorks";
import FeaturedCategories from "@/components/landing/FeaturedCategories/FeaturedCategories";
import FinalCta from "@/components/landing/FinalCta/FinalCta";

export default function LandingPage() {
  const t = useTranslations("Landing");

  return (
    <main>
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        watchTitle={t("watchCta.title")}
        watchDesc={t("watchCta.description")}
        slayTitle={t("slayCta.title")}
        slayDesc={t("slayCta.description")}
        legal={t("legal")}
      />

      <HowItWorks />

      <FeaturedCategories />

      <FinalCta />
    </main>
  );
}
