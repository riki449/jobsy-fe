// components/JobList.tsx
"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { JobItem } from "@/src/types/job";

interface Props {
  jobs: JobItem[];
  pageSize?: number;
}

export default function JobList({ jobs, pageSize = 4 }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / pageSize);
  const pagedJobs = jobs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section className="space-y-4">
      {pagedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
}
