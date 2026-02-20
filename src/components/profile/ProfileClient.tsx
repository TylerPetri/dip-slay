"use client";

import { Suspense, useEffect, useState } from "react";
import ProfileActivityFeed from "./ProfileActivityFeed";
import ProfileDipsGrid from "./ProfileDipsGrid";
import ProfileTabs from "./ProfileTabs";
import ProfileVotedGrid from "./ProfileVotedGrid";
import Container from "../ui/Container";
import { useSearchParams } from "next/navigation";

interface ProfileClientProps {
  translations: {
    loadingActivity: string;
    loadingVoted: string;
    loadingDips: string;
  };
}

export default function ProfileClient({ translations }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState<"created" | "voted" | "activity">(
    "created",
  );
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const searchParams = useSearchParams();

  // useEffect(()=>{

  //   const urlTab = searchParams.get("tab");
  //   const initialTab = ["created", "voted", "activity"].includes(urlTab || "")
  //   ? urlTab
  //   : "created";
  //   setActiveTab(initialTab as ("created" | "voted" | "activity"))
  // },[searchParams])

  const mockUserVotedDips = [
    {
      id: "dip-007",
      title: "Jalapeño Popper Queso",
      imageUrl:
        "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=800",
      creatorHandle: "@jalapenoqueen",
      totalVotes: 1456,
      votedAt: "2026-02-18T19:45:00Z",
    },
    {
      id: "dip-003",
      title: "Avocado Lime Ranch Smash",
      imageUrl:
        "https://images.unsplash.com/photo-1627308595319-9f3b3d5e6b9f?w=800",
      creatorHandle: "@avolover",
      totalVotes: 856,
      votedAt: "2026-02-17T14:22:00Z",
    },
    {
      id: "dip-012",
      title: "Loaded Baked Potato Dip",
      imageUrl:
        "https://images.unsplash.com/photo-1559056199-8c9956d0d6e8?w=800",
      creatorHandle: "@potatolord",
      totalVotes: 932,
      votedAt: "2026-02-14T08:15:00Z",
    },
    {
      id: "dip-001",
      title: "Spicy Ghost Pepper Queso",
      imageUrl:
        "https://images.unsplash.com/photo-1626645738538-2b5a9c5b7c4e?w=800",
      creatorHandle: "@spicyking",
      totalVotes: 1248,
      votedAt: "2026-02-13T17:50:00Z",
    },
  ]

  const mockUserDips = [
    {
      id: "dip-001",
      title: "Spicy Ghost Pepper Queso with Chorizo Crunch",
      imageUrl:
        "https://images.unsplash.com/photo-1626645738538-2b5a9c5b7c4e?w=800",
      votes: 1248,
      createdAt: "2025-12-15T14:30:00Z",
      description:
        "Ultra-creamy queso loaded with ghost pepper heat and crispy chorizo bits.",
    },
    {
      id: "dip-002",
      title: "Truffle & Roasted Garlic Aioli",
      imageUrl:
        "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800",
      votes: 987,
      createdAt: "2025-11-28T09:15:00Z",
      description:
        "Silky aioli infused with black truffle oil and slow-roasted garlic.",
    },
    {
      id: "dip-003",
      title: "Avocado Lime Ranch Smash",
      imageUrl:
        "https://images.unsplash.com/photo-1627308595319-9f3b3d5e6b9f?w=800",
      votes: 856,
      createdAt: "2025-10-10T18:45:00Z",
      description:
        "Chunky smashed avocado blended with zesty lime, fresh herbs, and creamy ranch.",
    },
    {
      id: "dip-004",
      title: "Buffalo Chicken Dip – Extra Fire",
      imageUrl:
        "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=800",
      votes: 742,
      createdAt: "2025-09-22T11:20:00Z",
      description:
        "Classic buffalo chicken dip kicked up with extra hot sauce and smoked gouda.",
    },
    {
      id: "dip-005",
      title: "Honey Sriracha Cream Cheese Dip",
      imageUrl:
        "https://images.unsplash.com/photo-1559056199-8c9956d0d6e8?w=800",
      votes: 619,
      createdAt: "2025-08-05T16:00:00Z",
      description:
        "Sweet-heat cream cheese dip with honey, sriracha, and green onions.",
    },
  ]

  const mockUserActivity = [
    {
      id: "act-001",
      type: "vote" as const,
      targetId: "dip-007",
      targetTitle: "Jalapeño Popper Queso",
      targetHandle: "@jalapenoqueen",
      timestamp: "2026-02-18T19:45:00Z",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      id: "act-002",
      type: "comment" as const,
      targetId: "dip-003",
      targetTitle: "Avocado Lime Ranch Smash",
      targetHandle: "@avolover",
      timestamp: "2026-02-17T14:22:00Z",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    {
      id: "act-003",
      type: "upload" as const,
      targetId: "dip-008",
      targetTitle: "Mango Habanero Salsa",
      timestamp: "2026-02-16T10:10:00Z",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    {
      id: "act-004",
      type: "follow" as const,
      targetHandle: "@cheesedreamer",
      timestamp: "2026-02-15T22:33:00Z",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    },
    {
      id: "act-005",
      type: "vote" as const,
      targetId: "dip-012",
      targetTitle: "Loaded Baked Potato Dip",
      targetHandle: "@potatolord",
      timestamp: "2026-02-14T08:15:00Z",
      avatarUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100",
    },
    {
      id: "act-006",
      type: "comment" as const,
      targetId: "dip-001",
      targetTitle: "Spicy Ghost Pepper Queso",
      targetHandle: "@spicyking",
      timestamp: "2026-02-13T17:50:00Z",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
  ]

  return (
    <>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="profile-content">
        <Container>
          {activeTab === "activity" ? (
            <Suspense
              fallback={
                <div className="text-center py-20">
                  {translations.loadingActivity}
                </div>
              }
            >
              <ProfileActivityFeed activities={mockUserActivity} />
            </Suspense>
          ) : activeTab === "voted" ? (
            <Suspense
              fallback={
                <div className="text-center py-20">
                  {translations.loadingVoted}
                </div>
              }
            >
              <ProfileVotedGrid votedDips={mockUserVotedDips} />
            </Suspense>
          ) : (
            <Suspense
              fallback={
                <div className="text-center py-20">
                  {translations.loadingDips}
                </div>
              }
            >
              <ProfileDipsGrid
                dips={mockUserDips}
                isOwnProfile={isOwnProfile}
              />
            </Suspense>
          )}
        </Container>
      </section>
    </>
  );
}
