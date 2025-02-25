import { Box, Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Props = {
  pagination: number;
  setPagination: Dispatch<SetStateAction<number>>;
  dataLength: number;
};

function Pagination({ pagination, setPagination, dataLength }: Props) {
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
        disabled={pagination === 0}
        onClick={() => setPagination((prev) => prev - 1)}
      >
        <FaArrowLeft />
      </Button>
      <Box as="span">{pagination + 1}</Box>
      <Button
        colorScheme="gray"
        variant={"outline"}
        disabled={dataLength < 20}
        onClick={() => setPagination((prev) => prev + 1)}
      >
        <FaArrowRight />
      </Button>
    </Box>
  );
}

export default Pagination;
