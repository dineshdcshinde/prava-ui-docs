import { Button, Dialog, DialogClose, Input } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Dialog",
  group: "Overlays",
  description: "A modal window that traps focus and closes on Escape.",
  importPath: "prava-ui/dialog",
  examples: [
    {
      title: "Basic",
      render: () => (
        <Dialog
          trigger={<Button>Edit profile</Button>}
          title="Edit profile"
          description="Changes apply immediately."
          footer={
            <>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>Save</Button>
              </DialogClose>
            </>
          }
        >
          <Input label="Display name" defaultValue="Asha" />
        </Dialog>
      ),
    },
  ],
} satisfies ComponentDoc;
