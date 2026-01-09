"use client";

import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { JobItem } from "@/src/types/job";

interface Props {
  jobs: JobItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function JobList({
  jobs,
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <section className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </section>
  );
}
