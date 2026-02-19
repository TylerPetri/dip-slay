import { getTranslations } from "next-intl/server";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileClient from "@/components/profile/ProfileClient";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function CookProfilePage({ params }: Props) {
  const { handle } = await params;
  const t = await getTranslations("Profile");

  const profileTranslations = {
    loadingActivity: t("loadingActivity"),
    loadingVoted: t("loadingVoted"),
    loadingDips: t("loadingDips")
  }
  
  // Later: fetch real user data from Supabase
  // const user = await getUserByHandle(handle);
  // if (!user) notFound();

  const mockUser = {
    handle: `@${handle}`,
    displayName: handle.charAt(0).toUpperCase() + handle.slice(1),
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Spicy dip creator & leaderboard climber. Bring the heat!",
    totalDips: 18,
    totalVotes: 5892,
    slayScore: 94,
    rank: 1,
  };

  return (
    <main className="profile-page">
      {/* Profile Header */}
      <ProfileHeader user={mockUser} />

      <ProfileClient translations={profileTranslations}/>
    </main>
  );
}
