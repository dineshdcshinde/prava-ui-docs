import { Button, Card, CardContent, CardFooter, CardHeader } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Card",
  group: "Layout",
  description: "Groups related content on a raised surface.",
  importPath: "prava-ui/card",
  examples: [
    {
      title: "Header, content, footer",
      render: () => (
        <Card style={{ maxInlineSize: "22rem" }}>
          <CardHeader>
            <strong>Team plan</strong>
          </CardHeader>
          <CardContent>Unlimited projects and 10 seats.</CardContent>
          <CardFooter>
            <Button size="sm">Upgrade</Button>
          </CardFooter>
        </Card>
      ),
    },
  ],
} satisfies ComponentDoc;
