import { API_ENDPOINTS } from "@/src/constants/api-endpoints";
import { api } from "@/src/lib/axios";
import { LoginFormValues, UserTypeParams } from "../types";

export const loginApi = async (payload: LoginFormValues) => {
  const res = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  return res.data;
};

export const swapViewApi = async (payload: LoginFormValues) => {
  const res = await api.post(API_ENDPOINTS.AUTH.SWAP_USER, payload);
  return res.data;
};

export const checkUserTypeApi = async (payload: UserTypeParams) => {
  const res = await api.post(API_ENDPOINTS.AUTH.GET_LINKED_ACCOUNT, payload);
  return res.data;
};
