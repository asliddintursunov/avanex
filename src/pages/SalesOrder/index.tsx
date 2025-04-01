import {
  Box,
  Button,
  Checkbox,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import TextInput from "../../components/Input/TextInput";
import { useTranslation } from "react-i18next";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import DateInput from "../../components/Input/DateInput";
import SalesPerons from "../../components/Select/SalesPersonsSelect";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { formatCurrency, generateUrlWithParams } from "../../lib/helpers";
import { SalesOrdersType } from "../../types/orders";
import TableNoData from "../../components/Table/TableNoData";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import SalesOrderModal from "../../components/Modals/Orders/SalesOrdersModal";
import DownloadSalesOrder from "../../components/Button/DownloadButton/DownloadSalesOrder";
import { FaEye, FaSave } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import { useToast } from "../../hooks/useToast";

function SalesOrder() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sendData } = useFetch();
  const showToast = useToast();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [salesPersonName, setSalesPersonName] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const [debouncedCardName] = useDebounce(cardName, 500);
  const [orderItem, setOrderItem] = useState<SalesOrdersType>();
  const [ordersData, setOrdersData] = useState<SalesOrdersType[]>([]);
  const [isRuxsatChange, setIsRuxsatChange] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const { data: Orders, isLoading } = useRQFetchData<{
    data: SalesOrdersType[];
  }>(
    [
      `orders-${startDate}-${endDate}-${debouncedCardName}-${salesPersonName}-${warehouse}-${skip}`,
    ],
    generateUrlWithParams("/orders", {
      docDateStart: startDate && endDate ? startDate : undefined,
      docDateEnd: startDate && endDate ? endDate : undefined,
      cardName: debouncedCardName,
      salesPersonName: salesPersonName,
      uFirma: warehouse,
      skip: skip,
    }),
    false
  );

  useEffect(() => {
    setOrdersData(Orders?.data || []);
  }, [Orders]);

  const handleCheckboxChange = (docEntry: number, uRuxsat: string) => {
    const newRuxsat = uRuxsat === "Ха" ? "Йўқ" : "Ха";
    setIsRuxsatChange(true);
    setOrdersData(
      ordersData.map((order) =>
        order.docEntry === docEntry ? { ...order, uRuxsat: newRuxsat } : order
      )
    );
  };

  const handleSumbitRuxsatChange = async () => {
    setUpdating(true);
    const data = ordersData.map((el) => ({
      docEntry: el.docEntry,
      uRuxsat: el.uRuxsat,
    }));

    await sendData({
      url: `${baseUrl}/orders/bulk-update`,
      data: {
        orders: data,
      },
      method: "PATCH",
    })
      .then(() => {
        showToast({
          title: t("toast_messages.success"),
          description: t("toast_messages.success_updating_status"),
          status: "success",
          position: "top",
        });
      })
      .catch(() => {
        showToast({
          title: t("toast_messages.error"),
          description: t("toast_messages.error_updating_status"),
          status: "error",
          position: "top",
        });
      })
      .finally(() => {
        setUpdating(false);
        setIsRuxsatChange(false);
      });
  };

  return (
    <Box as="div" p={2}>
      <h1 className="text-4xl font-bold mb-4">{t("menus.sales_order")}</h1>

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
          <Box display="flex" flexDir="column" gap="1">
            <Text as="label">{t("labels.warehouse")}</Text>
            <Select size="md" onChange={(e) => setWarehouse(e.target.value)}>
              <option value="">{t("labels.warehouse")}</option>
              <option value="Avanta trade">Avanta trade</option>
              <option value="Avanex">Avanex</option>
            </Select>
          </Box>
          {isRuxsatChange && (
            <Button
              variant="solid"
              isLoading={updating}
              loadingText={t("buttons.save")}
              size="md"
              colorScheme="blue"
              onClick={handleSumbitRuxsatChange}
              rightIcon={<FaSave />}
            >
              {t("buttons.save")}
            </Button>
          )}
          <Pagination
            dataLength={ordersData.length || 0}
            skip={skip}
            setSkip={setSkip}
          />
        </Box>
        {!isLoading && (
          <Table
            colorScheme="gray"
            textAlign="center"
            sx={{
              th: {
                padding: "0.85rem",
                fontSize: "0.75rem",
              },
              td: {
                padding: "0.85rem",
                fontSize: "0.95rem",
              },
            }}
          >
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th>{t("labels.doc_num")}</Th>
                <Th></Th>
                <Th>{t("labels.card_name")}</Th>
                <Th>{t("labels.doc_date")}</Th>
                <Th>{t("labels.doc_total")}</Th>
                <Th>{t("labels.u_type_order")}</Th>
                <Th>{t("labels.u_firma")}</Th>
                <Th>{t("labels.num_at_card")}</Th>
                <Th>{t("labels.u_tip_dostavka")}</Th>
                <Th>{t("labels.specification")}</Th>
                <Th>{t("labels.u_ruxsat")}</Th>
                <Th>{t("labels.sales_person_name")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ordersData.length
                ? ordersData.map((el, idx) => (
                    <Tr
                      key={idx}
                      cursor={"pointer"}
                      color="black"
                      bg={el.documentStatus === "O" ? "white" : "green.300"}
                      _hover={{
                        bg:
                          el.documentStatus === "O" ? "gray.100" : "green.400",
                      }}
                    >
                      <Td>
                        <Box
                          as="div"
                          display="flex"
                          flexDir="row"
                          alignItems="center"
                          gap="2"
                        >
                          <Button
                            variant="solid"
                            size="sm"
                            colorScheme="blue"
                            onClick={() => {
                              setOrderItem(el);
                              onOpen();
                            }}
                          >
                            <FaEye />
                          </Button>
                          <Text fontSize="sm" fontWeight="bold">
                            №{el.docNum}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Checkbox
                          disabled={updating}
                          size="md"
                          borderColor="royalblue"
                          isChecked={el.uRuxsat === "Йўқ"}
                          onChange={() =>
                            handleCheckboxChange(el.docEntry, el.uRuxsat)
                          }
                        />
                      </Td>
                      <Td>{el.cardName}</Td>
                      <Td>{el.docDate.split("T")[0]}</Td>
                      <Td>{formatCurrency(el.docTotalFc, "UZS")}</Td>
                      <Td>{el.uTypeOrder || "Null"}</Td>
                      <Td>{el.uFirma || "Null"}</Td>
                      <Td>{el.numAtCard}</Td>
                      <Td>{el.uTipdostavkaName || "Null"}</Td>
                      <Td>{el.uSpecification || "Null"}</Td>
                      <Td>{el.uRuxsat}</Td>
                      <Td>{el.salesPersonName}</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        )}
        {!ordersData.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
        <DownloadSalesOrder />
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
