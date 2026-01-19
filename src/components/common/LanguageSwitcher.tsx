"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/src/i18n/request";
import { useState, useTransition } from "react";

const localeNames: Record<Locale, string> = {
  en: "English",
  da: "Dansk",
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  da: "🇩🇰",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = (params?.locale as Locale) || "da";

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");

    startTransition(() => {
      router.push(newPathname);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primaryGreen focus:ring-offset-2"
        disabled={isPending}
      >
        <span className="text-lg">{localeFlags[currentLocale]}</span>
        <span>{localeNames[currentLocale]}</span>
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

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 ${
                    locale === currentLocale
                      ? "bg-gray-50 font-semibold text-primaryGreen"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{localeFlags[locale]}</span>
                  <span>{localeNames[locale]}</span>
                  {locale === currentLocale && (
                    <svg
                      className="ml-auto h-4 w-4 text-primaryGreen"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
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
