import { Button, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Button",
  group: "Forms",
  description: "Triggers an action, or navigates when given an href.",
  importPath: "prava-ui/button",
  examples: [
    {
      title: "Variants",
      render: () => (
        <Stack orientation="horizontal" gap={2} wrap>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
        </Stack>
      ),
    },
    {
      title: "Sizes and states",
      render: () => (
        <Stack orientation="horizontal" gap={2} align="center" wrap>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
          <Button href="#/button" variant="outline">
            Link
          </Button>
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
