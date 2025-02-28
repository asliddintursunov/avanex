import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import TextInput from "../../components/Input/TextInput";
import { useTranslation } from "react-i18next";
import Pagination from "../../components/Pagination/Pagination";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import DateInput from "../../components/Input/DateInput";
import SalesPerons from "../../components/Select/SalesPersonsSelect";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../lib/helpers";
import { SalesOrdersType } from "../../types/orders";
import TableNoData from "../../components/Table/TableNoData";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import SalesOrderModal from "../../components/Modals/Orders/SalesOrdersModal";
function SalesOrder() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [salesPersonName, setSalesPersonName] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const [debouncedCardName] = useDebounce(cardName, 500);
  const [orderItem, setOrderItem] = useState<SalesOrdersType>();

  const { data: Orders, isLoading } = useRQFetchData<{
    data: SalesOrdersType[];
  }>(
    [
      `orders-${startDate}-${endDate}-${debouncedCardName}-${salesPersonName}-${skip}`,
    ],
    generateUrlWithParams("/orders", {
      docDateStart: startDate && endDate ? startDate : undefined,
      docDateEnd: startDate && endDate ? endDate : undefined,
      cardName: debouncedCardName,
      salesPersonName: salesPersonName,
      skip: skip,
    }),
    true
  );

  return (
    <Box as="div" p={2}>
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
            <DateInput
              value={startDate}
              setValue={setStartDate}
              label={t("labels.start_date")}
            />
            <DateInput
              value={endDate}
              setValue={setEndDate}
              label={t("labels.end_date")}
            />
            <TextInput
              label={t("labels.card_name")}
              value={cardName}
              setValue={setCardName}
            />
            <SalesPerons setValue={setSalesPersonName} />
          </Box>
          <Pagination
            dataLength={Orders?.data.length || 0}
            skip={skip}
            setSkip={setSkip}
          />
        </Box>
        {!isLoading && (
          <Table colorScheme="gray" textAlign="center">
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th>{t("labels.doc_num")}</Th>
                <Th>{t("labels.card_name")}</Th>
                <Th>{t("labels.doc_date")}</Th>
                <Th>{t("labels.doc_total")}</Th>
                <Th>{t("labels.u_type_order")}</Th>
                <Th>{t("labels.u_firma")}</Th>
                <Th>{t("labels.u_jonatildi")}</Th>
                <Th>{t("labels.u_yopildi")}</Th>
                <Th>{t("labels.u_ruxsat")}</Th>
                <Th>{t("labels.sales_person_name")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Orders?.data.length
                ? Orders.data.map((el, idx) => (
                    <Tr
                      key={idx}
                      cursor={"pointer"}
                      color="black"
                      bg={el.documentStatus === "O" ? "green.300" : "white"}
                      _hover={{
                        bg:
                          el.documentStatus === "O" ? "green.400" : "gray.100",
                      }}
                      onClick={() => {
                        setOrderItem(el);
                        onOpen();
                      }}
                    >
                      <Td>№{el.docNum}</Td>
                      <Td>{el.cardName}</Td>
                      <Td>{el.docDate.split("T")[0]}</Td>
                      <Td>{el.docTotal}</Td>
                      <Td>{el.uTypeOrder || "Null"}</Td>
                      <Td>{el.uFirma || "Null"}</Td>
                      <Td>{el.uJonatildi}</Td>
                      <Td>{el.uYopildi}</Td>
                      <Td>{el.uRuxsat}</Td>
                      <Td>{el.salesPersonName}</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        )}
        {!Orders?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
      </Box>
      {isOpen && (
        <SalesOrderModal
          isOpen={isOpen}
          onClose={onClose}
          itemOrder={orderItem}
        />
      )}
    </Box>
  );
}

export default SalesOrder;
