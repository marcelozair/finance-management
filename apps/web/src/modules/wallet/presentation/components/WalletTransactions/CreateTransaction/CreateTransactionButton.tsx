import { Button } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";

interface CreateTransactionButtonProps {
  onClick: () => void;
}

export const CreateTransactionButton = ({
  onClick,
}: CreateTransactionButtonProps) => {
  return (
    <Button
      width="100%"
      borderRadius="md"
      border="dashed 1px"
      borderColor="gray.300"
      variant="ghost"
      onClick={onClick}
    >
      <PiPlus />
      New Transaction
    </Button>
  );
};
