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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  saleItem?: SalesType;
};

function SalesOrderModal({ isOpen, onClose, saleItem }: Props) {
  const { t } = useTranslation();
  const tableInfo: {
    label: string;
    value: string | number | undefined | null;
  }[][] = [
    [
      {
        label: t("labels.doc_num"),
        value: saleItem?.docNum,
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
        label: t("labels.quantity"),
        value: "Table quantity",
      },
    ],
    [
      {
        label: t("labels.price"),
        value: "Table price USD",
      },
      {
        label: t("labels.price"),
        value: "Table price UZS",
      },
      {
        label: t("labels.line_total"),
        value: "Table line total",
      },
      {
        label: t("labels.doc_total"),
        value: `${saleItem?.docTotalSys} USD`,
      },
      {
        label: t("labels.doc_total"),
        value: `${saleItem?.docTotalFc} UZS`,
      },
    ],
    [
      {
        label: t("labels.item_code"),
        value: "Table Item code",
      },
      {
        label: t("labels.item_name"),
        value: "Table item name",
      },
      {
        label: t("labels.weight"),
        value: "Table weight",
      },
      {
        label: t("labels.paid_to_date"),
        value: saleItem?.paidToDate,
      },
      {
        label: t("labels.paid_sum"),
        value: saleItem?.paidSum,
      },
    ],
    [
      {
        label: t("labels.u_type_order"),
        value: "U type order || Backend kutilyapti",
      },
      {
        label: t("labels.u_rulon"),
        value: "U rulon || Backend kutilyapti",
      },
      {
        label: t("labels.u_list"),
        value: "U list || Backend kutilyapti",
      },
      {
        label: t("labels.u_kesildi"),
        value: "U kesildi || Backend kutilyapti",
      },
      {
        label: t("labels.u_kesilgan_soni"),
        value: "U kesilgan soni || Backend kutilyapti",
      },
      {
        label: t("labels.u_tip_dostavka"),
        value: saleItem?.uTipdostavka,
      },
    ],
    [
      {
        label: t("labels.u_jonatildi"),
        value: saleItem?.uJonatildi,
      },
      { label: t("labels.u_yopildi"), value: saleItem?.uYopildi },
      { label: t("labels.warehouse_code"), value: "Warehouse code table" },
      { label: t("labels.warehouse_name"), value: "Warehouse name table" },
    ],
  ];

  const SaleItemTable = (): JSX.Element => {
    return (
      <Table variant="striped" colorScheme="gray" textAlign="center">
        <Thead>
          <Tr>
            <Th>{t("labels.price")}</Th>
            <Th>{t("labels.item_name")}</Th>
            <Th>{t("labels.weight")}</Th>
            <Th>{t("labels.warehouse_code")}</Th>
            <Th>{t("labels.warehouse_name")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {saleItem?.documentLines.length &&
            saleItem.documentLines.map((item, index) => (
              <Tr key={index}>
                <Td>{item.priceFC} UZS</Td>
                <Td>{item.itemDescription}</Td>
                <Td>{item.weight1}</Td>
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
          {[0, 1, 2].map((nth) => (
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

export default SalesOrderModal;
