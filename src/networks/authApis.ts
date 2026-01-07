import { LoginFormValues } from "../types/login";
import { api } from "./axios";

export const loginApi = async (payload: LoginFormValues) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};
