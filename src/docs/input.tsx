import { Input, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Input",
  group: "Forms",
  description: "A single-line text field with label, help text, and validation message.",
  importPath: "prava-ui/input",
  examples: [
    {
      title: "Basic",
      render: () => (
        <Stack gap={4} style={{ maxInlineSize: "24rem" }}>
          <Input label="Full name" placeholder="Asha Rao" />
          <Input label="Email" type="email" required description="We never share it." />
          <Input label="Username" invalid error="That name is taken." defaultValue="asha" />
          <Input label="Plan" disabled disabledReason="Managed by your admin" defaultValue="Pro" />
        </Stack>
      ),
    },
    {
      title: "Native validation (type an invalid email, then blur)",
      render: () => (
        <form onSubmit={(e) => e.preventDefault()} style={{ maxInlineSize: "24rem" }}>
          <Input label="Work email" type="email" required />
        </form>
      ),
    },
  ],
} satisfies ComponentDoc;
