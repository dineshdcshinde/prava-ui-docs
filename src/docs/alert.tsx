import { useState } from "react";
import { Alert, Button, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

function Dismissible() {
  const [open, setOpen] = useState(true);
  return open ? (
    <Alert tone="info" title="New version" onDismiss={() => setOpen(false)}>
      Reload to get the latest features.
    </Alert>
  ) : (
    <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
      Show again
    </Button>
  );
}

export default {
  name: "Alert",
  group: "Feedback",
  description: "An inline message about status or a required action.",
  importPath: "prava-ui/alert",
  examples: [
    {
      title: "Tones",
      render: () => (
        <Stack gap={3}>
          <Alert tone="neutral" title="Heads up">Maintenance on Sunday.</Alert>
          <Alert tone="success" title="Saved">Your changes are live.</Alert>
          <Alert tone="warning" title="Almost full">You have used 90% of storage.</Alert>
          <Alert tone="danger" title="Payment failed" action={<Button size="sm">Retry</Button>}>
            Update your card.
          </Alert>
        </Stack>
      ),
    },
    { title: "Dismissible", render: () => <Dismissible /> },
  ],
} satisfies ComponentDoc;
