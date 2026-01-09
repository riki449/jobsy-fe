"use client";

import HeroSection from "../components/landing-page/FilterSection";
import NotificationPanel from "../components/landing-page/NotificationPanel";
import RatingSection from "../components/landing-page/RatingSection";
import WhyJobsy from "../components/landing-page/WhyJobsy";
import LandingLayout from "../components/layout/LandingLayout";
import { useWhatHappeningNow } from "../hooks/useWelcome";

const data = [
  {
    id: 82,
    minutes_ago: 1747811949,
    event: "sent_bid",
    user_name: "Jeanette",
    company_name: "D&K Transport Group",
    company_link: "d-k-transport-group",
    job_title: "Privatflytning af 60-70 m2 lejlighed i Slagelse",
    job_link: "-4765364",
    avatar_id: "selected_part_636f650e933af.jpeg",
    rating: null,
    company_id: 78441,
  },
  {
    id: 86,
    minutes_ago: 1747811949,
    event: "message_client_to_comp",
    user_name: "Emilie",
    company_name: "D.B. Byggefirma",
    company_link: "db-byggefirma",
    job_title: "Tømrer  Eskebjerg",
    job_link: "-7249754",
    avatar_id: null,
    rating: null,
    company_id: 108858,
  },
  {
    id: 87,
    minutes_ago: 1747811949,
    event: "message_client_to_comp",
    user_name: "Jens",
    company_name: "J.Transport",
    company_link: "jtransport",
    job_title: "Flytning fra villa i Børkop til lejlighed i Vejle",
    job_link: "-2022113",
    avatar_id: "selected_part_63680080eeefb.jpg",
    rating: null,
    company_id: 97570,
  },
];

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
