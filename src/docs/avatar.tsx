import { Avatar, Stack } from "prava-ui";
import type { ComponentDoc } from "../registry";

export default {
  name: "Avatar",
  group: "Display",
  description: "A person's image, with initials as the fallback.",
  importPath: "prava-ui/avatar",
  examples: [
    {
      title: "Sizes and fallback",
      render: () => (
        <Stack orientation="horizontal" gap={3} align="center">
          <Avatar size="sm" firstName="Asha" lastName="Rao" />
          <Avatar size="md" firstName="Vikram" lastName="Patil" />
          <Avatar size="lg" src="/missing.png" alt="Broken image" firstName="Meera" />
        </Stack>
      ),
    },
  ],
} satisfies ComponentDoc;
