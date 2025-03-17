import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  Th,
  Select,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { SalesOrdersType } from "../../../types/orders";
import ParentModal from "../ParentModal";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { formatCurrency } from "../../../lib/helpers";

type EditedDataType = {
  uTypeOrder: string;
  uFirma: string;
  uTipdostavka: number;
  uJonatildi: string;
  uYopildi: string;
  uRuxsat: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  itemOrder?: SalesOrdersType;
};

function SalesOrderModal({ isOpen, onClose, itemOrder }: Props) {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const { sendData } = useFetch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<EditedDataType>({
    uJonatildi: itemOrder?.uJonatildi || "",
    uYopildi: itemOrder?.uYopildi || "",
    uRuxsat: itemOrder?.uRuxsat || "",
    uTypeOrder: itemOrder?.uTypeOrder || "",
    uFirma: itemOrder?.uFirma || "",
    uTipdostavka: itemOrder?.uTipdostavka || 0,
  });

  const handleSent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedData((prev) => ({
      ...prev,
      uJonatildi: e.target.value,
    }));
  };

  const handleClosed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedData((prev) => ({
      ...prev,
      uYopildi: e.target.value,
    }));
  };

  const handleAllowed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedData((prev) => ({
      ...prev,
      uRuxsat: e.target.value,
    }));
  };

  const tableInfo: {
    label: string;
    value: string | number | undefined | null | JSX.Element;
  }[][] = [
    [
      { label: t("labels.doc_num"), value: `№ ${itemOrder?.docNum}` },
      {
        label: t("labels.doc_total"),
        value: formatCurrency(itemOrder?.docTotalFc || 0, "UZS"),
      },
      { label: t("labels.card_name"), value: itemOrder?.cardName },
      {
        label: t("labels.doc_date"),
        value: itemOrder?.docDate.split("T")[0],
      },
    ],
    [
      {
        label: t("labels.u_tip_dostavka"),
        value: itemOrder?.uTipdostavkaName || "Null",
      },
      {
        label: t("labels.u_jonatildi"),
        value: isEditClicked ? (
          <Select onChange={handleSent} value={editedData.uJonatildi}>
            <option value={t("labels.sent")}>{t("labels.sent")}</option>
            <option value={t("labels.not_sent")}>{t("labels.not_sent")}</option>
          </Select>
        ) : (
          itemOrder?.uJonatildi
        ),
      },
      { label: t("labels.u_type_order"), value: itemOrder?.uTypeOrder },
      {
        label: t("labels.u_yopildi"),
        value: isEditClicked ? (
          <Select onChange={handleClosed} value={editedData.uYopildi}>
            <option value={t("labels.closed")}>{t("labels.closed")}</option>
            <option value={t("labels.not_closed")}>
              {t("labels.not_closed")}
            </option>
          </Select>
        ) : (
          itemOrder?.uYopildi
        ),
      },
    ],
    [
      {
        label: t("labels.u_ruxsat"),
        value: isEditClicked ? (
          <Select onChange={handleAllowed} value={editedData.uRuxsat}>
            <option value={t("labels.yes")}>{t("labels.yes")}</option>
            <option value={t("labels.no")}>{t("labels.no")}</option>
          </Select>
        ) : (
          itemOrder?.uRuxsat
        ),
      },
      { label: t("labels.u_firma"), value: itemOrder?.uFirma || "Null" },
      {
        label: t("labels.price"),
        value: itemOrder?.uNarx || "Null",
      },
      {
        label: t("labels.specification"),
        value: itemOrder?.uSpecification || "Null",
      },
    ],
  ];

  const CommentHeader = (): JSX.Element => {
    return (
      <Flex
        align="center"
        ml="6"
        mt="2"
        px="3"
        py="2"
        borderLeft="2px solid"
        borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
      >
        <Text
          as="span"
          fontSize="md"
          fontWeight="medium"
          color={colorMode === "light" ? "gray.700" : "gray.300"}
        >
          {t("labels.comment")}:
        </Text>
        <Text
          as="span"
          fontSize="md"
          ml="2"
          fontStyle={itemOrder?.comments ? "normal" : "italic"}
          color={
            itemOrder?.comments
              ? colorMode === "light"
                ? "black"
                : "white"
              : colorMode === "light"
              ? "gray.500"
              : "gray.400"
          }
        >
          {itemOrder?.comments || t("labels.no_comment")}
        </Text>
      </Flex>
    );
  };

  const ItemOrderTable = (): JSX.Element => {
    return (
      <Table variant="striped" colorScheme="gray" textAlign="center">
        <Thead>
          <Tr>
            <Th>{t("labels.price")}</Th>
            <Th>{t("labels.item_name")}</Th>
            <Th>{t("labels.weight")}</Th>
            <Th>{t("labels.measure_unit")}</Th>
            <Th>{t("labels.warehouse_code")}</Th>
            <Th>{t("labels.warehouse_name")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {itemOrder?.documentLines.length &&
            itemOrder.documentLines.map((item, index) => (
              <Tr key={index}>
                <Td>{formatCurrency(item.priceFC, "UZS")}</Td>
                <Td>{item.itemDescription}</Td>
                <Td>{item.weight1}</Td>
                <Td>{item.uoMName}</Td>
                <Td>{item.warehouseCode}</Td>
                <Td>{item.warehouseName}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    );
  };

  const ModalBody = (): JSX.Element => {
    return (
      <TableContainer mb={6}>
        <CommentHeader />
        <Table variant="simple">
          {[...Array(tableInfo.length)].map((_, nth) => (
            <Tr key={nth}>
              {tableInfo[nth].map((info, index) => (
                <Td key={index}>
                  <Flex align="center" gap={2}>
                    <Box>
                      <Text fontSize="sm" color="gray.500">
                        {info.label}
                      </Text>
                      <Text>{info.value}</Text>
                    </Box>
                  </Flex>
                </Td>
              ))}
            </Tr>
          ))}
        </Table>
        <ItemOrderTable />
      </TableContainer>
    );
  };

  const handleEdit = (docEntry: number): void => {
    setIsLoading(true);
    sendData({
      url: `${baseUrl}/orders/${docEntry}/bugalter`,
      data: editedData,
      method: "PATCH",
      success_message: t("toast_messages.success_sending_request"),
      error_message: t("toast_messages.error_sending_request"),
    })
      .then(() => {
        setIsLoading(false);
        onClose();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const ModalFooter = (): JSX.Element => {
    return (
      <>
        <Button
          loadingText={t(isEditClicked ? "buttons.save" : "buttons.edit")}
          isLoading={isLoading}
          variant="outline"
          bg={isEditClicked ? "green.500" : "yellow.500"}
          ml="2"
          color="white"
          _hover={{ bg: isEditClicked ? "green.700" : "yellow.700" }}
          onClick={() => {
            if (isEditClicked) {
              handleEdit(itemOrder?.docEntry || 0);
            } else {
              setIsEditClicked(true);
            }
          }}
        >
          {t(isEditClicked ? "buttons.save" : "buttons.edit")}
        </Button>
        <Button
          loadingText={t("buttons.go_back")}
          isLoading={isLoading}
          variant="outline"
          bg="red.500"
          ml="2"
          color="white"
          _hover={{ bg: "red.700" }}
          onClick={onClose}
        >
          {t("buttons.go_back")}
        </Button>
      </>
    );
  };

  return (
    <ParentModal
      body={<ModalBody />}
      footer={<ModalFooter />}
      headerContent=""
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
    />
  );
}

export default SalesOrderModal;
