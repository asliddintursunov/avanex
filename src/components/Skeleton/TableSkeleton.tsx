import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Skeleton,
} from "@chakra-ui/react";

const TableSkeleton = ({ rowSize = 15 }: { rowSize?: number }) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Tbody>
          {/* Skeleton Rows */}
          {[...Array(rowSize)].map((_, index) => (
            <Tr key={index}>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
              <Td>
                <Skeleton height="10px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
