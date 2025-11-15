import { Stack } from "expo-router";
import { useTheme } from "../lib/theme";
import { i18n } from "../lib/i18n";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    />
  );
}
