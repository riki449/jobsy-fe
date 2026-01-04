"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "../constants/roles";
import { useAuth } from "../hooks/useAuth";

export default function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: Role[];
  children: React.ReactNode;
}) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isAuthenticated && !token) {
      router.replace("/login");
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      router.replace("/403");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [isAuthenticated, role, router, allowedRoles]);

  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center h-screen">
        <h1>Checking access...</h1>
      </div>
    );

  return <>{children}</>;
}
