"use client";

import { useState, useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase";
import Cookies from "js-cookie";
import clsx from "clsx";
import styles from "./AuthModal.module.scss";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Label from "@/components/ui/Label/Label";

export default function AuthModal() {
  const { addToast, authModal, closeAuthModal } = useUIStore();
  const { setUser, fetchProfile } = useAuthStore();

  const { isOpen, options } = authModal;

  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setTab("login");
    }
  }, [isOpen]);

  const handleLogin = async () => {
    if (!email || !password) return addToast("Email and password required", 'error');

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser(data.user);
      await fetchProfile();

      // Sync cookie with preferred mode from profile (if set)
      if (data.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("preferred_mode")
          .eq("id", data.user.id)
          .single();

        if (profile?.preferred_mode) {
          Cookies.set("ds_mode", profile.preferred_mode, {
            expires: 30,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });
        }
      }

      addToast("Logged in successfully", "success");
      closeAuthModal();

      options?.onSuccess?.();
      if (options?.redirectAfter) {
        window.location.href = options.redirectAfter;
      }
    } catch (err: any) {
      addToast(err.message || "Login failed", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !password)
      return addToast("All fields required", 'error');

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("No user returned");

      await supabase.auth.signInWithPassword({ email, password });

      setUser(data.user);
      await fetchProfile();

      addToast("Account created — welcome!", 'success');
      closeAuthModal();

      options?.onSuccess?.();
      if (options?.redirectAfter) {
        window.location.href = options.redirectAfter;
      }
    } catch (err: any) {
      addToast(err.message || "Signup failed", 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeAuthModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={closeAuthModal}>
          ×
        </button>

        <h2 className={styles.title}>Welcome to Dip-Slay</h2>

        <div className={styles.tabs}>
          <button
            className={clsx(styles.tab, tab === "login" && styles.active)}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={clsx(styles.tab, tab === "signup" && styles.active)}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" ? (
          <div className={styles.form}>
            <div className={styles.field}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              variant="watcher"
              size="large"
              onClick={handleLogin}
              disabled={loading}
              className={styles.submit}
            >
              {loading ? "Logging in…" : "Login"}
            </Button>
          </div>
        ) : (
          <div className={styles.form}>
            <div className={styles.field}>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Your handle"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="email-signup">Email</Label>
              <Input
                id="email-signup"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="password-signup">Password</Label>
              <Input
                id="password-signup"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              variant="slayer"
              size="large"
              onClick={handleSignup}
              disabled={loading}
              className={styles.submit}
            >
              {loading ? "Creating…" : "Sign Up"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
