import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="list/[id]"
            options={({ route }) => ({
              headerBackTitle: "Back",
              title:
                (route.params as { id: string })?.id === "new"
                  ? "add list"
                  : "edit list",
            })}
          />
          <Stack.Screen
            name="show/[id]"
            options={() => ({ headerBackTitle: "Back", title: "your list" })}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
