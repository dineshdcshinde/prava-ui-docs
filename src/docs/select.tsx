import { Select, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange", disabled: true },
];

export default {
  name: "Select",
  group: "Forms",
  description: "Choose one or many options from a list, with optional search and groups.",
  importPath: "prava-ui/select",
  examples: [
    {
      title: "Single",
      render: () => (
        <div style={{ maxInlineSize: "20rem" }}>
          <Select label="Fruit" placeholder="Pick one" options={fruits} />
        </div>
      ),
    },
    {
      title: "Multiple, searchable, grouped",
      render: () => (
        <Stack gap={4} style={{ maxInlineSize: "20rem" }}>
          <Select
            label="Toppings"
            multiple
            searchable
            defaultValue={["cheese"]}
            options={[
              { label: "Veg", options: [{ value: "cheese", label: "Cheese" }, { value: "olives", label: "Olives" }] },
              { label: "Non-veg", options: [{ value: "chicken", label: "Chicken" }] },
            ]}
          />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
