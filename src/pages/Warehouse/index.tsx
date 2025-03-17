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

  const th_td_style = {
    border: `1px solid ${colorMode === "light" ? "darkgray" : "gray"}`,
  };

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
          <Table textAlign="center" size="sm">
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th
                  style={th_td_style}
                  color={colorMode === "light" ? "black" : "gray.300"}
                >
                  {t("labels.group")}
                </Th>
                <Th
                  style={th_td_style}
                  color={colorMode === "light" ? "black" : "gray.300"}
                >
                  {t("labels.item_name")}
                </Th>
                <Th
                  style={th_td_style}
                  color={colorMode === "light" ? "black" : "gray.300"}
                >
                  {t("labels.total_quantity")}
                </Th>
                {warehouseNames.current.map((wh, index) => (
                  <Th
                    style={th_td_style}
                    color="black"
                    key={wh}
                    colSpan={3}
                    textAlign="center"
                    bg={
                      index === 0
                        ? "#E6D0C0"
                        : index === 1
                        ? "#C6D9F1"
                        : "#D8E4BC"
                    }
                    borderRight="2px solid black"
                  >
                    {wh}
                  </Th>
                ))}
              </Tr>
              <Tr>
                <Th style={th_td_style} colSpan={3}></Th>
                {warehouseNames.current.map((wh, index) => (
                  <>
                    <Th
                      key={wh + "-soni"}
                      color="black"
                      style={th_td_style}
                      bg={
                        index === 0
                          ? "#E6D0C0"
                          : index === 1
                          ? "#C6D9F1"
                          : "#D8E4BC"
                      }
                    >
                      {t("labels.quantity")}
                    </Th>
                    <Th
                      key={wh + "-bron"}
                      color="black"
                      style={th_td_style}
                      bg={
                        index === 0
                          ? "#E6D0C0"
                          : index === 1
                          ? "#C6D9F1"
                          : "#D8E4BC"
                      }
                    >
                      {t("labels.bron")}
                    </Th>
                    <Th
                      key={wh + "-kg"}
                      color="black"
                      style={th_td_style}
                      bg={
                        index === 0
                          ? "#E6D0C0"
                          : index === 1
                          ? "#C6D9F1"
                          : "#D8E4BC"
                      }
                      borderRight="2px solid black"
                    >
                      {t("labels.kg")}
                    </Th>
                  </>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {ItemsInStock?.data.map((item, index) => (
                <Tr
                  key={index}
                  cursor={"pointer"}
                  _hover={{
                    bg: colorMode === "light" ? "gray.100" : "gray.500",
                  }}
                >
                  <Td style={th_td_style}>{item.groupName}</Td>
                  <Td style={th_td_style}>{item.itemName}</Td>
                  <Td style={th_td_style}>{item.inStockTotal}</Td>
                  {warehouseNames.current.map((wh) => {
                    const warehouseData = item.documentLines.find(
                      (w) => w.warehouseName === wh
                    );
                    return (
                      <>
                        <Td style={th_td_style} key={wh + "-soni"}>
                          {warehouseData?.inStock || 0}
                        </Td>
                        <Td style={th_td_style} key={wh + "-bron"}>
                          {warehouseData?.ordered || 0}
                        </Td>
                        <Td style={th_td_style} key={wh + "-kg"}>
                          {/* {(warehouseData?.weight || 0).toFixed(2)} */}
                          {item.uoMCode}
                        </Td>
                      </>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {!ItemsInStock?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
      </Box>
    </Box>
  );
}

export default Warehouse;
