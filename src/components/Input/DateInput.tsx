import { Box, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
};

function DateInput({ label, value, setValue }: Props) {
  return (
    <Box as="data" display="flex" alignItems="center" gap="4" w="full">
      <Box as="div" w="full">
        <Box as="span">{label}</Box>
        <Input
          type="date"
          value={value.split("T")[0]}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </Box>
    </Box>
  );
}

export default DateInput;
