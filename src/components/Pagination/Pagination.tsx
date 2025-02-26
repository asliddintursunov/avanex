import { Box, Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  skip: number;
  setSkip: Dispatch<SetStateAction<number>>;
  dataLength: number;
};

function Pagination({ skip, setSkip, dataLength }: Props) {
  return (
    <Box
      as="div"
      justifyContent={"end"}
      flex="1"
      mr="2"
      display="flex"
      gap={1}
      alignItems={"center"}
    >
      <Button
        colorScheme="gray"
        variant={"outline"}
        disabled={skip === 0}
        onClick={() => setSkip((prev) => prev - 20)}
      >
        <FaArrowLeft />
      </Button>
      <Box as="span">{skip / 20 + 1}</Box>
      <Button
        colorScheme="gray"
        variant={"outline"}
        disabled={dataLength < 20}
        onClick={() => setSkip((prev) => prev + 20)}
      >
        <FaArrowRight />
      </Button>
    </Box>
  );
}

export default Pagination;
