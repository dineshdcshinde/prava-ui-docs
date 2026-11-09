import { Button, Drawer, DrawerClose, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Drawer",
  group: "Overlays",
  description: "A dialog that slides in from an edge; start/end follow direction.",
  importPath: "prava-ui/drawer",
  examples: [
    {
      title: "Placements",
      render: () => (
        <Stack orientation="horizontal" gap={2} wrap>
          {(["start", "end", "top", "bottom"] as const).map((placement) => (
            <Drawer
              key={placement}
              placement={placement}
              title={`Drawer (${placement})`}
              trigger={<Button variant="outline">{placement}</Button>}
            >
              <p>Drawer content.</p>
              <DrawerClose>
                <Button>Done</Button>
              </DrawerClose>
            </Drawer>
          ))}
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
