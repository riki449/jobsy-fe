import { API_ENDPOINTS } from "../constants/api-endpoints";
import { JobListRequest } from "../types/job";
import { api } from "./axios";

export const getListJobApi = async (payload: JobListRequest) => {
  const res = await api.post(API_ENDPOINTS.JOB.SEARCH, payload);
  return res.data;
};

export const getJobMasterDataApi = async () => {
  const res = await api.get(API_ENDPOINTS.CATEGORY.HAVE_JOBS);
  return res.data;
};
