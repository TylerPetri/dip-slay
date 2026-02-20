"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase-client";

type AuthTab = "login" | "signup";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signup?: boolean;
}

export default function AuthModal({
  open,
  onOpenChange,
  signup = false,
}: AuthModalProps) {
  const t = useTranslations("Auth.Modal");
  const router = useRouter();
  const { user, loading } = useAuth();

  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (signup) {
      setActiveTab("signup");
    } else {
      setActiveTab("login");
    }
  }, [signup, open]);

  useEffect(() => {
    if (user && open && !loading) {
      toast.success(
        activeTab === "login" ? t("login.success") : t("signup.success"),
        { duration: 5000, icon: "🔥" },
      );

      onOpenChange(false);

      router.push("/dips/new");
    }
  }, [signup, user, open, loading, router, t, onOpenChange, activeTab]);

  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const validateLogin = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    if (!password.trim()) {
      newErrors.password = t("form.errors.passwordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("form.errors.passwordShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    if (!password.trim()) {
      newErrors.password = t("form.errors.passwordRequired");
    } else if (password.length < 6) {
      newErrors.password = t("form.errors.passwordShort");
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = t("form.errors.confirmRequired");
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = t("form.errors.confirmMismatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = activeTab === "login" ? validateLogin() : validateSignup();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      let result;

      if (activeTab === "login") {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dips/new`,
          },
        });
      }

      if (result.error) {
        throw result.error;
      }
    } catch (err: unknown) {
      let message = t("form.errors.submitFailed");

      if (err instanceof AuthError) {
        message = err.message;
        if (err.code === "invalid_credentials") {
          message = t("form.errors.invalidCredentials");
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="auth-overlay" />

        <Dialog.Content className="auth-modal">
          <Dialog.Close asChild>
            <button className="close-btn" aria-label={t("close")}>
              <X size={28} strokeWidth={2.5} />
            </button>
          </Dialog.Close>

          {/* <div className="auth-tabs">
            <button
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => switchTab("login")}
            >
              {t("tabs.login")}
            </button>
            <button
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => switchTab("signup")}
            >
              {t("tabs.signup")}
            </button>
            <div className="tab-indicator" data-active={activeTab} />
          </div> */}

          <form onSubmit={handleSubmit} className="auth-content">
            <Dialog.Title className="modal-title">
              {activeTab === "login" ? t("login.title") : t("signup.title")}
            </Dialog.Title>
            <Dialog.Description className="modal-subtitle">
              {activeTab === "login"
                ? t("login.subtitle")
                : t("signup.subtitle")}
            </Dialog.Description>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t("form.email")}
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("form.emailPlaceholder")}
                error={errors.email}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                {t("form.password")}
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("form.passwordPlaceholder")}
                error={errors.password}
                required
              />
            </div>

            {activeTab === "signup" && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  {t("form.confirmPassword")}
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("form.confirmPlaceholder")}
                  error={errors.confirmPassword}
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("form.submitting")
                : activeTab === "login"
                  ? t("login.submit")
                  : t("signup.submit")}
            </Button>

            <div className="social-buttons">
              <Button variant="outline" size="large" className="social-btn">
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {activeTab === "login" ? t("login.x") : t("signup.x")}
              </Button>

              <Button variant="outline" size="large" className="social-btn">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.31-.98 2.42-2.07 3.16v2.63h3.35c1.96-1.81 3.09-4.47 3.09-7.99z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.35-2.63c-1.01.68-2.29 1.08-3.93 1.08-3.02 0-5.58-2.04-6.49-4.79H.96v2.67C2.75 20.99 6.87 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.51 14.21c-.23-.68-.36-1.41-.36-2.21s.13-1.53.36-2.21V7.34H.96C.35 8.85 0 10.39 0 12s.35 3.15.96 4.66l4.55-2.45z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.98c1.64 0 3.11.56 4.27 1.66l3.19-3.19C17.46 1.01 14.97 0 12 0 6.87 0 2.75 2.01.96 4.96l4.55 2.45C6.42 5.02 9.02 4.98 12 4.98z"
                  />
                </svg>
                {activeTab === "login" ? t("login.google") : t("signup.google")}
              </Button>
            </div>

            <p className="switch-prompt">
              {activeTab === "login"
                ? t("login.switchPrompt")
                : t("signup.switchPrompt")}{" "}
              <button
                type="button"
                className="switch-link"
                onClick={() =>
                  switchTab(activeTab === "login" ? "signup" : "login")
                }
              >
                {activeTab === "login" ? t("tabs.signup") : t("tabs.login")}
              </button>
            </p>

            <p className="auth-legal">
              {t("legal")}{" "}
              <Link href="/terms" className="legal-link">
                {t("terms")}
              </Link>{" "}
              {t("and")}{" "}
              <Link href="/privacy" className="legal-link">
                {t("privacy")}
              </Link>
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
