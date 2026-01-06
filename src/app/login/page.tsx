"use client";

import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import LoginContainer from "@/src/components/login/LoginContainer";
import LoginForm from "@/src/components/login/LoginForm";
import { useAuth, useLogin } from "@/src/hooks/useAuth";
import { loginSuccess } from "@/src/store/authSlice";
import { LoginFormValues } from "@/src/types/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { mutateAsync: login, isPending } = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    const response = await login(data);
    if (response?.tokens) {
      localStorage.setItem("token", response.tokens.access);
      dispatch(loginSuccess(response.tokens));
      router.push("/home");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <LoadingOverlay loading={isPending}>
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
