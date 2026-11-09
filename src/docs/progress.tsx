import { useEffect, useState } from "react";
import { Progress, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

function Animated() {
  const [value, setValue] = useState(10);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 10)), 800);
    return () => clearInterval(id);
  }, []);
  return <Progress label="Uploading" value={value} showValue />;
}

export default {
  name: "Progress",
  group: "Feedback",
  description: "Shows determinate or indeterminate task progress.",
  importPath: "prava-ui/progress",
  examples: [
    {
      title: "Determinate and indeterminate",
      render: () => (
        <Stack gap={4} style={{ maxInlineSize: "24rem" }}>
          <Progress label="Storage used" value={64} showValue />
          <Animated />
          <Progress label="Preparing" />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
