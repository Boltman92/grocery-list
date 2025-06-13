import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Item } from "@/types";

export const RenderItems = ({
  item,
  handleDeleteItem,
}: {
  item: Item;
  handleDeleteItem: (createdAt: string) => void;
}) => {
  return (
    <Box className="flex flex-row justify-between items-center pl-10 pr-10">
      <Text className="flex-1" size="2xl">
        {item.name}
      </Text>
      <Text className="w-8 ml-4 pl-4 flex-auto" size="2xl">
        {item.amount}
      </Text>
      <Button
        className="bg-inherit flex justify-center items-center"
        onPress={() => handleDeleteItem(item.createdAt)}
        variant="link"
      >
        <Icon as={CloseIcon} color="#9ca3af" />
      </Button>
    </Box>
  );
};
