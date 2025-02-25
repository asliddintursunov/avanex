import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  headerContent: string;
  body: JSX.Element;
  footer?: JSX.Element;
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  isLoading?: boolean;
};

function ParentModal({
  isOpen,
  onClose,
  headerContent,
  body,
  footer,
  size,
  isLoading,
}: Props) {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const CloseButton = (): JSX.Element => {
    return (
      <Button
        loadingText={t("buttons.go_back")}
        isLoading={isLoading}
        variant="outline"
        bg="red.500"
        ml="2"
        color="white"
        _hover={{ bg: "red.700" }}
        onClick={onClose}
      >
        {t("buttons.go_back")}
      </Button>
    );
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size={size}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent
        // bg={colorMode === "light" ? "var(--white)" : "var(--black)"}
        bg={colorMode === "light" ? "gray.50" : "gray.800"}
      >
        <ModalHeader>{headerContent}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer || <CloseButton />}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ParentModal;
