import { FC, PropsWithChildren } from "react";
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";

type ModalMode = "normal" | "bottomSheet";

interface ModalProps extends ChakraModalProps {
  isOpen: boolean;
  mode?: ModalMode;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  size = "lg",
  scrollBehavior = "outside",
  mode = "normal",
  ...props
}) => {
  const [isMobile] = useMediaQuery("(max-width: 30em)");
  const isMobileAndBottomSheet = mode === "bottomSheet" && isMobile;

  const modalMode = {
    mt: "auto",
    mb: isMobileAndBottomSheet ? "0" : "auto",
    borderRadius: isMobileAndBottomSheet ? "1.5rem 1.5rem 0px 0px" : "1.5rem",
  };

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior="outside"
      {...props}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(16px)" />
      <ModalContent {...modalMode}>
        <ModalCloseButton
          bgColor="gray.50"
          _hover={{ bgColor: "gray.100" }}
          w="10"
          h="10"
          borderRadius="full"
          zIndex="sticky"
        />
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
