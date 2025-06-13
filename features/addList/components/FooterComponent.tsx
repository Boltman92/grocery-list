import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

export const FooterComponent = ({
  handleSaveList,
  disabled,
}: {
  handleSaveList: () => void;
  disabled: boolean;
}) => {
  return (
    <Box className="mt-6 flex justify-center items-center">
      <Button
        variant="solid"
        onPress={handleSaveList}
        className="rounded-full"
        style={{ width: "75%" }}
        isDisabled={disabled}
      >
        <ButtonText>Save</ButtonText>
      </Button>
    </Box>
  );
};
