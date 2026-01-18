import { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";
import {
  getCategoryByParentApi,
  getFeaturedApi,
  getTotalUserApi,
  getWhatHappenNowApi,
} from "../api/welcomeApi";
import {
  ICategoryResponse,
  IGetCategoryByParentParams,
  IGetWhatHappenNowParams,
  ITotalUserResponse,
  IWhatHappenNowResponse,
  ReviewsAndCompaniesResponse,
} from "../types";

export const useGetCategory = createMutation<
  ICategoryResponse,
  IGetCategoryByParentParams,
  AxiosError
>({
  mutationFn: getCategoryByParentApi,
});

export const useGetTotalUser = createQuery<
  ITotalUserResponse,
  void,
  AxiosError
>({
  queryKey: ["total-user"],
  fetcher: getTotalUserApi,
});

export const useWhatHappeningNow = createQuery<
  IWhatHappenNowResponse,
  IGetWhatHappenNowParams,
  AxiosError
>({
  queryKey: ["get-what-happening-now"],
  fetcher: getWhatHappenNowApi,
});

export const useGetFeatured = createQuery<
  ReviewsAndCompaniesResponse,
  void,
  AxiosError
>({
  queryKey: ["get-featured"],
  fetcher: getFeaturedApi,
});
