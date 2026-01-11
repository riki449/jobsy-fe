"use client";

import HeroSection from "../components/landing-page/FilterSection";
import NotificationPanel from "../components/landing-page/NotificationPanel";
import RatingSection from "../components/landing-page/RatingSection";
import WhyJobsy from "../components/landing-page/WhyJobsy";
import LandingLayout from "../components/layout/LandingLayout";
import { useWhatHappeningNow } from "../hooks/useWelcome";

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
