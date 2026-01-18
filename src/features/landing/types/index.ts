export interface IGetWhatHappenNowParams {
  page_size: number;
  page: number;
}

export interface IGetCategoryByParentParams {
  id: string;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  parent: number | null;
  status: "active" | "inactive";
  allow_empty_description: 0 | 1;
  double_zip: 0 | 1;
  is_last_save_view: boolean;
  level: number;
  children: ICategory[];
}

export interface ICategoryResponse {
  categories: ICategory[];
}

export interface ITotalUserResponse {
  total_users: number;
}

export interface IActivityItem {
  id: number;
  minutes_ago: number;
  event: "sent_bid" | string;
  user_name: string;
  company_name: string;
  company_link: string;
  job_title: string;
  job_link: string;
  avatar_id: string | null;
  rating: number | null;
  company_id: number;
}
export interface IWhatHappenNowResponse {
  data: IActivityItem[];
}

export interface ReviewsBlock {
  count: number;
  items: ReviewItem[];
}

export interface ReviewItem {
  review_id: number;
  rating: number;
  message: string;
  created_at: string; // ISO datetime
  stars_count: number;
  user: ReviewUser;
  company: ReviewCompany;
  job: ReviewJob;
}

export interface ReviewUser {
  user_id: number;
  full_name: string;
  first_name: string;
}

export interface ReviewCompany {
  company_id: number;
  company_name: string;
  company_slug: string;
  company_url: string;
}

export interface ReviewJob {
  job_id: number;
  headline: string;
  category_id: number;
}

export interface CompaniesBlock {
  count: number;
  items: CompanyItem[];
  group_company_points: Record<string, number>;
}

export interface CompanyItem {
  company_id: number;
  company_name: string;
  company_slug: string;
  company_url: string;
  avatar_url: string;
  has_avatar: boolean;
  project: string;
  rating_average: number;
  rating_count: number;
  trust_position: string; // API returns string
  group_id: number;
}

export interface ReviewsAndCompaniesResponse {
  reviews: ReviewsBlock;
  companies: CompaniesBlock;
}
