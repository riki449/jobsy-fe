import { API_ENDPOINTS } from "@/src/constants/api-endpoints";
import { api } from "@/src/lib/axios";
import { IGetCategoryByParentParams, IGetWhatHappenNowParams } from "../types";

export const getTotalUserApi = async () => {
  const { data } = await api.get(API_ENDPOINTS.WELCOME.TOTAL_USERS);
  return data.data;
};

export const getFeaturedApi = async () => {
  const { data } = await api.get(API_ENDPOINTS.WELCOME.FEATURED);
  return data.data;
};

export const getCategoryByParentApi = async (
  params: IGetCategoryByParentParams
) => {
  const { data } = await api.get(
    API_ENDPOINTS.WELCOME.CATEGORY_BY_PARENT(params.id)
  );
  return data.data;
};

export const getWhatHappenNowApi = async (params: IGetWhatHappenNowParams) => {
  const res = await api.get(API_ENDPOINTS.WELCOME.HAPPENING_NOW, {
    params: params,
  });
  return res.data;
};
