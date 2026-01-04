import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { createMutation } from "react-query-kit";
import { loginApi } from "../networks/auth";
import { LoginFormValues, LoginResponse } from "../types/login";
import { AxiosError } from "axios";

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};

export const useLogin = createMutation<
  LoginResponse,
  LoginFormValues,
  AxiosError
>({
  mutationFn: loginApi,
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
