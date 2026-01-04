"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string | number;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  fullWidth?: boolean;
  disabled?: boolean;
};

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  fullWidth = true,
  disabled,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth={fullWidth}
          size="small"
          error={!!fieldState.error}
        >
          <InputLabel>{label}</InputLabel>

          <Select
            {...field}
            label={label}
            disabled={disabled}
            onChange={(event: SelectChangeEvent) => {
              field.onChange(event.target.value);
            }}
            className="border-none! bg-lightGray"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
