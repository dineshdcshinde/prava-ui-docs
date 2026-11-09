import { Button, Stack, dismissToast, toast } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Toaster",
  group: "Feedback",
  description: "Mount <Toaster /> once, then call toast() from anywhere.",
  importPath: "prava-ui/toast",
  examples: [
    {
      title: "Tones",
      render: () => (
        <Stack orientation="horizontal" gap={2} wrap>
          <Button onClick={() => toast({ title: "Saved", tone: "success" })}>Success</Button>
          <Button
            variant="destructive"
            onClick={() => toast({ title: "Payment failed", description: "Update your card.", tone: "danger" })}
          >
            Danger
          </Button>
          <Button variant="outline" onClick={() => toast({ title: "Sticky", duration: Infinity })}>
            Persistent
          </Button>
          <Button variant="ghost" onClick={() => dismissToast()}>
            Dismiss all
          </Button>
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
