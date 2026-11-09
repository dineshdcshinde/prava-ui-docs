import { Separator, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Separator",
  group: "Layout",
  description: "A visual or semantic divider between content.",
  importPath: "prava-ui/separator",
  examples: [
    {
      title: "Horizontal and vertical",
      render: () => (
        <Stack gap={3}>
          <span>Above</span>
          <Separator />
          <Stack orientation="horizontal" gap={3} align="center" style={{ blockSize: "1.5rem" }}>
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>API</span>
          </Stack>
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
