import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export const EmptyListComponent = () => {
  const router = useRouter();
  const handleAddList = () => router.navigate("/list/new");
  return (
    <Box className="flex flex-1 justify-center items-center gap-8">
      <Text size="xl" className="font-semibold">
        There are no lists yet. Want to create one?
      </Text>
      <Button size="xl" onPress={handleAddList} className="rounded-full">
        <ButtonText size="xl">Add list</ButtonText>
      </Button>
    </Box>
  );
};
