import { useState } from "react";
import BusinessPartnersGroup from "./components/BusinessPartnersGroup";
import TextInput from "../../components/Input/TextInput";
import { useDebounce } from "use-debounce";
import Pagination from "../../components/Pagination/Pagination";
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
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../lib/helpers";
import {
  BusinessPartnerByCardNameType,
  BusinessPartnersType,
} from "../../types/business-partners";
import { useTranslation } from "react-i18next";
import TableNoData from "../../components/Table/TableNoData";
import BusinessPartnersModal from "../../components/Modals/BusinessPartners/BusinessPartnersModal";

function ClientsList() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cardName, setCardName] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pagination, setPagination] = useState<number>(0);

  const [debouncedCardName] = useDebounce(cardName, 500);
  const [debouncedPhone] = useDebounce(phone, 500);

  const [partner, setPartner] = useState<BusinessPartnerByCardNameType>();

  const { data: ClientsList, isLoading } = useRQFetchData<BusinessPartnersType>(
    [
      `business-partners-${groupName}-${debouncedCardName}-${debouncedPhone}-${pagination}`,
    ],
    generateUrlWithParams("/business-partners", {
      GroupName: groupName,
      CardName: cardName,
      Phone1: phone,
      Skip: pagination,
    })
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
            <TextInput
              label="CardName"
              value={cardName}
              setValue={setCardName}
            />
            <TextInput label="phone" value={phone} setValue={setPhone} />
            <BusinessPartnersGroup setValue={setGroupName} />
          </Box>
          <Pagination
            dataLength={ClientsList?.data.length || 0}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Box>
        {!isLoading && (
          <Table variant="striped" colorScheme="gray" textAlign="center">
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th>{t("labels.card_code")}</Th>
                <Th>{t("labels.card_name")}</Th>
                <Th>{t("labels.group_code")}</Th>
                <Th>{t("labels.group_name")}</Th>
                <Th>{t("labels.phone")}</Th>
                <Th>{t("labels.current_account_balanc")}</Th>
                <Th>{t("labels.currency")}</Th>
                <Th>{t("labels.card_type")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ClientsList?.data.length
                ? ClientsList.data.map((el, idx) => (
                    <Tr
                      key={idx}
                      cursor={"pointer"}
                      _hover={{
                        bg: colorMode === "light" ? "gray.300" : "gray.500",
                      }}
                      onClick={() => {
                        setPartner(el);
                        onOpen();
                      }}
                    >
                      <Td>{el.cardCode}</Td>
                      <Td>{el.cardName}</Td>
                      <Td>{el.groupCode}</Td>
                      <Td>{el.groupName}</Td>
                      <Td>{el.phone1}</Td>
                      <Td>{el.currentAccountBalance}</Td>
                      <Td>{el.defaultCurrency}</Td>
                      <Td>{el.cardType}</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        )}
        {!ClientsList?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
      </Box>
      <BusinessPartnersModal isOpen={isOpen} onClose={onClose} partner={partner} />
    </Box>
  );
}

export default ClientsList;
