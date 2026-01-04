"use client";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import Button from "../common/Button";
import IconFB from "@/public/ic_fb.svg";
import IconGG from "@/public/ic_google.svg";
import Image from "next/image";
import { Controller, UseFormReturn } from "react-hook-form";
import { LoginFormValues } from "@/src/types/login";

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (data: LoginFormValues) => void;
}

export default function LoginForm({ form, onSubmit }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <Box className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
      <Typography
        variant="h5"
        className="mb-4 font-semibold! cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Jobsy
      </Typography>

      <Typography variant="h5" className="mb-4 font-semibold! mt-2!">
        Log ind med din Jobsy.dk konto
      </Typography>

      <Box
        component="form"
        className="space-y-4 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              size="small"
              placeholder="your@email.com"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              className="mt-4!"
              fullWidth
              size="small"
              placeholder="••••••••"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Remember me */}
        {/* <FormControlLabel control={<Checkbox />} label="Remember me" /> */}

        <Button type="submit" variant="primary" className="w-full mt-6">
          Log ind
        </Button>

        <Box className="mt-2 text-center">
          <Button variant="link">Glemt dit password?</Button>
        </Box>

        <Divider className="my-4">or</Divider>

        <Button
          variant="secondary"
          icon={<Image alt="google" className="w-6 h-6" src={IconGG} />}
          className="w-full mt-6"
          type="button"
        >
          Log ind med Google
        </Button>

        <Button
          variant="secondary"
          icon={<Image alt="facebook" className="w-6 h-6" src={IconFB} />}
          className="w-full mb-2"
          type="button"
        >
          Log ind med Facebook
        </Button>

        {/* <Box className="mt-4 text-center text-sm">
          Don’t have an account? <Button variant="link">Sign up</Button>
        </Box> */}
      </Box>
    </Box>
  );
}
