import { LoginFormValues, UserTypeParams } from "../types/login";
import { api } from "./axios";

export const loginApi = async (payload: LoginFormValues) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const checkUserTypeApi = async (payload: UserTypeParams) => {
  const res = await api.post("/auth/get-linked-account", payload);
  return res.data;
};
