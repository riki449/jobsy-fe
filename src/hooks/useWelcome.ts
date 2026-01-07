import { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";
import {
  getCategoryByParentApi,
  getTotalUserApi,
  getWhatHappenNowApi,
} from "../networks/welcomeApis";
import {
  ICategoryResponse,
  IGetCategoryByParentParams,
  IGetWhatHappenNowParams,
  ITotalUserResponse,
  IWhatHappenNowResponse,
} from "../types/welcome";

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
