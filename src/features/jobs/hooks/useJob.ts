import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getJobAreaApi, getJobCategoryApi, getJobMasterDataApi, getListJobApi } from "../api/jobApi";
import {
    JobAreasResponse,
    JobCategoryGroupData,
    JobListBodyRequest,
    JobListRequest,
    JobListResponse,
} from "../types";

export const jobQueryKeys = {
  GET_JOB_LIST: "GET_JOB_LIST",
  GET_JOB_MASTER_DATA: "GET_JOB_MASTER_DATA",
  GET_JOB_AREA_MASTER_DATA: "GET_JOB_AREA_MASTER_DATA",
  GET_JOB_CATEGORY_MASTER_DATA: "GET_JOB_CATEGORY_MASTER_DATA",
};

export const useGetJobList = (
  params: JobListRequest,
  body?: JobListBodyRequest
): UseQueryResult<JobListResponse, AxiosError> => {
  return useQuery<JobListResponse, AxiosError>({
    queryKey: [jobQueryKeys.GET_JOB_LIST, params, body],
    queryFn: () => getListJobApi(params, body),
  });
};

export const useGetJobAreaData = (): UseQueryResult<
  JobAreasResponse,
  AxiosError
> => {
  return useQuery<JobAreasResponse, AxiosError>({
    queryKey: [jobQueryKeys.GET_JOB_AREA_MASTER_DATA],
    queryFn: () => getJobAreaApi(),
  });
};

export const useGetJobCategoryData = (): UseQueryResult<
  JobCategoryGroupData,
  AxiosError
> => {
  return useQuery<JobCategoryGroupData, AxiosError>({
    queryKey: [jobQueryKeys.GET_JOB_CATEGORY_MASTER_DATA],
    queryFn: () => getJobCategoryApi(),
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
