"use client";

import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LoadingOverlayProps = {
  loading: boolean;
  children: ReactNode;
  blur?: boolean;
  className?: string;
};

export default function LoadingOverlay({
  loading,
  children,
  blur = true,
  className,
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}

      {loading && (
        <div
          className={twMerge(
            "absolute inset-0 z-40 flex items-center justify-center bg-black/30"
          )}
        >
          {blur && (
            <div
              className={twMerge(
                "absolute inset-0 backdrop-blur-sm",
                className
              )}
            />
          )}

          <div className="relative z-50 h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}
    </div>
  );
}
