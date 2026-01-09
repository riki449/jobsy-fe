import { JobListRequest } from "../types/job";
import { api } from "./axios";

export const getListJobApi = async (payload: JobListRequest) => {
  const res = await api.post("/job/search-job", payload);
  return res.data;
};

export const getJobMasterDataApi = async () => {
  const res = await api.get("/categories/have-jobs");
  return res.data;
};
