"use client";

import { useForm } from "react-hook-form";
import { TextField, IconButton } from "@mui/material";
import { FormSelect, SelectOption } from "../common/Select";
import Button from "../common/Button";

type JobFilterValues = {
  category: string;
  location: string;
  budget: string;
  keyword: string;
};

const categoryOptions: SelectOption[] = [
  { label: "Malerarbejde", value: "painting" },
  { label: "Rengøring", value: "cleaning" },
  { label: "VVS", value: "plumbing" },
];

const locationOptions: SelectOption[] = [
  { label: "Århus", value: "aarhus" },
  { label: "København", value: "copenhagen" },
];

const budgetOptions: SelectOption[] = [
  { label: "0-2.000", value: "0-2000" },
  { label: "2.000-5.000", value: "2000-5000" },
];

export default function JobFilter({
  onSearch,
}: {
  onSearch: (values: JobFilterValues) => void;
}) {
  const { control, register, handleSubmit } = useForm<JobFilterValues>();

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="mx-auto flex max-w-6xl items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
    >
      <FormSelect
        name="category"
        label="Malerarbejde"
        control={control}
        options={categoryOptions}
      />

      <FormSelect
        name="location"
        label="Århus"
        control={control}
        options={locationOptions}
      />

      <FormSelect
        name="budget"
        label="0-2.000"
        control={control}
        options={budgetOptions}
      />

      <TextField
        {...register("keyword")}
        size="small"
        placeholder="Søg efter opgave..."
        fullWidth
        className="bg-lightGray"
      />

      <Button type="submit" variant="primary" color="red-500">
        →
      </Button>
    </form>
  );
}
