"use client";

import { Area, JobCategoryGroup, JobListBodyRequest } from "@/src/types/job";
import { Form } from "antd";
import Button from "../common/Button";
import { FormInput } from "../common/FormInput";
import { FormSelect, SelectOption } from "../common/FormSelect";

const budgetOptions: SelectOption[] = [
  { label: "0-2.000", value: "1" },
  { label: "2.000-10.000", value: "2" },
  { label: "10.000-50.000", value: "3" },
  { label: "50.000-100.000", value: "4" },
  { label: "Over 100.000", value: "5" },
];

export default function JobFilter({
  onSearch,
  areaData,
  categoryData,
}: {
  onSearch: (values: JobListBodyRequest) => void;
  areaData?: Area[];
  categoryData?: JobCategoryGroup[];
}) {
  const categoryOptions =
    (categoryData &&
      categoryData.map((group: JobCategoryGroup) => ({
        label: <span className="font-medium">{group.parent.title}</span>,
        options: group.categories.map((cat) => ({
          label: <span className="ml-4">{cat.title}</span>,
          value: cat.slug,
        })),
      }))) ||
    [];

  const locationOptions =
    areaData &&
    areaData.map((item: Area) => {
      return {
        label: item.title,
        value: item.id,
      };
    });

  const defaultCategories =
    categoryData?.flatMap((group) =>
      group.categories
        .filter((cat) => cat.is_last_save_view)
        .map((cat) => cat.slug)
    ) || [];

  const defaultLocations =
    areaData?.filter((area) => area.is_last_save_view).map((area) => area.id) ||
    [];

  return (
    <Form
      onFinish={onSearch}
      initialValues={{ cat: defaultCategories, reg: defaultLocations }}
      className="flex items-center gap-3 rounded-xl bg-white shadow-sm p-4!"
    >
      <Form.Item name="cat" className="mb-0! w-40">
        <FormSelect
          placeholder="Malerarbejde"
          options={categoryOptions || []}
          mode="multiple"
          allowClear
          showSearch
          maxTagCount="responsive"
        />
      </Form.Item>

      <Form.Item name="reg" className="mb-0! w-40">
        <FormSelect
          placeholder="Århus"
          options={locationOptions || []}
          mode="multiple"
          allowClear
          showSearch
          maxTagCount="responsive"
        />
      </Form.Item>

      <Form.Item name="job_size" className="mb-0! w-40">
        <FormSelect
          placeholder="0-2.000"
          options={budgetOptions}
          mode="multiple"
          maxTagCount="responsive"
          allowClear
        />
      </Form.Item>

      <Form.Item name="job_to_find" className="mb-0! flex-1">
        <FormInput allowClear placeholder="Søg efter opgave..." />
      </Form.Item>

      <Button type="submit" variant="primary" color="red-500">
        →
      </Button>
    </Form>
  );
}
