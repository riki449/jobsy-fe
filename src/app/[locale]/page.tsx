"use client";

import HeroSection from "@/src/features/landing/components/FilterSection";
import NotificationPanel from "@/src/features/landing/components/NotificationPanel";
import RatingSection from "@/src/features/landing/components/RatingSection";
import WhyJobsy from "@/src/features/landing/components/WhyJobsy";
import {
  useGetFeatured,
  useWhatHappeningNow,
} from "@/src/features/landing/hooks/useWelcome";
import LandingLayout from "@/src/components/layout/LandingLayout";

export default function Home() {
  const { data: responseWhatHappeningNow, isPending } = useWhatHappeningNow();
  const { data: featuredData } = useGetFeatured();
  console.log("featuredData", featuredData);
  return (
    <LandingLayout>
      <div className="flex flex-col min-h-screen relative">
        <HeroSection />
        <RatingSection data={featuredData} />
        <WhyJobsy />
        <NotificationPanel
          isLoading={isPending}
          data={responseWhatHappeningNow?.data || []}
        />
      </div>
    </LandingLayout>
  );
}
