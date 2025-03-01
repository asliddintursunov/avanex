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
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { ReturnedSalesType } from "../../types/returned-sales";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../lib/helpers";
import { useTranslation } from "react-i18next";
import DateInput from "../../components/Input/DateInput";
import TextInput from "../../components/Input/TextInput";
import Pagination from "../../components/Pagination/Pagination";
import TableNoData from "../../components/Table/TableNoData";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import ReturnedSalesModal from "../../components/Modals/ReturnedSales/ReturnedSalesModal";

function ReturnedSales() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const [debouncedCardName] = useDebounce(cardName, 500);
  const [returnedSaleItem, setReturnedSaleItem] = useState<ReturnedSalesType>();

  const { data: ReturnedSales, isLoading } = useRQFetchData<{
    data: ReturnedSalesType[];
  }>(
    [
      `credit-notes-${startDate}-${endDate}-${debouncedCardName}-${skip}`,
      startDate,
      endDate,
      debouncedCardName,
      skip,
    ],
    generateUrlWithParams("/credit-notes", {
      docDateStart: startDate && endDate ? startDate : undefined,
      docDateEnd: startDate && endDate ? endDate : undefined,
      cardName: debouncedCardName,
      skip: skip,
    })
  );
  return (
    <Box as="div" p={2}>
      <h1 className="text-4xl font-bold mb-4">{t("menus.returned_sales")}</h1>
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
          </Box>
          <Pagination
            dataLength={ReturnedSales?.data.length || 0}
            skip={skip}
            setSkip={setSkip}
          />
        </Box>
        {!isLoading && (
          <Table variant="striped" colorScheme="gray" textAlign="center">
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th>{t("labels.doc_num")}</Th>
                <Th>{t("labels.card_name")}</Th>
                <Th>{t("labels.doc_date")}</Th>
                <Th>{t("labels.doc_total")}</Th>
                <Th>{t("labels.u_type_order")}</Th>
                <Th>{t("labels.u_firma")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ReturnedSales?.data.length
                ? ReturnedSales.data.map((el, idx) => (
                    <Tr
                      key={idx}
                      cursor={"pointer"}
                      _hover={{
                        bg: colorMode === "light" ? "gray.300" : "gray.500",
                      }}
                      onClick={() => {
                        setReturnedSaleItem(el);
                        onOpen();
                      }}
                    >
                      <Td>№{el.docNum}</Td>
                      <Td>{el.cardName}</Td>
                      <Td>{el.docDate.split("T")[0]}</Td>
                      <Td>{`${el.docTotalFc} UZS`}</Td>
                      <Td>{el.uTypeOrder || "Null"}</Td>
                      <Td>{el.uFirma || "Null"}</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        )}
        {!ReturnedSales?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
      </Box>
      <ReturnedSalesModal
        isOpen={isOpen}
        onClose={onClose}
        returnedSaleItem={returnedSaleItem}
      />
    </Box>
  );
}

export default ReturnedSales;
