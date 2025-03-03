import { Box, Text, useColorMode } from "@chakra-ui/react";

type Props = {
  label: string;
  value: string | number;
};

function DisabledInput({ label, value }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box display="flex" flexDir="column" gap={1} w="60">
      <Text fontWeight="medium">{label}</Text>
      <Text
        border="2px"
        borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
        px="4"
        py="2"
        bg={colorMode === "light" ? "gray.200" : "gray.800"}
      >
        {value}
      </Text>
    </Box>
  );
}

export default DisabledInput;
