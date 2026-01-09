"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "./SideBar";
import UserMenu from "./UserMenu";
import Button from "../common/Button";
import HeaderNav from "./HeaderNav";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 overflow-hidden bg-[url('/headerBg.svg')] bg-repeat">
        {/* <header className="sticky top-0 z-40 border-b border-[#DDF0FF] bg-white"> */}
        <div className="mx-auto flex h-18.5! max-w-7xl items-center justify-between px-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-white cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="flex items-end gap-2">
              <span
                onClick={() => {
                  router.push("/");
                }}
                className="text-4xl text-white cursor-pointer font-semibold"
              >
                Jobsy
              </span>
              <span className="text-[16px] text-white font-semibold">
                Billigst hver gang
              </span>
            </div>

            {/* Navigation tabs */}
            <HeaderNav />
          </div>

          {/* Right */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Saldo: 355,00 DKK
              </span>

              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Tilmeld Firma</Button>

              <div
                onClick={() => {
                  router.push("/login");
                }}
                className="text-[#c3c3c3] text-sm font-medium cursor-pointer px-4 py-1.5"
              >
                Log ind
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
