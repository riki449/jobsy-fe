"use client";

import { useRouter, useParams } from "next/navigation";

interface LogoProps {
  variant?: "light" | "dark";
  showSlogan?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Logo({
  variant = "dark",
  showSlogan = true,
  className = "",
  onClick,
}: LogoProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "da";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/${locale}`);
    }
  };

  const textColor = variant === "light" ? "text-white" : "text-zinc-900";

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <span
        onClick={handleClick}
        className={`text-4xl cursor-pointer font-semibold ${textColor}`}
      >
        Jobsy
      </span>
      {showSlogan && (
        <span className={`text-[16px] font-semibold ${textColor}`}>
          Billigst hver gang
        </span>
      )}
    </div>
  );
}
