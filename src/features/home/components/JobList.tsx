"use client";

import { JobItem } from "@/src/features/jobs/types";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { Empty } from "antd";

interface Props {
  jobs: JobItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onJobClick?: (job: JobItem) => void;
}

export default function JobList({
  jobs,
  page,
  totalPages,
  onPageChange,
  onJobClick,
}: Props) {
  if (jobs.length === 0) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Empty
          description={
            <div className="text-sm text-zinc-600">
              <p className="font-semibold text-zinc-800">Ingen job fundet</p>
              <p className="mt-1">
                Prøv at ændre dine filtre eller søgekriterier
              </p>
            </div>
          }
        />
      </section>
    );
  }

  return (
    <section className="space-y-4 min-h-[60vh]">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick?.(job)} />
      ))}

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </section>
  );
}
