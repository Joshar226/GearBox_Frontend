import { GlobalStyles } from "@/utils/contants";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../../i18n";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={GlobalStyles.backgroundView}
        edges={["top", "left", "right"]}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="settings" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
