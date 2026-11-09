import { Input, PravaProvider, Stack, Tab, TabList, TabPanel, Tabs } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "PravaProvider",
  group: "Configuration",
  description: "Scopes direction, locale, messages, and theme to its subtree.",
  importPath: "prava-ui/provider",
  examples: [
    {
      title: "Nested RTL + Arabic messages",
      render: () => (
        <PravaProvider direction="rtl" locale="ar" messages={{ required: "مطلوب" }}>
          <Stack gap={3} style={{ maxInlineSize: "24rem" }}>
            <Input label="الاسم" required />
            <Tabs defaultValue="one">
              <TabList aria-label="أقسام">
                <Tab value="one">الأول</Tab>
                <Tab value="two">الثاني</Tab>
              </TabList>
              <TabPanel value="one">المحتوى الأول</TabPanel>
              <TabPanel value="two">المحتوى الثاني</TabPanel>
            </Tabs>
          </Stack>
        </PravaProvider>
      ),
    },
    {
      title: "Nested dark theme",
      render: () => (
        <PravaProvider theme="dark">
          <div style={{ background: "var(--prava-color-canvas)", padding: "1rem", borderRadius: "0.5rem" }}>
            <Input label="Always dark" />
          </div>
        </PravaProvider>
      ),
    },
  ],
} satisfies ComponentDoc;
