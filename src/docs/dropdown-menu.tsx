import { Button, DropdownMenu, toast } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "DropdownMenu",
  group: "Overlays",
  description: "A menu of actions; arrow keys, Home/End, and Escape supported.",
  importPath: "prava-ui/dropdown-menu",
  examples: [
    {
      title: "Actions, groups, separator",
      render: () => (
        <DropdownMenu
          trigger={<Button variant="outline">Options</Button>}
          items={[
            { label: "Rename", onSelect: () => toast({ title: "Rename" }) },
            { label: "Duplicate", onSelect: () => toast({ title: "Duplicate" }) },
            { separator: true },
            { label: "Share", items: [{ label: "Copy link" }, { label: "Email", disabled: true }] },
            { separator: true },
            { label: "Delete", tone: "danger", onSelect: () => toast({ title: "Deleted", tone: "danger" }) },
          ]}
        />
      ),
    },
  ],
} satisfies ComponentDoc;
