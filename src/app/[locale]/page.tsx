import { getTranslations } from "next-intl/server";
import TopDipsShowcase from "@/components/home/TopDipsShowcase";
import TabsNavigation from "@/components/home/TabsNavigation";
import { Suspense } from "react";
import { HeroSectionButtons } from "@/components/home/HeroSectionButtons";
import Container from "@/components/ui/Container";
import UploadYoursPrompt from "@/components/home/UploadYoursPrompt";

export default async function HomePage() {
  const t = await getTranslations("Home");

  const heroTranslations = {
    upload: t("hero.cta.upload"),
    leaderboard: t("hero.cta.leaderboard"),
  };

  return (
    <main className="min-h-screen bg-bg-light">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-subtitle">{t("hero.subtitle")}</p>

          <HeroSectionButtons heroTranslations={heroTranslations} />
        </div>
      </section>

      <section className="top-dips-section">
        <Container>
          <h2 className="section-title">{t("TopDips.title")}</h2>

          <Suspense
            fallback={
              <div className="text-center py-20">Loading top dips...</div>
            }
          >
            <TopDipsShowcase />
          </Suspense>

          <UploadYoursPrompt />
        </Container>
      </section>

      {/* Sticky Tabs Navigation */}
      <TabsNavigation />

      {/* Tab content placeholder – will be dynamic later */}
      <div className="tab-content-area py-12">
        {/* Tab content goes here – for now placeholder */}
        <div className="container text-center text-text-secondary">
          {t("Tabs.placeholder")}
        </div>
      </div>
    </main>
  );
}
