import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
} from "@chakra-ui/react";
import avanex_icon from "../../../assets/svg/avanex-icon.svg";
import Sidebar from "./Sidebar";

// Sidebar based on users' role
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileSideBar({ isOpen, onClose }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <div className="flex h-28 items-center justify-center">
            <div className="flex h-fit items-center justify-center">
              <Image src={avanex_icon} h="44" w="44" />
            </div>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <Sidebar />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
