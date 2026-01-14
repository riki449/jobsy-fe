"use client";

import { JobItem } from "@/src/features/jobs/types";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

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
  return (
    <section className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobClick?.(job)} />
      ))}

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </section>
  );
}
