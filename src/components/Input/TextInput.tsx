import { Box, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  label: string;
  disabled?: boolean;
};

function TextInput({ value, setValue, label, disabled }: Props) {
  return (
    <Box as="div" w="full">
      <Box as="span">{label}</Box>
      <Input
        _placeholder={{
          fontWeight: disabled ? "semibold" : "",
          color: disabled ? "black" : "",
        }}
        rounded="lg"
        placeholder={label}
        type="text"
        value={value}
        onChange={(e) => {
          if (setValue) setValue(e.currentTarget.value);
        }}
        disabled={disabled}
      />
    </Box>
  );
}

export default TextInput;
