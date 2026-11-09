import { FormField } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "FormField",
  group: "Forms",
  description: "Wires a label, description, and error to any control.",
  importPath: "prava-ui/form-field",
  examples: [
    {
      title: "Wrapping a native control",
      render: () => (
        <div style={{ maxInlineSize: "24rem" }}>
          <FormField
            label="Website"
            description="Include https://"
            required
            control={<input type="url" />}
          />
        </div>
      ),
    },
    {
      title: "With an error",
      render: () => (
        <div style={{ maxInlineSize: "24rem" }}>
          <FormField label="Age" error="Must be 18 or older." control={<input type="number" defaultValue={12} />} />
        </div>
      ),
    },
  ],
} satisfies ComponentDoc;
