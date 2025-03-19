import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { ItemsInStockType } from "../../types/warehouse";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../lib/helpers";
import { useTranslation } from "react-i18next";
import TextInput from "../../components/Input/TextInput";
import Pagination from "../../components/Pagination/Pagination";
import TableNoData from "../../components/Table/TableNoData";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import DownloadWarehouse from "../../components/Button/DownloadButton/DownloadWarehouse";

function Warehouse() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();

  const warehouseNames = useRef<string[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const [debouncedGroupName] = useDebounce(groupName, 500);
  const [debouncedItemName] = useDebounce(itemName, 500);

  const { data: ItemsInStock, isLoading } = useRQFetchData<{
    data: ItemsInStockType[];
  }>(
    [
      `items/in-stock-${debouncedGroupName}-${debouncedItemName}-${skip}`,
      debouncedGroupName,
      debouncedItemName,
      skip,
    ],
    generateUrlWithParams("/items/in-stock", {
      groupName,
      itemName,
      skip,
    })
  );

  if (ItemsInStock?.data.length) {
    const whsNames = Array.from(
      new Set(
        ItemsInStock.data.flatMap((item) =>
          item.documentLines.map((d) => d.warehouseName)
        )
      )
    );
    warehouseNames.current = whsNames;
  }
  return (
    <Box as="div" p={2}>
      <h1 className="text-4xl font-bold mb-4">{t("menus.warehouse")}</h1>

      <Box
        overflowX="auto"
        boxShadow="base"
        borderRadius="md"
        p={4}
        bg={colorMode === "light" ? "white" : "gray.600"}
      >
        <Box
          as="div"
          display={"flex"}
          flexDirection={"row"}
          alignItems={"end"}
          gap={"6"}
          mb="4"
        >
          <Box
            w="full"
            display="flex"
            width="50%"
            alignItems="end"
            justifyContent="start"
            gap="4"
          >
            <TextInput
              label={t("labels.group_name")}
              value={groupName}
              setValue={setGroupName}
            />
            <TextInput
              label={t("labels.item_name")}
              value={itemName}
              setValue={setItemName}
            />
          </Box>
          <Pagination
            dataLength={ItemsInStock?.data.length || 0}
            skip={skip}
            setSkip={setSkip}
          />
        </Box>
        {!isLoading && (
          <Table variant="striped" colorScheme="gray" textAlign="center">
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th>{t("labels.group")}</Th>
                <Th>{t("labels.item_name")}</Th>
                <Th>{t("labels.total_quantity")}</Th>
                <Th>{t("labels.total_bron")}</Th>
                <Th>{t("labels.available_quantity")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ItemsInStock?.data.map((item, index) => (
                <Tr
                  key={index}
                  cursor={"pointer"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.300" : "gray.500",
                  }}
                >
                  <Td>{item.groupName}</Td>
                  <Td>{item.itemName}</Td>
                  <Td>{item.inStockTotal}</Td>
                  <Td>{item.orderedTotal}</Td>
                  <Td>{item.inStockTotal - Number(item.orderedTotal)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {isLoading && <TableSkeleton />}
        <DownloadWarehouse groupName={groupName} itemName={itemName} />
        {!ItemsInStock?.data.length && !isLoading && <TableNoData />}
      </Box>
    </Box>
  );
}

export default Warehouse;
