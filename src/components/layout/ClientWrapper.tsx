"use client";

import { ReactNode } from "react";
import AuthModal from "@/components/auth/AuthModal";
import ToastContainer from "@/components/ui/ToastContainer/ToastContainer";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthModal />
      <ToastContainer />
      {children}
    </>
  );
}
