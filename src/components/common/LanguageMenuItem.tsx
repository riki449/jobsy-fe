"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/src/i18n/request";
import { useTransition, useEffect, useState } from "react";

const localeNames: Record<Locale, string> = {
  en: "English",
  da: "Dansk",
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  da: "🇩🇰",
};

const LOCALE_STORAGE_KEY = "preferred-locale";

export default function LanguageMenuItem() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  const currentLocale = (params?.locale as Locale) || "da";

  useEffect(() => {
    setMounted(true);
    // Load saved locale preference on mount
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (savedLocale && savedLocale !== currentLocale && locales.includes(savedLocale)) {
      switchLocale(savedLocale);
    }
  }, []);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale || !mounted) return;

    // Save to localStorage
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    startTransition(() => {
      router.push(newPathname);
    });
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={isPending}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            locale === currentLocale
              ? "bg-primaryGreen text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span>{localeFlags[locale]}</span>
          <span>{localeNames[locale]}</span>
        </button>
      ))}
    </div>
  );
}
