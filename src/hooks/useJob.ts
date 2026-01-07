import { createMutation } from "react-query-kit";
import { JobListRequest, JobListResponse } from "../types/job";
import { AxiosError } from "axios";
import { message } from "antd";
import { getListJobApi } from "../networks/jobApis";

export const useGetJobList = createMutation<
  JobListResponse,
  JobListRequest,
  AxiosError
>({
  mutationFn: getListJobApi,
  onError: (error) => {
    const errorMessage =
      (error.response?.data as AxiosError)?.message ||
      error.message ||
      "Get Jobs failed. Please try again.";

    message.error(errorMessage);
  },
});
