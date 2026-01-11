"use client";

import { Select, SelectProps } from "antd";
import { ReactElement } from "react";

export type SelectOption = {
  label: string | ReactElement;
  value: string | number;
};

export type GroupedSelectOption = {
  label: ReactElement;
  options: SelectOption[];
};

interface FormSelectProps extends SelectProps {
  placeholder: string;
  options: (SelectOption | GroupedSelectOption)[];
  disabled?: boolean;
  allowClear?: boolean;
}

export function FormSelect({
  placeholder,
  options,
  disabled,
  allowClear = false,
  ...rest
}: FormSelectProps) {
  return (
    <Select
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder}
      className="h-10 border-none! bg-lightGray! shadow-sm pt-1.5!"
      variant="outlined"
      {...rest}
    >
      {options.map((opt, index) =>
        "options" in opt ? (
          <Select.OptGroup key={`${opt.label}_${index}`} label={opt.label}>
            {opt.options.map((child) => (
              <Select.Option key={child.value} value={child.value}>
                {child.label}
              </Select.Option>
            ))}
          </Select.OptGroup>
        ) : (
          <Select.Option key={`${opt.value}_${index}`} value={opt.value}>
            {opt.label}
          </Select.Option>
        )
      )}
    </Select>
  );
}
