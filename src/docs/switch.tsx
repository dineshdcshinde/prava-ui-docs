import { Stack, Switch } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Switch",
  group: "Forms",
  description: "Turns a setting on or off immediately.",
  importPath: "prava-ui/switch",
  examples: [
    {
      title: "States",
      render: () => (
        <Stack gap={3}>
          <Switch label="Wi-Fi" defaultChecked />
          <Switch label="Bluetooth" />
          <Switch label="Airplane mode" disabled />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
