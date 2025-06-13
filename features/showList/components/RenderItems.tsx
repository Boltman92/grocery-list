import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Item } from "@/types";

export const RenderItems = ({
  item,
  handlePress,
}: {
  item: Item;
  handlePress: (item: Item) => void;
}) => {
  return (
    <Pressable
      className="flex flex-row justify-between items-center w-full"
      onPress={() => handlePress(item)}
      style={{ paddingLeft: 25, paddingRight: 25, width: "90%" }}
    >
      <Text
        size="2xl"
        style={{
          textDecorationLine: item.bought ? "line-through" : "none",
          textDecorationColor: "red",
        }}
        className="break-all flex-wrap pl-4 pr-4"
      >
        {item.name}
      </Text>
      <Text
        className="w-8 ml-4 pl-4 flex-auto flex-wrap pr-4"
        size="2xl"
        style={{
          textDecorationLine: item.bought ? "line-through" : "none",
          textDecorationColor: "red",
        }}
      >
        {item.amount}
      </Text>
    </Pressable>
  );
};
