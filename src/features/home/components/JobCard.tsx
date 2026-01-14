import { JobItem } from "@/src/features/jobs/types";
import { Divider } from "antd";

interface Props {
  job: JobItem;
  onClick?: () => void;
}

export default function JobCard({ job, onClick }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between rounded-xl bg-white p-5 shadow-sm border border-zinc-100">
      {/* Left */}
      <div className="flex gap-4 flex-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold">
          ⚡
        </div>

        <div className="w-full">
          <div className="flex flex-row justify-between">
            <h3 className="font-semibold text-zinc-900">{job.title}</h3>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              {job.category_title}
            </span>
          </div>

          <p className="text-sm text-zinc-500 mt-1">
            📍 {"Location"} ({job?.distance || 36} km) · # ID: {job.id}
          </p>

          <p className="mt-2 text-sm text-zinc-600">
            {job.description}
            <span className="ml-1 text-green-600 cursor-pointer" onClick={onClick}>Læs mere</span>
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {/* {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-600"
              >
                {tag}
              </span>
            ))} */}
          </div>
        </div>
      </div>

      <Divider vertical className="h-35! bg-lightGray mx-6!" />

      {/* Right */}
      <div className="flex min-w-50 flex-row lg:flex-col items-start justify-between">
        <div className="mt-2">
          <p className="text-xs font-semibold text-zinc-500">BUDGET</p>
          <p className="font-semibold text-zinc-900">
            {job.budget.toLocaleString("da-DK")} DKK
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white text-sm">
            {/* {job.customerInitials} */}
          </div>
          <span className="text-sm text-zinc-600">{job.username}</span>
        </div>

        <button className="mt-4 w-full max-w-50 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
          Send tilbud →
        </button>
      </div>
    </div>
  );
}
