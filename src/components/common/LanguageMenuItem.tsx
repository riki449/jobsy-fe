"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/src/i18n/request";
import { useTransition, useEffect, useState } from "react";
import { GlobalOutlined, CheckOutlined } from "@ant-design/icons";

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
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false);
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{localeFlags[currentLocale]}</span>
          <span className="font-medium">{localeNames[currentLocale]}</span>
        </div>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute left-0 right-0 z-[101] mt-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  disabled={isPending}
                  className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors ${
                    locale === currentLocale
                      ? "bg-primaryGreen/10 text-primaryGreen font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{localeFlags[locale]}</span>
                    <span>{localeNames[locale]}</span>
                  </div>
                  {locale === currentLocale && (
                    <CheckOutlined className="text-primaryGreen" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
