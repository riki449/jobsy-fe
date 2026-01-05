"use client";

import { Form, Input } from "antd";
import { FormSelect, SelectOption } from "../common/FormSelect";
import Button from "../common/Button";
import { FormInput } from "../common/FormInput";

type JobFilterValues = {
  category?: string;
  location?: string;
  budget?: string;
  keyword?: string;
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
  { label: "2.000-10.000", value: "2000-10000" },
  { label: "10.000-50.000", value: "10000-50000" },
  { label: "50.000-100.000", value: "50000-100000" },
  { label: "Over 100.000", value: "100000" },
];

export default function JobFilter({
  onSearch,
}: {
  onSearch: (values: JobFilterValues) => void;
}) {
  return (
    <Form
      onFinish={onSearch}
      className="flex items-center gap-3 rounded-xl bg-white shadow-sm p-4!"
    >
      <Form.Item name="category" className="mb-0! w-40">
        <FormSelect placeholder="Malerarbejde" options={categoryOptions} />
      </Form.Item>

      <Form.Item name="location" className="mb-0! w-40">
        <FormSelect placeholder="Århus" options={locationOptions} />
      </Form.Item>

      <Form.Item name="budget" className="mb-0! w-40">
        <FormSelect placeholder="0-2.000" options={budgetOptions} />
      </Form.Item>

      <Form.Item name="keyword" className="mb-0! flex-1">
        <FormInput placeholder="Søg efter opgave..." />
      </Form.Item>

      <Button type="submit" variant="primary" color="red-500">
        →
      </Button>
    </Form>
  );
}
