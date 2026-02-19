"use client"

import { useState } from "react";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";
import Link from "next/link";

interface HomeClientProps {
  heroTranslations: {
    upload: string
    leaderboard: string
  }
}

export function HeroSectionButtons({ heroTranslations }: HomeClientProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="hero-ctas">
      <Button variant="success" size="large">
        {heroTranslations.upload}
      </Button>
      <AuthModal  open={showAuthModal} onOpenChange={setShowAuthModal} />
      <Link href="/leaderboard" className="btn btn--outline btn--large">
        {heroTranslations.leaderboard}
      </Link>
    </div>
  );
}
