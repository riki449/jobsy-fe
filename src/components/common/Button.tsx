"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "link" | "outline";

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
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center h-9 justify-center cursor-pointer rounded-lg font-medium transition";

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";

  const variants: Record<Variant, string> = {
    primary: "bg-primaryGreen text-white px-4 py-2 hover:opacity-90",
    secondary: "bg-white border border-[#DBDFE7] px-4 py-2 hover:opacity-90",
    link: "text-sm text-blue-600 hover:underline px-2 py-1",
    outline: "border border-green-600 text-green-600 px-4",
  };

  return (
    <button
      disabled={disabled}
      className={twMerge(
        base,
        variants[variant],
        disabled && disabledStyles,
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
