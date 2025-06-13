import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Item } from "@/types";
import { useState } from "react";
import { Pressable } from "react-native";
import { RenderItems } from "./RenderList";

export const EditableContainer = ({
  item,
  setItem,
  handleDeleteItem,
}: {
  item: Item;
  setItem: (id: string, text: string, amount: number) => void;
  handleDeleteItem: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Pressable onPress={() => setOpen(true)}>
      {open ? (
        <Box className="flex flex-row w-full gap-2">
          <Input variant="outline" size="lg" className="flex-1">
            <InputField
              placeholder="add item.."
              value={item.name}
              onChangeText={(text) =>
                setItem(item.createdAt, text, item.amount)
              }
            />
          </Input>
          <Input variant="outline" size="lg" className="w-16">
            <InputField
              keyboardType="number-pad"
              placeholder="amount"
              value={item.amount.toString().replace(/[^0-9]/g, "")}
              onChangeText={(text) =>
                setItem(item.createdAt, item.name, Number(text))
              }
            />
          </Input>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            isDisabled={item.name.length === 0 || item.amount <= 0}
          >
            <ButtonText>save</ButtonText>
          </Button>
        </Box>
      ) : (
        <RenderItems item={item} handleDeleteItem={handleDeleteItem} />
      )}
    </Pressable>
  );
};
