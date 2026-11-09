import { Textarea } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Textarea",
  group: "Forms",
  description: "A multiline field that grows with its content between rows and maxRows.",
  importPath: "prava-ui/textarea",
  examples: [
    {
      title: "Auto-growing",
      render: () => (
        <div style={{ maxInlineSize: "28rem" }}>
          <Textarea
            aria-label="Message"
            placeholder="Type a few lines…"
            rows={2}
            maxRows={6}
            description="Grows up to 6 lines."
          />
        </div>
      ),
    },
  ],
} satisfies ComponentDoc;
