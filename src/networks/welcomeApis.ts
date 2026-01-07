import {
  IGetCategoryByParentParams,
  IGetWhatHappenNowParams,
} from "../types/welcome";
import { api } from "./axios";

export const getTotalUserApi = async () => {
  const { data } = await api.get("/stats/users/total");
  return data.data;
};

export const getCategoryByParentApi = async (
  params: IGetCategoryByParentParams
) => {
  const { data } = await api.get("/get_category_by_parent/" + params.id);
  return data.data;
};

export const getWhatHappenNowApi = async (params: IGetWhatHappenNowParams) => {
  const res = await api.get("/happening-now/", {
    params: params,
  });
  return res.data;
};
