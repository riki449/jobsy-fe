// types/job.ts
export interface JobItem {
  id: string;
  title: string;
  location: string;
  distanceKm: number;
  jobId: string;
  dateLabel: string; // "i dag" | "i går"
  description: string;
  tags: string[];
  budget: number;
  customerName: string;
  customerInitials: string;
}

export interface JobListResponse {
  id: string;
}

export interface JobListRequest {
  page_size: number;
  page: number;
}
