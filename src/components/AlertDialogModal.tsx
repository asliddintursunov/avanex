import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  description: string;
  status: "success" | "error" | "info";
  onClose: () => void;
  isOpen: boolean;
};

function AlertDialogModal(props: Props) {
  const cancelRef = useRef<any>();
  const { t } = useTranslation();
  const {colorMode} = useColorMode()

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          bg={
            props.status === "success"
              ? (colorMode === "light" ? "gray.200" : "gray.600")
              : props.status === "error"
              ? ("red.400")
              : "gray.400"
          }
        >
          <AlertDialogHeader>
            {props.status === "success"
              ? t("toast_messages.success")
              : t("toast_messages.error")}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text fontSize="xl">{props.description}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="blue" ml={3} onClick={props.onClose}>
              {t("buttons.understandable")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AlertDialogModal;
