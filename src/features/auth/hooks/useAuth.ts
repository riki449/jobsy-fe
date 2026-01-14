import { message } from "antd";
import { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { checkUserTypeApi, loginApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import {
    CheckAccountTypeResponse,
    LoginFormValues,
    LoginResponse,
    UserTypeParams,
} from "../types";

export const useAuth = () => {
  return useAuthStore();
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
