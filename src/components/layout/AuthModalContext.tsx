// AuthModalContext.tsx
"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import LoginModal, {
  LoginModalRef,
} from "@/src/features/auth/components/LoginModal";

type AuthModalContextType = {
  openLogin: () => void;
  closeLogin: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const modalRef = useRef<LoginModalRef>(null);

  return (
    <AuthModalContext.Provider
      value={{
        openLogin: () => modalRef.current?.open(),
        closeLogin: () => modalRef.current?.close(),
      }}
    >
      {children}
      <LoginModal ref={modalRef} />
    </AuthModalContext.Provider>
  );
}
