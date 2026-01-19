"use client";

import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

type Feature = {
  titleKey: string;
  descriptionKey: string;
  descriptionHighlightKey?: string;
  icon: string;
  linkKey?: string;
};

const features: Feature[] = [
  {
    titleKey: "whyJobsy.features.moreBids.title",
    descriptionKey: "whyJobsy.features.moreBids.description",
    descriptionHighlightKey: "whyJobsy.features.moreBids.descriptionHighlight",
    icon: "/bids.svg",
  },
  {
    titleKey: "whyJobsy.features.freeCommunication.title",
    descriptionKey: "whyJobsy.features.freeCommunication.description",
    descriptionHighlightKey:
      "whyJobsy.features.freeCommunication.descriptionHighlight",
    icon: "/handshake.svg",
  },
  {
    titleKey: "whyJobsy.features.genuineReviews.title",
    descriptionKey: "whyJobsy.features.genuineReviews.description",
    icon: "/star.svg",
  },
  {
    titleKey: "whyJobsy.features.freeToUse.title",
    descriptionKey: "whyJobsy.features.freeToUse.description",
    icon: "/free-of-charge.svg",
  },
  {
    titleKey: "whyJobsy.features.taskGuarantee.title",
    descriptionKey: "whyJobsy.features.taskGuarantee.description",
    icon: "/guarantee.svg",
    linkKey: "common.readMore",
  },
];

const WhyJobsy: React.FC = () => {
  const t = useTranslations();

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-700">
          {t("whyJobsy.title")}
        </h2>

        <div className="grid gap-y-20 gap-x-20 sm:grid-cols-2">
          {features.map((item, index) => {
            const description = item.descriptionHighlightKey
              ? t.rich(item.descriptionKey, {
                  highlight: () => (
                    <b>{t(item.descriptionHighlightKey!)}</b>
                  ),
                })
              : t(item.descriptionKey);

            // For taskGuarantee, pass the amount as a parameter
            const finalDescription =
              item.titleKey === "whyJobsy.features.taskGuarantee.title"
                ? t.rich(item.descriptionKey, {
                    amount: () => <b>{t("whyJobsy.features.taskGuarantee.amount")}</b>,
                  })
                : description;

            return (
              <div key={index} className="flex items-center gap-4">
                <Image alt="img" src={item.icon} width={100} height={100} />

                <div>
                  <h3 className="text-2xl font-semibold text-gray-700">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-500">
                    {finalDescription}
                  </p>

                  {item.linkKey && (
                    <a
                      href="#"
                      className="mt-2 underline inline-block text-sm text-green-600 hover:underline"
                    >
                      {t(item.linkKey)}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyJobsy;
