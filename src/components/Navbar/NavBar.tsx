import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { removeCookies } from "../../lib/actions";
import { BiLogOut } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import uz_flag from "../../../assets/img/uzb_flag.webp";
import ru_flag from "../../../assets/img/ru_flag.png";

const NavBar = ({ onOpen }: { onOpen: () => void }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { i18n, t } = useTranslation();
  const switchLanguage = (lang: "uz" | "ru") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handleLogOut = function () {
    // Clear all caches and storage, token, user data
    removeCookies();
    sessionStorage.clear();
    navigate("/login");
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex justify-end">
      <ul
        className={clsx(
          "w-full flex justify-start lg:justify-between items-center py-2 px-5 gap-4 rounded-full",
          colorMode === "light" ? "bg-gray-100" : "bg-gray-800"
        )}
      >
        <Box
          as="li"
          className="rounded-full w-10 h-10 grid place-content-center lg:hidden cursor-pointer"
        >
          <HamburgerIcon
            className="text-xl"
            color={"gray.500"}
            onClick={onOpen}
          />
        </Box>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            colorScheme="teal"
          >
            <Box as="div" display="flex" alignItems="center" gap="4">
              <Image
                display="inline"
                src={localStorage.getItem("lang") === "uz" ? uz_flag : ru_flag}
                width={30}
                height={30}
                objectFit="contain"
              />
              <Text>{localStorage.getItem("lang") === "uz" ? "UZ" : "РУ"}</Text>
            </Box>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => switchLanguage("uz")}>
              <Image
                display="inline"
                src={uz_flag}
                width={30}
                height={30}
                objectFit="contain"
              />{" "}
              uz
            </MenuItem>
            <MenuItem onClick={() => switchLanguage("ru")}>
              <Image
                display="inline"
                src={ru_flag}
                width={30}
                height={30}
                objectFit="contain"
              />{" "}
              ру
            </MenuItem>
          </MenuList>
        </Menu>
        <Box
          as="li"
          className="rounded-full w-10 h-10 grid place-content-center cursor-pointer"
        >
          {colorMode === "light" ? (
            <SunIcon
              onClick={toggleColorMode}
              className="text-xl"
              color={"gray.500"}
            />
          ) : (
            <MoonIcon
              onClick={toggleColorMode}
              className="text-xl"
              color={"gray.500"}
            />
          )}
        </Box>
        <Popover placement="top-start" isOpen={isOpen} onClose={handleClose}>
          <PopoverTrigger>
            <Button
              textColor={"red.400"}
              rounded="full"
              fontSize="2xl"
              onClick={() => setIsOpen(true)}
            >
              <BiLogOut />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">
              {t("buttons.want_to_logout")}
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Box as="div" display="flex" gap="2">
                <Button
                  bg="green.500"
                  _hover={{ bg: "green.600" }}
                  textColor="white"
                  onClick={handleLogOut}
                >
                  {t("buttons.yes")}
                </Button>
                <Button
                  bg="red.500"
                  _hover={{ bg: "red.600" }}
                  textColor="white"
                  onClick={handleClose}
                >
                  {t("buttons.no")}
                </Button>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ul>
    </nav>
  );
};

export default NavBar;
