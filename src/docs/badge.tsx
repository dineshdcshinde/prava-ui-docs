import { Avatar, Badge, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Badge",
  group: "Display",
  description: "A short status label, standalone or anchored to another element.",
  importPath: "prava-ui/badge",
  examples: [
    {
      title: "Tones",
      render: () => (
        <Stack orientation="horizontal" gap={2} wrap>
          {(["neutral", "primary", "success", "warning", "danger", "info"] as const).map((tone) => (
            <Badge key={tone} tone={tone} content={tone} />
          ))}
        </Stack>
      ),
    },
    {
      title: "Anchored",
      render: () => (
        <Badge content="3" tone="danger" placement="top-end">
          <Avatar firstName="Asha" lastName="Rao" />
        </Badge>
      ),
    },
  ],
} satisfies ComponentDoc;
