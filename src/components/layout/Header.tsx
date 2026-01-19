"use client";

import Button from "@/src/components/common/Button";
import Logo from "@/src/components/common/Logo";
import UserAvatarMenu from "@/src/features/auth/components/UserAvatarMenu";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import HeaderNav from "./HeaderNav";
import Sidebar from "./SideBar";
import { AuthModalProvider } from "./AuthModalContext";

export default function Header() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "da";
  const { isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // mount immediately when opening
  const openSidebar = () => {
    setMounted(true);
    requestAnimationFrame(() => setOpen(true));
  };

  // animate out, then unmount
  const closeSidebar = () => {
    setOpen(false);
    setTimeout(() => setMounted(false), 300);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[url('/headerBg.svg')] bg-repeat">
        <div className="mx-auto flex h-18.5! max-w-7xl items-center justify-between px-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden cursor-pointer text-white"
              onClick={openSidebar}
              aria-label="Open menu"
            >
              ☰
            </button>

            <Logo variant="light" className="text-white" />
            <HeaderNav />
          </div>

          {/* Right */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Saldo: 355,00 DKK
              </span>
              <AuthModalProvider>
                <UserAvatarMenu />
              </AuthModalProvider>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Tilmeld Firma</Button>
              <div
                onClick={() => router.push(`/${locale}/login`)}
                className="cursor-pointer px-4 py-1.5 text-sm font-medium text-[#c3c3c3]"
              >
                Log ind
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile sidebar */}
      {mounted && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <div
            className={`absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-xl
            transform transition-transform duration-300 ease-out
            ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
