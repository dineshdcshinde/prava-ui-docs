import { Label, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Label",
  group: "Forms",
  description: "Names a form control, with an optional required cue.",
  importPath: "prava-ui/label",
  examples: [
    {
      title: "With a native control",
      render: () => (
        <Stack gap={2}>
          <Label htmlFor="label-demo" required>
            Company
          </Label>
          <input id="label-demo" required />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
