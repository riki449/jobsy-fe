"use client";

import { Select } from "antd";

export type SelectOption = {
  label: string;
  value: string | number;
};

type FormSelectProps = {
  placeholder: string;
  options: SelectOption[];
  disabled?: boolean;
  allowClear?: boolean;
};

export function FormSelect({
  placeholder,
  options,
  disabled,
  allowClear = false,
}: FormSelectProps) {
  return (
    <Select
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder}
      options={options}
      className={"h-10 border-none! bg-lightGray! shadow-sm"}
      variant="outlined"
    />
  );
}
