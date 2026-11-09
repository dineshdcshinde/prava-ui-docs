import { Tab, TabList, TabPanel, Tabs } from "prava-ui";
import type { ComponentDoc } from "../registry";

const Demo = ({ orientation }: { orientation: "horizontal" | "vertical" }) => (
  <Tabs defaultValue="account" orientation={orientation}>
    <TabList aria-label="Settings">
      <Tab value="account">Account</Tab>
      <Tab value="security">Security</Tab>
      <Tab value="billing" disabled>
        Billing
      </Tab>
    </TabList>
    <TabPanel value="account">Account settings.</TabPanel>
    <TabPanel value="security">Security settings.</TabPanel>
    <TabPanel value="billing">Billing settings.</TabPanel>
  </Tabs>
);

export default {
  name: "Tabs",
  group: "Navigation",
  description: "Switches between panels; arrow keys follow direction in RTL.",
  importPath: "prava-ui/tabs",
  examples: [
    { title: "Horizontal", render: () => <Demo orientation="horizontal" /> },
    { title: "Vertical", render: () => <Demo orientation="vertical" /> },
  ],
} satisfies ComponentDoc;
