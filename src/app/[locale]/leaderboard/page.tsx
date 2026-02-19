import LeaderboardClient from "@/components/leaderboard/LeaderboardClient";
import Container from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";

export default async function LeaderboardPage() {
  const t = await getTranslations("Leaderboard");

  return (
    <main className="min-h-screen bg-bg-light pb-20">
      <section className="leaderboard-hero">
        <Container variant="textCenter">
          <h1 className="leaderboard-title">{t("title")}</h1>
          <p className="leaderboard-subtitle">{t("subtitle")}</p>
        </Container>

        <LeaderboardClient />
      </section>
    </main>
  );
}
