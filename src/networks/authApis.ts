import { API_ENDPOINTS } from "../constants/api-endpoints";
import { LoginFormValues, UserTypeParams } from "../types/login";
import { api } from "./axios";

export const loginApi = async (payload: LoginFormValues) => {
  const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  return res.data;
};

export const checkUserTypeApi = async (payload: UserTypeParams) => {
  const res = await api.post(API_ENDPOINTS.AUTH.GET_LINKED_ACCOUNT, payload);
  return res.data;
};
