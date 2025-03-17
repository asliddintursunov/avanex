import clsx from "clsx";
import { Image, useColorMode } from "@chakra-ui/react";

// SIDEBARS
import Sidebar from "./Sidebar";
import avanex_icon from "../../../assets/svg/avanex-icon.svg";

export default function DesktopSidebar() {
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        "hidden lg:flex min-h-screen w-96 flex-col shadow-xl pl-1 pr-3",
        colorMode === "light" ? "bg-white" : "bg-gray-800"
      )}
    >
      {/* Logo Area */}
      <div className="flex h-fit items-center justify-center">
        <Image src={avanex_icon} h="44" w="44" />
      </div>
      <Sidebar />
    </div>
  );
}
