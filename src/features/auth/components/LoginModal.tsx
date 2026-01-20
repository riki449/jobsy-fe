"use client";

import { Modal, message } from "antd";
import { useRouter } from "next/navigation";
import { forwardRef, useImperativeHandle, useState } from "react";

import LoadingOverlay from "@/src/components/common/LoadingOverlay";
import { swapViewAction } from "@/src/features/auth/actions/auth.action";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { LoginFormValues } from "@/src/features/auth/types";
import { useCheckUserType, useSwapView } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";

export type LoginModalRef = {
  open: () => void;
  close: () => void;
};

const LoginModal = forwardRef<LoginModalRef>((_, ref) => {
  const router = useRouter();
  const { setUserType } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: checkUserType, isPending } = useCheckUserType();
  const { mutateAsync: swapView } = useSwapView();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const onSubmit = async (params: LoginFormValues) => {
    setLoading(true);

    try {
      const res = await swapView(params);
      setOpen(false);

      if (res?.tokens) {
        await swapViewAction(res.tokens.access);
        const userTypeResponse = await checkUserType({ email: params.email });
        const data = userTypeResponse?.data;

        if (data) {
          setUserType(data);
          const isCompany = Number(data.default_company_view || 0) !== 0;
          router.push(isCompany ? "/company" : "/user");
        } else {
          router.push("/dashboard");
        }
      }

      router.replace("/");
    } catch {
      message.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      closeIcon={null}
    >
      <LoadingOverlay loading={loading || isPending}>
        <LoginForm className="px-0 shadow-none" onSubmit={onSubmit} />
      </LoadingOverlay>
    </Modal>
  );
});

LoginModal.displayName = "LoginModal";

export default LoginModal;
