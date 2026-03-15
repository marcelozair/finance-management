import { Dialog } from "@chakra-ui/react";

interface ModalProps {
  title?: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
  isOpen?: boolean;
  size: "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
}

export const Modal = ({
  title,
  isOpen,
  body,
  footer,
  size = "sm",
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} size={size} placement="center">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{body}</Dialog.Body>
          <Dialog.Footer>{footer}</Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
