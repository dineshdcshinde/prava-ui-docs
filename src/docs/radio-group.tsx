import { RadioGroup } from "prava-ui";
import type { ComponentDoc } from "../registry";

const options = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "lifetime", label: "Lifetime", disabled: true },
];

export default {
  name: "RadioGroup",
  group: "Forms",
  description: "Picks exactly one option; arrow keys move between options.",
  importPath: "prava-ui/radio-group",
  examples: [
    {
      title: "Vertical",
      render: () => <RadioGroup label="Billing" options={options} defaultValue="monthly" />,
    },
    {
      title: "Horizontal",
      render: () => (
        <RadioGroup label="Billing" orientation="horizontal" options={options} defaultValue="yearly" />
      ),
    },
  ],
} satisfies ComponentDoc;
