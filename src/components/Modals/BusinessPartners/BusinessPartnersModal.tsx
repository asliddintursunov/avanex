import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { BusinessPartnerByCardNameType } from "../../../types/business-partners";
import ParentModal from "../ParentModal";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  partner?: BusinessPartnerByCardNameType;
};

function BusinessPartnersModal({ isOpen, onClose, partner }: Props) {
  const { t } = useTranslation();
  const tableInfo: {
    label: string;
    value: string | number | undefined | null;
  }[][] = [
    [
      { label: t("labels.partner_code"), value: partner?.cardCode },
      { label: t("labels.card_name"), value: partner?.cardName },
      { label: t("labels.group_code"), value: partner?.groupCode },
      { label: t("labels.group_name"), value: partner?.groupName },
    ],
    [
      { label: t("labels.phone"), value: partner?.phone1 || "Null" },
      {
        label: t("labels.current_account_balance"),
        value: partner?.currentAccountBalance,
      },
      { label: t("labels.currency"), value: partner?.defaultCurrency },
      {
        label: t("labels.card_type"),
        value:
          partner?.cardType === "C"
            ? t("labels.customer")
            : partner?.cardType === "S"
            ? t("labels.supplier")
            : "null",
      },
    ],
  ];

  const ModalBody = (): JSX.Element => {
    return (
      <TableContainer mb={6}>
        <Table variant="simple">
          <Tbody>
            <Tr>
              {tableInfo[0].map((info, index) => (
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
            <Tr>
              {tableInfo[1].map((info, index) => (
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
          </Tbody>
        </Table>
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

export default BusinessPartnersModal;
