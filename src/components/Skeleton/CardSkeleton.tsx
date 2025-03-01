import { Box, useColorMode } from "@chakra-ui/react";

type Props = {
  skeletonNumber: number;
};

function CardSkeleton({ skeletonNumber }: Props) {
  const { colorMode } = useColorMode();
  return (
    <>
      {[...Array(skeletonNumber)].map((_, idx) => (
        <Box
          as="div"
          key={idx}
          bg={colorMode === "light" ? "white" : "gray.600"}
          className="flex-1 flex flex-col max-w-md mx-auto rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          {/* Header skeleton */}
          <Box
            as="div"
            bg={colorMode === "light" ? "blue.100" : "blue.800"}
            className="px-6 py-4"
          >
            <Box
              as="div"
              bg={colorMode === "light" ? "blue.200" : "blue.600"}
              className="h-6 w-40 rounded"
            ></Box>
          </Box>

          {/* Content skeleton */}
          <Box as="div" className="p-6 space-y-4">
            {/* Transaction count skeleton */}
            <Box as="div" className="flex justify-between items-center">
              <Box
                as="div"
                bg={colorMode === "light" ? "gray.200" : "gray.400"}
                className="h-4 w-32 rounded"
              ></Box>
              <Box
                as="div"
                bg={colorMode === "light" ? "gray.200" : "gray.400"}
                className="h-6 w-8 rounded"
              ></Box>
            </Box>

            {/* Sum FC skeleton */}
            <Box as="div" className="flex justify-between items-center">
              <Box
                as="div"
                bg={colorMode === "light" ? "gray.200" : "gray.400"}
                className="h-4 w-36 rounded"
              ></Box>
              <Box
                as="div"
                bg={colorMode === "light" ? "gray.200" : "gray.400"}
                className="h-6 w-28 rounded"
              ></Box>
            </Box>

            {/* sum SC skeleton */}
            <Box as="div" className="flex justify-between items-center">
              <Box
                as="div"
                bg={colorMode === "light" ? "gray.200" : "gray.400"}
                className="h-4 w-40 rounded"
              ></Box>
              <Box
                as="div"
                bg={colorMode === "light" ? "gray.200" : "gray.400"}
                className="h-6 w-24 rounded"
              ></Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default CardSkeleton;
