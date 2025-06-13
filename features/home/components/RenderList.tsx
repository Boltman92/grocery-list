import { Button } from "@/components/ui/button";
import { EditIcon, Icon, TrashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useGroceryItems } from "@/hooks/useGroceryLists";
import { ListResponse } from "@/types";
import { useRouter } from "expo-router";
import { Alert, View } from "react-native";

export const RenderList = ({ item }: { item: ListResponse }) => {
  const router = useRouter();
  const { deleteItem } = useGroceryItems();

  const handleDelete = () => {
    deleteItem({ id: item.id });
  };
  const showConfirmationAlert = () =>
    Alert.alert("Delete grocery list", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: handleDelete },
    ]);

  return (
    <View
      className="w-full pl-4 pr-4 h-12 border border-solid border-gray-700 rounded-full items-center"
      style={{ width: "100%", height: 64 }}
    >
      <View className="flex flex-1 flex-row w-full items-center">
        <Button
          variant="link"
          onPress={() =>
            router.navigate({
              pathname: "/show/[id]",
              params: { id: item.id },
            })
          }
          className="flex-1"
          style={{ paddingLeft: 8 }}
        >
          <Text numberOfLines={1} ellipsizeMode="tail" size="xl">
            {item.title}
          </Text>
        </Button>
        <Button
          variant="link"
          onPress={() =>
            router.navigate({
              pathname: "/list/[id]",
              params: { id: item.id },
            })
          }
          style={{ width: 32 }}
        >
          <Icon as={EditIcon} />
        </Button>
        <Button
          variant="link"
          onPress={showConfirmationAlert}
          style={{ width: 32, marginRight: 12 }}
        >
          <Icon as={TrashIcon} />
        </Button>
      </View>
    </View>
  );
};
