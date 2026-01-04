"use client";

import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import LoginContainer from "@/src/components/login/LoginContainer";
import LoginForm from "@/src/components/login/LoginForm";
import { useLogin } from "@/src/hooks/useAuth";
import { loginSuccess } from "@/src/store/authSlice";
import { LoginFormValues } from "@/src/types/login";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutateAsync: login, isPending } = useLogin();

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const response = await login(data);
    if (response?.tokens) {
      localStorage.setItem("token", response.tokens.access);
      dispatch(loginSuccess(response.tokens));
      router.push("/home");
    }
  };

  return (
    <LoadingOverlay loading={isPending}>
      <LoginContainer
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <LoginForm form={loginForm} onSubmit={onSubmit} />
      </LoginContainer>
    </LoadingOverlay>
  );
}
