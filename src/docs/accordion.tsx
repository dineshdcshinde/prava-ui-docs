import { Accordion, AccordionItem } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Accordion",
  group: "Navigation",
  description: "Shows and hides sections of related content.",
  importPath: "prava-ui/accordion",
  examples: [
    {
      title: "Single",
      render: () => (
        <Accordion defaultValue={["a"]}>
          <AccordionItem value="a" title="What is Prava UI?">
            An accessible React component library.
          </AccordionItem>
          <AccordionItem value="b" title="Does it support RTL?">
            Yes, through PravaProvider.
          </AccordionItem>
          <AccordionItem value="c" title="Disabled" disabled>
            Hidden.
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      title: "Multiple open",
      render: () => (
        <Accordion multiple defaultValue={["a", "b"]}>
          <AccordionItem value="a" title="First">One</AccordionItem>
          <AccordionItem value="b" title="Second">Two</AccordionItem>
        </Accordion>
      ),
    },
  ],
} satisfies ComponentDoc;
