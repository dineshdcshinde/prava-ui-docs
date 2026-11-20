import { Button, Popover } from "@pravalabs/ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Popover",
  group: "Overlays",
  description: "Non-modal floating content anchored to a trigger.",
  importPath: "@pravalabs/ui/popover",
  examples: [
    {
      title: "Basic",
      render: () => (
        <Popover trigger={<Button variant="outline">Details</Button>} title="Shipping">
          Arrives in 3–5 business days.
        </Popover>
      ),
    },
  ],
} satisfies ComponentDoc;
