import { API_ENDPOINTS } from "../constants/api-endpoints";
import {
  IGetCategoryByParentParams,
  IGetWhatHappenNowParams,
} from "../types/welcome";
import { api } from "./axios";

export const getTotalUserApi = async () => {
  const { data } = await api.get(API_ENDPOINTS.WELCOME.TOTAL_USERS);
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
