import { Container, Stack } from "@pravalabs/ui";
import type { ComponentDoc } from "../registry";

const box = { background: "var(--prava-color-surface-sunken)", padding: "0.5rem" };

export default {
  name: "Container",
  group: "Layout",
  description: "Centers content with a responsive max width.",
  importPath: "@pravalabs/ui/container",
  examples: [
    {
      title: "Sizes",
      render: () => (
        <Stack gap={2}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Container key={size} size={size} style={box}>
              size="{size}"
            </Container>
          ))}
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
