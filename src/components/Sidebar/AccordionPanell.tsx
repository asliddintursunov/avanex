import { AccordionPanel, Center, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
function AccordionPanell({
  index,
  path,
  value,
  Icon,
  colorMode,
}: {
  index: number;
  path: string;
  value: string;
  Icon: IconType;
  colorMode: "light" | "dark";
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AccordionPanel
      key={index}
      display="flex"
      alignItems="center"
      gap="3"
      p="3"
      mx="2"
      mb="1"
      borderRadius="lg"
      cursor="pointer"
      position="relative"
      role="group"
      transition="all 0.2s ease-in-out"
      bgColor={
        pathname === path || pathname.includes(path)
          ? colorMode === "light"
            ? "gray.200"
            : "gray.600"
          : ""
      }
      _hover={{
        bg: colorMode === "light" ? "gray.200" : "gray.600",
        transform: "translateX(4px)",
      }}
      _active={{
        bg: colorMode === "light" ? "gray.200" : "gray.600",
        transform: "scale(0.98)",
      }}
      onClick={() => navigate(path)}
    >
      {/* Icon with background */}
      <Center
        p="2"
        borderRadius="md"
        bg={colorMode === "light" ? "gray.100" : "gray.600"}
        color={colorMode === "light" ? "blue.500" : "blue.200"}
        transition="all 0.2s"
        _groupHover={{
          bg: colorMode === "light" ? "blue.50" : "blue.900",
          color: colorMode === "light" ? "blue.600" : "blue.300",
        }}
      >
        <Icon fontSize="xl" />
      </Center>

      {/* Text */}
      <Text
        flex="1"
        fontSize="sm"
        fontWeight="medium"
        transition="all 0.2s"
        _groupHover={{
          color: colorMode === "light" ? "blue.700" : "blue.200",
        }}
      >
        {value}
      </Text>
    </AccordionPanel>
  );
}

export default AccordionPanell;
