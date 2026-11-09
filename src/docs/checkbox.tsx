import { Checkbox, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Checkbox",
  group: "Forms",
  description: "A binary or mixed choice.",
  importPath: "prava-ui/checkbox",
  examples: [
    {
      title: "States",
      render: () => (
        <Stack gap={3}>
          <Checkbox label="Email me updates" defaultChecked />
          <Checkbox label="Select all" indeterminate />
          <Checkbox label="Accept terms" required description="Required to continue." />
          <Checkbox label="Disabled" disabled />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
