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
