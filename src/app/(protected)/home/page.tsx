"use client";

import AuthGuard from "@/src/components/AuthGuard";
import JobFilter from "@/src/components/home/JobFilter";
import JobList from "@/src/components/home/JobList";
import AppLayout from "@/src/components/layout/AppLayout";
import { Role } from "@/src/constants/roles";
import { JobItem } from "@/src/types/job";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const jobs: JobItem[] = Array.from({ length: 10 }).map((_, index) => ({
  id: "1",
  title: "Opsætning af elbil ladeboks",
  location: "7600 Struer",
  distanceKm: 184,
  jobId: "454590",
  dateLabel: "i dag",
  description: "Vi ønsker tilbud på opsætning af ladeboks til elbil...",
  tags: ["Elektriker", "Opsætning af ladeboks"],
  budget: 8000,
  customerName: "Juliet",
  customerInitials: "J",
}));

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <AuthGuard allowedRoles={[Role.USER]}>
      <AppLayout>
        <div className="min-h-screen">
          <JobFilter onSearch={() => {}} />
          <h2 className="mb-4 mt-6 text-lg font-semibold">
            Opgaver i nærheden
          </h2>
          <JobList jobs={jobs} />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
