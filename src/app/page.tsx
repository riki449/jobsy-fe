"use client";

import HeroSection from "@/src/features/landing/components/FilterSection";
import NotificationPanel from "@/src/features/landing/components/NotificationPanel";
import RatingSection from "@/src/features/landing/components/RatingSection";
import WhyJobsy from "@/src/features/landing/components/WhyJobsy";
import { useWhatHappeningNow } from "@/src/features/landing/hooks/useWelcome";
import LandingLayout from "../components/layout/LandingLayout";

export default function Home() {
  const { data: responseWhatHappeningNow, isPending } = useWhatHappeningNow();
  return (
    <LandingLayout>
      <div className="flex flex-col min-h-screen relative">
        <HeroSection />
        <RatingSection />
        <WhyJobsy />
        <NotificationPanel
          isLoading={isPending}
          data={responseWhatHappeningNow?.data || []}
        />
      </div>
    </LandingLayout>
  );
}
