import clsx from "clsx";
import { useColorMode } from "@chakra-ui/react";

// SIDEBARS
import Sidebar from "./Sidebar";

// import light_logo from "../../../assets/ventum_logo.png";
// import dark_logo from "../../../assets/ventum_logo.png";

export default function DesktopSidebar() {
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        "hidden lg:flex min-h-screen w-96 flex-col shadow-xl px-6",
        colorMode === "light" ? "bg-white" : "bg-gray-800"
      )}
    >
      {/* Logo Area */}
      <div className="flex h-28 items-center justify-center">
        {/* <Image
          src={colorMode === "dark" ? dark_logo : light_logo}
          h="full"
          w="44"
        /> */}
        <span className="text-3xl font-bold underline underline-offset-[6px]">
          Avanex
        </span>
      </div>
      <Sidebar />
    </div>
  );
}
