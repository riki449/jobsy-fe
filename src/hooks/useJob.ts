import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getJobMasterDataApi, getListJobApi } from "../networks/jobApis";
import {
  JobCategoryGroupData,
  JobListRequest,
  JobListResponse,
} from "../types/job";
import { AxiosError } from "axios";

export const jobQueryKeys = {
  GET_JOB_LIST: "GET_JOB_LIST",
  GET_JOB_MASTER_DATA: "GET_JOB_MASTER_DATA",
};

export const useGetJobList = (
  params: JobListRequest
): UseQueryResult<JobListResponse, AxiosError> => {
  return useQuery<JobListResponse, AxiosError>({
    queryKey: [jobQueryKeys.GET_JOB_LIST, params],
    queryFn: () => getListJobApi(params),
  });
};

export const useGetJobMasterData = (): UseQueryResult<
  JobCategoryGroupData,
  AxiosError
> => {
  return useQuery<JobCategoryGroupData, AxiosError>({
    queryKey: [jobQueryKeys.GET_JOB_MASTER_DATA],
    queryFn: () => getJobMasterDataApi(),
  });
};
