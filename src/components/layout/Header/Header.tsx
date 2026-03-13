"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import Cookies from "js-cookie";
import clsx from "clsx";
import styles from "./Header.module.scss";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/stores/authStore";
import Dropdown from "@/components/ui/Dropdown/Dropdown";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, logout } = useAuthStore();

  const [mode, setMode] = useState<"slayer" | "watcher" | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = Cookies.get("ds_mode") as "slayer" | "watcher" | undefined;

    let derivedMode: "slayer" | "watcher" | null = null;
    if (
      pathname.startsWith("/slayer") ||
      pathname.startsWith("/en/slayer") ||
      pathname.startsWith("/fr/slayer")
    ) {
      derivedMode = "slayer";
    } else if (
      pathname.startsWith("/watcher") ||
      pathname.startsWith("/en/watcher") ||
      pathname.startsWith("/fr/watcher")
    ) {
      derivedMode = "watcher";
    }

    const finalMode = stored || derivedMode;
    setMode(finalMode || null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const oppositeMode = mode === "slayer" ? "watcher" : "slayer";
  const isSlayer = mode === "slayer";

  const handleSwitchMode = () => {
    if (!oppositeMode) return;

    Cookies.set("ds_mode", oppositeMode, {
      expires: 30,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    router.push(`/${oppositeMode}`);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
    setDropdownOpen(false);
  };

  // Hide header on landing
  if (!mode || pathname === "/" || pathname === "/en" || pathname === "/fr") {
    return null;
  }

  const initials = profile?.username?.slice(0, 2).toUpperCase() || "U";

  return (
    <header
      className={clsx(styles.header, isSlayer ? styles.slayer : styles.watcher)}
    >
      <div className={styles.inner}>
        {/* Mode indicator */}
        <div className={styles.modeBadge}>
          <span className={styles.modeText}>
            {isSlayer ? "Slayer Mode" : "Watcher Mode"}
          </span>
        </div>

        {/* Switch button (visible always) */}
        <Button
          variant={isSlayer ? "watcher" : "slayer"}
          size="medium"
          onClick={handleSwitchMode}
          className={styles.switchButton}
        >
          Switch to {oppositeMode === "slayer" ? "Slayer" : "Watcher"}
        </Button>

        {/* User dropdown (only when logged in) */}
        {user && (
          <Dropdown
            trigger={
              <div className={styles.userTrigger}>
                <div className={styles.avatar}>
                  <span>
                    {profile?.username?.slice(0, 2).toUpperCase() || "U"}
                  </span>
                </div>
                <span className={styles.username}>
                  {profile?.username || user.email?.split("@")[0] || "User"}
                </span>
              </div>
            }
            align="right"
            width="auto"
          >
            {/* Menu items */}
            <button
              className={styles.menuItem}
              onClick={() => {
                router.push("/profile"); // or wherever your profile lives
              }}
            >
              Profile / Settings
            </button>

            <button className={styles.menuItem} onClick={handleSwitchMode}>
              Switch to {oppositeMode === "slayer" ? "Slayer" : "Watcher"} Mode
            </button>

            <button
              className={clsx(styles.menuItem, styles.destructive)}
              onClick={handleLogout}
            >
              Logout
            </button>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
