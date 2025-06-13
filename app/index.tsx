import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { EmptyListComponent } from "@/features/home/components/EmptyList";
import { RenderList } from "@/features/home/components/RenderList";
import { useGroceryItems } from "@/hooks/useGroceryLists";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  const { items, isLoading } = useGroceryItems();
  const router = useRouter();

  const listsAvailable = items.length > 0;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex justify-center items-center flex-1">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderList item={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={<EmptyListComponent />}
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          width: "90%",
          marginTop: 16,
        }}
        ListHeaderComponent={
          listsAvailable ? (
            <Text className="mt-6 mb-6" size="2xl">
              Your lists:
            </Text>
          ) : null
        }
      />
      {listsAvailable && (
        <Fab
          size="lg"
          placement="bottom right"
          className="mb-10 mr-4"
          onPress={() => router.navigate("/list/new")}
        >
          <FabIcon as={AddIcon} />
          <FabLabel>Add list</FabLabel>
        </Fab>
      )}
    </SafeAreaView>
  );
}
