import { Card, CardContent, Grid } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Grid",
  group: "Layout",
  description: "A responsive grid with fixed columns or auto-fit by minimum width.",
  importPath: "prava-ui/grid",
  examples: [
    {
      title: "Auto-fit (resize the window)",
      render: () => (
        <Grid minColumnWidth="10rem" gap={3}>
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i}>
              <CardContent>Item {i + 1}</CardContent>
            </Card>
          ))}
        </Grid>
      ),
    },
    {
      title: "Fixed 3 columns",
      render: () => (
        <Grid columns={3} gap={2}>
          {["A", "B", "C"].map((x) => (
            <Card key={x}>
              <CardContent>{x}</CardContent>
            </Card>
          ))}
        </Grid>
      ),
    },
  ],
} satisfies ComponentDoc;
