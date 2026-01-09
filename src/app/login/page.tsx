"use client";

import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import LoginContainer from "@/src/components/login/LoginContainer";
import LoginForm from "@/src/components/login/LoginForm";
import { useAuth, useCheckUserType, useLogin } from "@/src/hooks/useAuth";
import { loginSuccess, saveUserType } from "@/src/store/authSlice";
import { LoginFormValues } from "@/src/types/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { mutateAsync: login, isPending } = useLogin();
  const { mutateAsync: checkUserType, isPending: isPendingCheckUserType } =
    useCheckUserType();

  const onSubmit = async (params: LoginFormValues) => {
    const response = await login(params);
    if (response?.tokens) {
      localStorage.setItem("token", response.tokens.access);
      dispatch(loginSuccess(response.tokens));
      const userTypeResponse = await checkUserType({ email: params.email });
      const { data } = userTypeResponse || {};
      if (data) {
        dispatch(saveUserType(data));
      }
      router.push("/home");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <LoadingOverlay loading={isPending || isPendingCheckUserType}>
      <LoginContainer
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <LoginForm onSubmit={onSubmit} />
      </LoginContainer>
    </LoadingOverlay>
  );
}
