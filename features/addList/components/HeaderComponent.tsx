import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { CurrentItem, Items } from "../types";

type HeaderComponentProps = {
  items: Items;
  setItems: React.Dispatch<React.SetStateAction<Items>>;
  listName: string;
  setListName: React.Dispatch<React.SetStateAction<string>>;
};

export const HeaderComponent = ({
  items,
  setItems,
  listName,
  setListName,
}: HeaderComponentProps) => {
  const { id } = useLocalSearchParams();

  const [currentItem, setCurrentItem] = useState<CurrentItem>({
    name: "",
    amount: "1",
  });

  const handleAddItem = () => {
    const itemIsAlreadyAdded = items.find(
      (item) =>
        item.name.toLowerCase().trim() === currentItem.name.toLowerCase().trim()
    );
    if (itemIsAlreadyAdded) {
      setItems(
        items.map((item) =>
          item.name.toLowerCase() === currentItem.name.toLowerCase().trim()
            ? {
                ...itemIsAlreadyAdded,
                amount:
                  Number(itemIsAlreadyAdded.amount) +
                  (Number(currentItem?.amount) || 1),
              }
            : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          name: currentItem.name.trim(),
          amount: Number(currentItem.amount),
          createdAt: Date.now().toString(),
          bought: false,
        },
      ]);
    }
    setCurrentItem({ name: "", amount: "1" });
  };
  return (
    <>
      <Input variant="underlined" size="md">
        <InputField
          placeholder="list name"
          value={listName}
          onChangeText={setListName}
        />
      </Input>

      <Box className="p-1 mt-4 gap-3">
        {id === "new" && (
          <Text className="font-semibold">add items to your list</Text>
        )}
        <Box className="flex flex-row w-full gap-2">
          <Input variant="outline" size="lg" className="flex-1">
            <InputField
              placeholder="add item.."
              value={currentItem.name}
              onChangeText={(text) =>
                setCurrentItem((prev) => ({
                  ...prev,
                  name: text,
                }))
              }
            />
          </Input>
          <Input variant="outline" size="lg" className="w-16">
            <InputField
              keyboardType="number-pad"
              placeholder="amount"
              value={currentItem.amount.replace(/[^0-9]/g, "")}
              onChangeText={(text) =>
                setCurrentItem((prev) => ({ ...prev, amount: text }))
              }
            />
          </Input>
        </Box>
        <Button
          onPress={handleAddItem}
          variant="outline"
          isDisabled={!(currentItem.name && currentItem.amount)}
        >
          <ButtonText>Add to list</ButtonText>
        </Button>
      </Box>
    </>
  );
};
