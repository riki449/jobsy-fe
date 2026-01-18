"use client";

import AppLayout from "@/src/components/layout/AppLayout";
import JobFilter from "@/src/features/home/components/JobFilter";
import JobList from "@/src/features/home/components/JobList";
import {
  useGetJobAreaData,
  useGetJobCategoryData,
  useGetJobList,
} from "@/src/features/jobs/hooks/useJob";
import { JobItem, JobListBodyRequest } from "@/src/features/jobs/types";
import { Drawer } from "antd";
import { useState } from "react";
import DetailJob from "../DetailJob";
import LoadingOverlay from "@/src/components/common/LoadingOverlay";

interface JobSearchScreenProps {
  title: string;
}

export default function JobSearchScreen({ title }: JobSearchScreenProps) {
  const [filters, setFilters] = useState<JobListBodyRequest>({});
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
      // Pass other params if needed
    },
    // Pass filters as body
    filters
  );

  const totalPages = Math.ceil((data?.metadata.total_items ?? 0) / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenJob = (job: JobItem) => {
    setSelectedJob(job);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedJob(null);
  };

  return (
    <AppLayout>
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
        <h2 className="mb-4 mt-6 text-lg font-semibold">{title}</h2>

        <LoadingOverlay
          loading={
            isPending || isPendingMasterDataArea || isPendingMasterDataCat
          }
        >
          <JobList
            jobs={data?.data || []}
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onJobClick={handleOpenJob}
          />
        </LoadingOverlay>

        <Drawer
          title={selectedJob?.title}
          placement="right"
          onClose={handleCloseDrawer}
          open={isDrawerOpen}
          size={1000}
          className="custom-drawer"
        >
          {selectedJob ? (
            <div className="space-y-2">
              <DetailJob job={selectedJob} />
            </div>
          ) : null}
        </Drawer>
      </div>
    </AppLayout>
  );
}
