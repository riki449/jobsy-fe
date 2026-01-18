"use client";

import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Not logged in then go to login
    if (!isAuthenticated && !token) {
      if (pathname !== "/login") {
        router.replace("/login");
      }
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [isAuthenticated, role, router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  return <>{children}</>;
}
