"use client";

import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import { loginAction } from "@/src/features/auth/actions/auth.action";
import LoginContainer from "@/src/features/auth/components/LoginContainer";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { useCheckUserType } from "@/src/features/auth/hooks/useAuth";
import { useAuthStore } from "@/src/features/auth/store/authStore";
import { LoginFormValues } from "@/src/features/auth/types";
import { message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  // const dispatch = useDispatch();
  const { login, setUserType } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "da";

  const [loading, setLoading] = useState(false);
  const { mutateAsync: checkUserType, isPending: isPendingCheckUserType } =
    useCheckUserType();

  const onSubmit = async (params: LoginFormValues) => {
    setLoading(true);
    try {
      // 1. Call Server Action (Sets Cookie)
      const res = await loginAction(params);

      if (res.error) {
        message.error(res.error);
        setLoading(false);
        return;
      }

      // 2. Update Redux (Client State)
      if (res.token) {
        login({ access: res.token, refresh: "" });

        // 3. User Type Check
        const userTypeResponse = await checkUserType({ email: params.email });
        const data = userTypeResponse?.data;

        if (data) {
          setUserType(data);

          // 4. Redirect based on role
          // Logic: default_company_view == 0 -> User, else Company
          // This matches Middleware logic
          const isCompany = Number(data.default_company_view || 0) !== 0;

          const redirectUrl = isCompany ? `/${locale}/home` : `/${locale}/dashboard`;
          console.log('🚀 Redirecting to:', redirectUrl);

          // Use window.location for hard navigation to ensure cookie is included
          window.location.href = redirectUrl;
        } else {
          // Fallback default
          const fallbackUrl = `/${locale}/dashboard`;
          console.log('🚀 Redirecting to fallback:', fallbackUrl);
          window.location.href = fallbackUrl;
        }
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingOverlay loading={loading || isPendingCheckUserType}>
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
