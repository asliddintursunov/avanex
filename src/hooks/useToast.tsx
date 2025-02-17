import { useToast as ChakraToast } from "@chakra-ui/react";

type Props = {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading";
  position:
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "top"
    | "top-left"
    | "top-right";
};
export function useToast() {
  const toast = ChakraToast();
  const triggerToast = ({ title, description, status, position }: Props) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      position: position,
    });
  };

  return triggerToast;
}
