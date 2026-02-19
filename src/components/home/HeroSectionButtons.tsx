"use client"

import { useState } from "react";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";
import { useRouter } from "@/i18n/navigation";

interface HomeClientProps {
  heroTranslations: {
    upload: string
    leaderboard: string
  }
}

export function HeroSectionButtons({ heroTranslations }: HomeClientProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter()

  const handleUpload = () => {
  // Later: check real session
  const isLoggedIn = false; // mock
  if (isLoggedIn) {
    router.push('/dips/new');
  } else {
    setShowAuthModal(true);
  }
};

  return (
    <div className="hero-ctas">
      <Button onClick={handleUpload} variant="success" size="large">
        {heroTranslations.upload}
      </Button>
      <AuthModal  open={showAuthModal} onOpenChange={setShowAuthModal} />
      <Button link href="/leaderboard" size="large">
        {heroTranslations.leaderboard}
      </Button>
    </div>
  );
}
