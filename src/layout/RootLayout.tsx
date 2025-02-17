import { Box, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import MobileSideBar from "../components/Sidebar/MobileSidebar";
import DesktopSidebar from "../components/Sidebar/DesktopSidebar";

function RootLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box as="div" display="flex" flexDirection="row" alignItems="stretch">
      <MobileSideBar isOpen={isOpen} onClose={onClose} />
      <DesktopSidebar />
      <Box display="flex" flexDirection="column" gap="2" w="full" m="2">
        <Box
          as="div"
          className="w-full flex flex-col lg:flex-row justify-between lg:items-start px-4 py-2 gap-4"
        >
          <NavBar onOpen={onOpen} />
        </Box>
        <Box mx="4">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default RootLayout;
