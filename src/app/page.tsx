import HeroSection from "../components/landing-page/FilterSection";
import RatingSection from "../components/landing-page/RatingSection";
import WhyJobsy from "../components/landing-page/WhyJobsy";
import LandingLayout from "../components/layout/LandingLayout";

export default function Home() {
  return (
    <LandingLayout>
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <RatingSection />
        <WhyJobsy />
      </div>
    </LandingLayout>
  );
}
