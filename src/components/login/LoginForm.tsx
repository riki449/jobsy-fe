"use client";

import { Form, Input, Typography, Divider } from "antd";
import Button from "../common/Button";
import Image from "next/image";
import IconFB from "@/public/ic_fb.svg";
import IconGG from "@/public/ic_google.svg";
import { FormInput } from "../common/FormInput";

const { Title } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
      {/* Logo */}
      <Title
        level={3}
        className="mb-2 cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Jobsy
      </Title>

      <Title level={4} className="mb-6">
        Log ind med din Jobsy.dk konto
      </Title>

      <Form layout="vertical" onFinish={onSubmit} className="space-y-4">
        {/* Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Invalid email format",
            },
          ]}
        >
          <FormInput placeholder="your@email.com" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <FormInput placeholder="••••••••" type={"password"} />
        </Form.Item>

        {/* Submit */}
        <Button type="submit" variant="primary" className="w-full mt-4">
          Log ind
        </Button>

        {/* Forgot password */}
        <div className="text-center">
          <Button variant="link">Glemt dit password?</Button>
        </div>

        <Divider className="my-4">or</Divider>

        {/* Google */}
        <Button
          variant="secondary"
          icon={<Image alt="google" className="h-6 w-6" src={IconGG} />}
          className="w-full"
          type="button"
        >
          Log ind med Google
        </Button>

        {/* Facebook */}
        <Button
          variant="secondary"
          icon={<Image alt="facebook" className="h-6 w-6" src={IconFB} />}
          className="w-full"
          type="button"
        >
          Log ind med Facebook
        </Button>
      </Form>
    </div>
  );
}
