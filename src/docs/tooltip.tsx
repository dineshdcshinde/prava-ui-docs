import { Button, Stack, Tooltip } from "@pravalabs/ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Tooltip",
  group: "Overlays",
  description: "A short hint on hover or keyboard focus.",
  importPath: "@pravalabs/ui/tooltip",
  examples: [
    {
      title: "Placements",
      render: () => (
        <Stack orientation="horizontal" gap={2} wrap>
          {(["top", "bottom", "start", "end"] as const).map((placement) => (
            <Tooltip key={placement} content={`Tooltip on ${placement}`} placement={placement}>
              <Button variant="outline">{placement}</Button>
            </Tooltip>
          ))}
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
