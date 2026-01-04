"use client";

import { useState } from "react";
import Sidebar from "./SideBar";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* <header className="sticky top-0 z-40 overflow-hidden bg-[url('/headerBg.svg')] bg-repeat"> */}
      <header className="sticky top-0 z-40 border-b border-[#DDF0FF] bg-white">
        <div className="mx-auto flex h-18.5! max-w-7xl items-center justify-between px-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="flex items-end gap-2">
              <span
                onClick={() => {
                  router.push("/home");
                }}
                className="text-4xl cursor-pointer font-semibold"
              >
                Jobsy
              </span>
              <span className="text-[16px] font-semibold">
                Billigst hver gang
              </span>
            </div>
          </div>

          {/* Right */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Saldo: 355,00 DKK
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium">
                TU
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="rounded-full cursor-pointer bg-green-100 px-3 h-8 items-center justify-center flex text-sm font-medium text-green-700">
                Tilmeld Firma
              </span>

              <div
                onClick={() => {
                  router.push("/login");
                }}
                className="flex cursor-pointer h-8 px-4 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium"
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
