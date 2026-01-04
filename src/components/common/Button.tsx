"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center cursor-pointer justify-center rounded-lg font-medium transition";

  const variants: Record<Variant, string> = {
    primary: "bg-primaryGreen text-white px-4 py-2 hover:opacity-90",
    secondary: "bg-white border border-[#DBDFE7] px-4 py-2 hover:opacity-90",
    link: "text-sm text-blue-600 hover:underline px-2 py-1",
  };

  return (
    <button className={twMerge(base, variants[variant], className)} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
