"use client";

import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { JobItem } from "@/src/types/job";
import { Empty } from "antd";

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
  const hasJobs = jobs && jobs.length > 0;

  return (
    <section className="space-y-4 min-h-[60vh]">
      {hasJobs ? (
        <>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={onPageChange}
          />
        </>
      ) : (
        <div className="flex min-h-[60vh] flex-1 items-center justify-center">
          <Empty
            description="Ingen opgaver fundet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="py-10"
          />
        </div>
      )}
    </section>
  );
}
