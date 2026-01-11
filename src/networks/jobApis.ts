import { API_ENDPOINTS } from "../constants/api-endpoints";
import { JobListBodyRequest, JobListRequest } from "../types/job";
import { api } from "./axios";

export const getListJobApi = async (
  payload: JobListRequest,
  body: JobListBodyRequest
) => {
  // Build query string from payload
  const queryString = new URLSearchParams(
    Object.entries(payload).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        // handle arrays by repeating keys
        if (Array.isArray(value)) {
          value.forEach((v) => acc.push([key, String(v)]));
        } else {
          acc.push([key, String(value)]);
        }
      }
      return acc;
    }, [] as [string, string][])
  ).toString();

  const url = `${API_ENDPOINTS.JOB.SEARCH}?${queryString}`;

  // still POST, but no body
  const res = await api.post(url, { ...body });

  return res.data;
};

export const getJobAreaApi = async () => {
  const res = await api.get(API_ENDPOINTS.ACTION_ENDPOINTS.HAVA_JOBS);
  return res.data.data;
};

export const getJobCategoryApi = async () => {
  const res = await api.get(API_ENDPOINTS.CATEGORY.HAVE_JOBS);
  return res.data.data;
};
