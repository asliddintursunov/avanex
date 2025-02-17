import { createContext, useState } from "react";
import AlertDialogModal from "../components/AlertDialogModal";

type DialogContextType = {
  showDialog: (
    title: string,
    description: string,
    status: "success" | "error" | "info"
  ) => void;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    status: "success" | "error" | "info";
    title: string;
    description: string;
  }>({
    status: "info",
    title: "",
    description: "",
  });

  const showDialog = (
    title: string,
    description: string,
    status: "success" | "error" | "info"
  ) => {
    setDialogContent({ title, description, status });
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <AlertDialogModal
        status={dialogContent.status}
        title={dialogContent.title}
        description={dialogContent.description}
        onClose={closeDialog}
        isOpen={isOpen}
      />
    </DialogContext.Provider>
  );
}
