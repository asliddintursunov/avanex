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
import { formatCurrency, generateUrlWithParams } from "../../lib/helpers";
import { SalesType } from "../../types/invoices";
import TableNoData from "../../components/Table/TableNoData";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import SaleModal from "../../components/Modals/Sale/SaleModal";

function Sale() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [salesPersonName, setSalesPersonName] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const [debouncedCardName] = useDebounce(cardName, 500);
  const [salesItem, setSalesItem] = useState<SalesType>();

  const { data: Sales, isLoading } = useRQFetchData<{
    data: SalesType[];
  }>(
    [
      `invoices-${startDate}-${endDate}-${debouncedCardName}-${salesPersonName}-${skip}`,
    ],
    generateUrlWithParams("/invoices", {
      docDateStart: startDate && endDate ? startDate : undefined,
      docDateEnd: startDate && endDate ? endDate : undefined,
      cardName: debouncedCardName,
      salesPersonName: salesPersonName,
      skip: skip,
    })
  );

  return (
    <Box as="div" p={2}>
      <h1 className="text-4xl font-bold mb-4">{t("menus.sales")}</h1>
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
            dataLength={Sales?.data.length || 0}
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
                <Th>{t("labels.paid_to_date")}</Th>
                <Th>{t("labels.paid_sum")}</Th>
                <Th>{t("labels.u_type_order")}</Th>
                <Th>{t("labels.u_firma")}</Th>
                <Th>{t("labels.u_jonatildi")}</Th>
                <Th>{t("labels.u_yopildi")}</Th>
                <Th>{t("labels.u_ruxsat")}</Th>
                <Th>{t("labels.sales_person_name")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Sales?.data.length
                ? Sales.data.map((el, idx) => (
                    <Tr
                      key={idx}
                      cursor={"pointer"}
                      _hover={{
                        bg: colorMode === "light" ? "gray.300" : "gray.500",
                      }}
                      onClick={() => {
                        setSalesItem(el);
                        onOpen();
                      }}
                    >
                      <Td>№{el.docNum}</Td>
                      <Td>{el.cardName}</Td>
                      <Td>{el.docDate.split("T")[0]}</Td>
                      <Td>{formatCurrency(el.docTotalFc, "UZS")}</Td>
                      <Td>{formatCurrency(el.paidToDate, "USD")}</Td>
                      <Td>{formatCurrency(el.paidSum, "USD")}</Td>
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
        {!Sales?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
      </Box>
      <SaleModal isOpen={isOpen} onClose={onClose} saleItem={salesItem} />
    </Box>
  );
}

export default Sale;
