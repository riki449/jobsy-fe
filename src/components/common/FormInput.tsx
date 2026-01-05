"use client";

import { Input } from "antd";
import type { InputProps } from "antd/es/input";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type FormInputProps = InputProps & {
  label?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
};

export function FormInput({
  label,
  error,
  required,
  containerClassName,
  className,
  type,
  ...props
}: FormInputProps) {
  const baseClass = `
    h-10
    rounded-xl
    border-none!
    bg-lightGray!
    shadow-sm
    px-3
    text-sm
    focus:shadow-none
    placeholder:text-zinc-500
    ${error ? "ring-1 ring-red-500" : ""}
    ${className ?? ""}
  `;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName ?? ""}`}>
      {label && (
        <label className="text-sm font-bold! text-zinc-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {type === "password" ? (
        <Input.Password {...props} className={baseClass} />
      ) : (
        <Input {...props} type={type} className={baseClass} />
      )}

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
