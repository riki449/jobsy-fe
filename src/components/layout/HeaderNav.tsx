"use client";

import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const NAV_ITEMS = [
  { label: "Indhent tilbud", href: "/" },
  { label: "Søg i prislister", href: "/prices" },
  { label: "Bedømmelser", href: "/reviews" },
];

export default function HeaderNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-8 ml-8">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <button
            key={item.href}
            // onClick={() => router.push(item.href)}
            className={twMerge(
              "relative text-base font-normal text-[#C3C3C3] transition hover:text-white",
              isActive && "text-white"
            )}
          >
            {item.label}

            {isActive && (
              <span className="absolute -bottom-2 left-0 h-0.75 w-full rounded bg-green-500" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
