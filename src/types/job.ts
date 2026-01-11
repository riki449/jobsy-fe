// types/job.ts

export interface JobAttribute {
  id: number;
  title: string;
  values: JobAttributeValue[];
}

export interface JobAttributeValue {
  id: number;
  value: string;
}

export interface JobItem {
  id: number;
  title: string;
  description: string;
  budget: number;
  created_at: string; // ISO date string
  updated_at: string | null;

  category_id: number;
  industry_type: number;
  category_title: string;

  user_id: number;
  user_name: string;
  username: string;
  user_avatar: string | null;
  user_mit_id_uniqueid: string;
  user_has_made_payment_before: boolean;

  zip: number;
  zip2: number;
  zip_title: string;
  zip2_title: string | null;

  bid_count: number;

  secondary_category1_title: string | null;
  secondary_category2_title: string | null;
  secondary_category3_title: string | null;
  secondary_category4_title: string | null;
  secondary_category5_title: string | null;
  secondary_category6_title: string | null;

  attachments: unknown[];
  attributes: JobAttribute[];
  distance?: number;
}

export interface PaginationMetadata {
  current_page: number;
  page_size: number;
  total_items: number;
}

export interface JobListResponse {
  code: string;
  message: string;
  data: JobItem[];
  metadata: PaginationMetadata;
}

export interface JobListRequest {
  page_size: number;
  page: number;
}

export interface JobListBodyRequest {
  reg?: string[];
  cat?: number[];
  job_to_find?: string;
  job_size?: number[];
}

export interface JobCategory {
  id: number;
  title: string;
  slug: string;
  parent: number | null;
  status: "active" | "inactive";
  allow_empty_description: 0 | 1;
  double_zip: 0 | 1;
  is_last_save_view: boolean;
  level: number;
  children: JobCategory[];
}

export interface JobCategoryGroup {
  parent: JobCategory;
  categories: JobCategory[];
}

export interface JobCategoryGroupData {
  groups: JobCategoryGroup[];
}

// Represents a single area item
export interface Area {
  id: number;
  title: string;
  slug: string;
  is_last_save_view: boolean;
}

// Represents the "data" object containing areas
export interface JobAreasResponse {
  areas: Area[];
}
