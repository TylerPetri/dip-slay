"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";

export default function TabsNavigation() {
  const t = useTranslations("Home.Tabs");
  const pathname = usePathname();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tabsRef.current) return;

      const heroHeight = window.innerHeight * 0.7;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "all-recipes", label: t("allRecipes"), href: "/" },
    { id: "login", label: t("login"), href: "/login" },
    { id: "cooks", label: t("cooks"), href: "/cooks/123" },
    { id: "leaderboard", label: t("leaderboard"), href: "/leaderboard" },
  ];

  const activeTab =
    tabs.find((tab) => pathname === tab.href || pathname.startsWith(tab.href))
      ?.id || "all-recipes";

  return (
    <nav
      ref={tabsRef}
      className={cn("tabs-nav", isSticky && "tabs-nav--sticky")}
    >
      <div className="tabs-container">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          if (tab.id === "login") {
            return (
              <div key={tab.id} className="tab-item">
                <Button onClick={() => setShowAuthModal(true)}>
                  Login / Sign Up
                </Button>

                <AuthModal
                  open={showAuthModal}
                  onOpenChange={setShowAuthModal}
                />
              </div>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn("tab-item", isActive && "tab-item--active")}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
