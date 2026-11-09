import { Skeleton, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Skeleton",
  group: "Feedback",
  description: "Reserves space for content that is still loading.",
  importPath: "prava-ui/skeleton",
  examples: [
    {
      title: "Shapes",
      render: () => (
        <Stack orientation="horizontal" gap={3} align="center">
          <Skeleton shape="circle" style={{ inlineSize: "3rem", blockSize: "3rem" }} />
          <Stack gap={2} style={{ flex: 1 }}>
            <Skeleton shape="text" style={{ inlineSize: "60%" }} />
            <Skeleton shape="text" />
            <Skeleton shape="rect" style={{ blockSize: "4rem" }} />
          </Stack>
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
