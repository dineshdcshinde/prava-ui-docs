import { Button, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Stack",
  group: "Layout",
  description: "Lays children out in a row or column with consistent gaps.",
  importPath: "prava-ui/stack",
  examples: [
    {
      title: "Horizontal, justified between",
      render: () => (
        <Stack orientation="horizontal" justify="between" gap={2}>
          <Button variant="outline">Back</Button>
          <Button>Next</Button>
        </Stack>
      ),
    },
    {
      title: "Vertical",
      render: () => (
        <Stack gap={2} align="start">
          <Button variant="secondary">One</Button>
          <Button variant="secondary">Two</Button>
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
