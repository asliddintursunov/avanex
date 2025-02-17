import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import light_logo from "../../../assets/ventum_image.png";
import dark_logo from "../../../assets/ventum_logo.png";
import Sidebar from "./Sidebar";

// Sidebar based on users' role
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileSideBar({ isOpen, onClose }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <div className="flex h-28 items-center justify-center">
            <Image
              src={colorMode === "dark" ? dark_logo : light_logo}
              h="full"
              w="44"
            />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <Sidebar />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
