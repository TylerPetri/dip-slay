"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import AuthModal from "../auth/AuthModal";

export default function UploadYoursPrompt() {
  const t = useTranslations("Home");
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="guest-prompt">
      <p className="text-text-secondary mb-4">{t("TopDips.guestPrompt")}</p>
      <Button onClick={() => setShowAuthModal(true)}>
        {t("TopDips.cta.registerAndUpload")}
      </Button>
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} signup/>
    </div>
  );
}
