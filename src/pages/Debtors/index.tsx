import { useState } from "react";
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
  BusinessPartnersType,
  BusinessPartnerByCardNameType,
} from "../../types/business-partners";
import { useTranslation } from "react-i18next";
import TableNoData from "../../components/Table/TableNoData";
import SverkaModal from "../../components/Modals/Sverka/SverkaModal";

function Debtors() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cardName, setCardName] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);

  const [debouncedCardName] = useDebounce(cardName, 500);
  const [partner, setPartner] = useState<BusinessPartnerByCardNameType>();

  const { data: ClientsList, isLoading } = useRQFetchData<BusinessPartnersType>(
    [`business-partners-${debouncedCardName}-${skip}`],
    generateUrlWithParams("/business-partners", {
      isDebtor: true.toString(),
      cardName: cardName,
      skip: skip,
    })
  );
  return (
    <Box as="div" p={2}>
      <h1 className="text-4xl font-bold mb-4">{t("menus.debtors")}</h1>
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
            width="20%"
            alignItems="end"
            justifyContent="start"
            gap="4"
          >
            <TextInput
              label={t("labels.card_name")}
              value={cardName}
              setValue={setCardName}
            />
          </Box>
          <Pagination
            dataLength={ClientsList?.data.length || 0}
            skip={skip}
            setSkip={setSkip}
          />
        </Box>
        {!isLoading && (
          <Table variant="striped" colorScheme="gray" textAlign="center">
            <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
              <Tr>
                <Th>{t("labels.group_name")}</Th>
                <Th>{t("labels.card_name")}</Th>
                <Th>{t("labels.current_account_balance")}</Th>
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
                      <Td>{el.groupName}</Td>
                      <Td>{el.cardName}</Td>
                      <Td>
                        {el.currentAccountBalance} {el.defaultCurrency}
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        )}
        {!ClientsList?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton />}
      </Box>
      {isOpen && (
        <SverkaModal isOpen={isOpen} onClose={onClose} partner={partner} />
      )}
    </Box>
  );
}

export default Debtors;
