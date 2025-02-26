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
import { SalesOrdersType } from "../../../types/orders";
import ParentModal from "../ParentModal";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  itemOrder?: SalesOrdersType;
};

function SalesOrderModal({ isOpen, onClose, itemOrder }: Props) {
  const { t } = useTranslation();
  const tableInfo: {
    label: string;
    value: string | number | undefined | null;
  }[][] = [
    [
      { label: t("labels.doc_num"), value: `№ ${itemOrder?.docNum}` },
      { label: t("labels.doc_total"), value: `${itemOrder?.docTotalFc} UZS` },
      { label: t("labels.card_name"), value: itemOrder?.cardName },
      {
        label: t("labels.doc_date"),
        value: itemOrder?.docDate.split("T")[0],
      },
    ],
    [
      {
        label: t("labels.u_tip_dostavka"),
        value: itemOrder?.uTipdostavka || "Null",
      },
      {
        label: t("labels.u_jonatildi"),
        value: itemOrder?.uJonatildi,
      },
      { label: t("labels.u_type_order"), value: itemOrder?.uTypeOrder },
      { label: t("labels.u_yopildi"), value: itemOrder?.uYopildi },
    ],
    [
      { label: t("labels.u_ruxsat"), value: itemOrder?.uRuxsat },
      { label: t("labels.u_firma"), value: itemOrder?.uFirma || "Null" },
      {
        label: t("labels.price"),
        value: "u_Narx",
      },
    ],
  ];

  const ItemOrderTable = (): JSX.Element => {
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
          {itemOrder?.documentLines.length &&
            itemOrder.documentLines.map((item, index) => (
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
        <ItemOrderTable />
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
