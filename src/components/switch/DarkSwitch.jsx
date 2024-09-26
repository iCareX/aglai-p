import { rem, useMantineColorScheme, useComputedColorScheme, Switch, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function DarkSwitch() {
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;
  const moonIcon = <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />;

  return (
    <Switch
      size="md"
      color="dark.4"
      checked={colorScheme === "light" ? false : true}
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
    />
  );
}
