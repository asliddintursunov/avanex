import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import ParentModal from "../ParentModal";
import DateInput from "../../Input/DateInput";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import TableSkeleton from "../../Skeleton/TableSkeleton";
import TableNoData from "../../Table/TableNoData";
import { useRQFetchData } from "../../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../../lib/helpers";
import { SverkaType } from "../../../types/debtors";
import Pagination from "../../Pagination/Pagination";
import { BusinessPartnerByCardNameType } from "../../../types/business-partners";
import DisabledInput from "../../Input/DisabledInput";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  partner?: BusinessPartnerByCardNameType;
};

function SverkaModal({ isOpen, onClose, partner }: Props) {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);
  const [skip, setSkip] = useState<number>(0);

  const { data: SverkaData, isLoading } = useRQFetchData<{
    code: number;
    message: string;
    data: SverkaType[];
  }>(
    [
      `sales-reports/debitors/sverka-${partner?.cardCode}-${startDate}-${endDate}-${skip}`,
      partner?.cardCode || "",
      startDate,
      endDate,
      skip,
    ],
    generateUrlWithParams("/sales-reports/debitors/sverka", {
      cardCode: partner?.cardCode,
      dateStart: startDate,
      dateEnd: endDate,
      skip: skip,
    })
  );

  const SverkaHeader = (): JSX.Element => {
    return (
      <Box
        as="div"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20"
      >
        <DisabledInput label="Mijoz" value={partner?.cardName || ""} />
        <Box
          as="div"
          display="flex"
          alignItems="end"
          justifyContent="end"
          gap="4"
        >
          <DateInput
            label={t("labels.start_date")}
            value={startDate}
            setValue={setStartDate}
          />
          <DateInput
            label={t("labels.end_date")}
            value={endDate}
            setValue={setEndDate}
          />
        </Box>
        <DisabledInput
          label={t("labels.current_debit")}
          value={SverkaData?.data[0]?.debit.toString() || "0"}
        />
        <DisabledInput
          label={t("labels.balance_first_day_of_period")}
          value={SverkaData?.data[0]?.balanceFirstDayOfPeriod.toString() || "0"}
        />
      </Box>
    );
  };

  const SverkaTable = (): JSX.Element => {
    return (
      <>
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
            justifyContent="end"
            alignItems={"end"}
            gap={"6"}
            mb="4"
          >
            <Pagination
              dataLength={SverkaData?.data.length || 0}
              skip={skip}
              setSkip={setSkip}
            />
          </Box>
          {!isLoading && (
            <Table variant="striped" colorScheme="gray" textAlign="center">
              <Thead bg={colorMode === "light" ? "gray.300" : "gray.800"}>
                <Tr>
                  <Th>{t("labels.doc_date")}</Th>
                  {/* <Th>{t("Base ref")}</Th>
                  <Th>{t("Line memo")}</Th> */}
                  <Th>{t("labels.debit")}</Th>
                  <Th>{t("labels.credit")}</Th>
                  <Th>{t("labels.balance")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {SverkaData?.data.length
                  ? SverkaData.data.map((el, idx) => (
                      <Tr
                        key={idx}
                        cursor={"pointer"}
                        _hover={{
                          bg: colorMode === "light" ? "gray.300" : "gray.500",
                        }}
                      >
                        <Td>{el.dueDate.split("T")[0]}</Td>
                        {/* <Td>{el.baseRef}</Td>
                        <Td>{el.lineMemo}</Td> */}
                        <Td>{el.debit}</Td>
                        <Td>{el.credit}</Td>
                        <Td>{el.balance}</Td>
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          )}
        </Box>
        {!SverkaData?.data.length && !isLoading && <TableNoData />}
        {isLoading && <TableSkeleton rowSize={5} />}
      </>
    );
  };

  const ModalBody = (): JSX.Element => {
    return (
      <Box as="div" display="flex" flexDir="column" gap="8">
        <SverkaHeader />
        <SverkaTable />
      </Box>
    );
  };

  return (
    <ParentModal
      body={<ModalBody />}
      headerContent=""
      //   headerContent={t("labels.order", { number: partnerCode })}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
    />
  );
}

export default SverkaModal;
