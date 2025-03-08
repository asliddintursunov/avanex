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
} from "@chakra-ui/react";
import { SalesType } from "../../../types/invoices";
import ParentModal from "../ParentModal";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../../lib/helpers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  saleItem?: SalesType;
};

function SaleModal({ isOpen, onClose, saleItem }: Props) {
  const { t } = useTranslation();
  const tableInfo: {
    label: string;
    value: string | number | undefined | null;
  }[][] = [
    [
      {
        label: t("labels.doc_num"),
        value: `№ ${saleItem?.docNum}`,
      },
      {
        label: t("labels.card_name"),
        value: saleItem?.cardName,
      },
      {
        label: t("labels.doc_date"),
        value: saleItem?.docDate.split("T")[0],
      },
      {
        label: t("labels.doc_total"),
        value: formatCurrency(saleItem?.docTotalFc || 0, "UZS"),
      },
      {
        label: t("labels.paid_to_date"),
        value: formatCurrency(saleItem?.paidToDateFC || 0, "UZS"),
      },
    ],
    [
      {
        label: t("labels.u_type_order"),
        value: saleItem?.uTypeOrder || "Null",
      },
      {
        label: t("labels.u_tip_dostavka"),
        value: saleItem?.uTipdostavka || "Null",
      },
      {
        label: t("labels.u_jonatildi"),
        value: saleItem?.uJonatildi || "Null",
      },
      { label: t("labels.u_yopildi"), value: saleItem?.uYopildi },
      { label: t("labels.u_firma"), value: saleItem?.uFirma || "Null" },
    ],
  ];

  const SaleItemTable = (): JSX.Element => {
    return (
      <Table variant="striped" colorScheme="gray" textAlign="center">
        <Thead>
          <Tr>
            <Th>{t("labels.quantity")}</Th>
            <Th>{t("labels.price")}</Th>
            <Th>{t("labels.row_total")}</Th>
            <Th>{t("labels.item_code")}</Th>
            <Th>{t("labels.item_name")}</Th>
            <Th>{t("labels.weight")}</Th>
            <Th>{t("labels.u_rulon")}</Th>
            <Th>{t("labels.u_list")}</Th>
            <Th>{t("labels.u_kesilgan_soni")}</Th>
            <Th>{t("labels.warehouse_code")}</Th>
            <Th>{t("labels.warehouse_name")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {saleItem?.documentLines.length &&
            saleItem.documentLines.map((item, index) => (
              <Tr key={index}>
                <Td>{item.quantity}</Td>
                <Td>{formatCurrency(item.priceFC, "USZ")}</Td>
                <Td>{formatCurrency(item.rowTotalFC, "UZS")}</Td>
                <Td>{item.itemCode}</Td>
                <Td>{item.itemDescription}</Td>
                <Td>{item.weight1}</Td>
                <Td>{item.uRulon || "Null"}</Td>
                <Td>{item.uList || "Null"}</Td>
                <Td>{item.uKesilgansoni || "Null"}</Td>
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
        <SaleItemTable />
      </TableContainer>
    );
  };

  return (
    <ParentModal
      body={<ModalBody />}
      headerContent=""
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
    />
  );
}

export default SaleModal;
