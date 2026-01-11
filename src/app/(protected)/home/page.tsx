"use client";

import AuthGuard from "@/src/components/AuthGuard";
import JobFilter from "@/src/components/home/JobFilter";
import JobList from "@/src/components/home/JobList";
import AppLayout from "@/src/components/layout/AppLayout";
import { Role } from "@/src/constants/roles";
import {
  useGetJobList,
  useGetJobAreaData,
  useGetJobCategoryData,
} from "@/src/hooks/useJob";
import { JobListBodyRequest } from "@/src/types/job";
import { useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<JobListBodyRequest>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { data: masterDataArea, isPending: isPendingMasterDataArea } =
    useGetJobAreaData();

  const { data: masterDataCategory, isPending: isPendingMasterDataCat } =
    useGetJobCategoryData();

  const { data, isPending } = useGetJobList(
    {
      page: currentPage,
      page_size: pageSize,
    },
    filters
  );

  const totalPages = Math.ceil((data?.metadata.total_items ?? 0) / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AuthGuard allowedRoles={[Role.USER]}>
      <AppLayout
        isLoading={
          isPending || isPendingMasterDataCat || isPendingMasterDataArea
        }
      >
        <div className="min-h-screen">
          <JobFilter
            onSearch={(queries) => {
              const normalizedPayload = {
                ...queries,
                reg: queries?.reg?.map(String),
              };
              setFilters(normalizedPayload);
            }}
            areaData={masterDataArea?.areas}
            categoryData={masterDataCategory?.groups}
          />
          <h2 className="mb-4 mt-6 text-lg font-semibold">
            Opgaver i nærheden
          </h2>

          <JobList
            jobs={data?.data || []}
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
