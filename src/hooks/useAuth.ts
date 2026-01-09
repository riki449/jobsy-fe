import { message } from "antd";
import { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { useSelector } from "react-redux";
import { checkUserTypeApi, loginApi } from "../networks/authApis";
import { RootState } from "../store/store";
import {
  CheckAccountTypeResponse,
  LoginFormValues,
  LoginResponse,
  UserTypeParams,
} from "../types/login";

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};

export const useLogin = createMutation<
  LoginResponse,
  LoginFormValues,
  AxiosError
>({
  mutationFn: loginApi,
  onError: (error) => {
    const errorMessage =
      (error.response?.data as AxiosError)?.message ||
      error.message ||
      "Login failed. Please try again.";

    message.error(errorMessage);
  },
});

export const useCheckUserType = createMutation<
  CheckAccountTypeResponse,
  UserTypeParams,
  AxiosError
>({
  mutationFn: checkUserTypeApi,
  onError: (error) => {
    const errorMessage =
      (error.response?.data as AxiosError)?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    message.error(errorMessage);
  },
});

// export const useGetProfile = createQuery<UserInfo, AxiosError>({
//   queryKey: ["userProfile"],
//   fetcher: () => {
//     return client({
//       url: API_ENDPOINTS.PROFILE,
//       method: "GET",
//     }).then((response) => response.data);
//   },
// });
