import { Spinner, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Spinner",
  group: "Feedback",
  description: "An indeterminate loading indicator.",
  importPath: "prava-ui/spinner",
  examples: [
    {
      title: "Variants",
      render: () => (
        <Stack orientation="horizontal" gap={4} align="center">
          {(["spinner", "dots", "bars", "pulse", "bounce"] as const).map((variant) => (
            <Spinner key={variant} variant={variant} label={`Loading (${variant})`} />
          ))}
        </Stack>
      ),
    },
    {
      title: "Sizes and tones",
      render: () => (
        <Stack orientation="horizontal" gap={4} align="center">
          <Spinner size="sm" tone="success" />
          <Spinner size="md" tone="warning" />
          <Spinner size="lg" tone="danger" />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
