import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { RenderItems } from "@/features/showList/components/RenderItems";
import { useGroceryListById } from "@/hooks/useGroceryListById";
import { Item } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  const { id: listId } = useLocalSearchParams();
  const { listInfo, toggleBought, isLoading } = useGroceryListById(
    listId.toString()
  );
  const { title = "", items = [] } = listInfo ?? {};

  const handlePress = (item: Item) => {
    toggleBought({
      id: listId.toString(),
      itemId: item.createdAt,
      currentStatus: !item.bought,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex justify-center items-center flex-1">
      <Center className="flex flex-1 justify-center items-center">
        <Text className="mt-6 mb-6 text-xl" size="xl">
          {title}
        </Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.createdAt}
          renderItem={({ item }) => (
            <RenderItems item={item} handlePress={handlePress} />
          )}
          ItemSeparatorComponent={() => <View className="h-2" />}
          contentContainerStyle={{ flex: 1, alignItems: "center" }}
        />
      </Center>
    </SafeAreaView>
  );
}
