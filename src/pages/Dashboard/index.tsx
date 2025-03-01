import { useState } from "react";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { formatCurrency, generateUrlWithParams } from "../../lib/helpers";
import { PnlType } from "../../types/dashboard";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import DateInput from "../../components/Input/DateInput";

function Dashboard() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const defaultDate = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState<string>(defaultDate);
  const [endDate, setEndDate] = useState<string>(defaultDate);

  const { data: PnlReports, isLoading } = useRQFetchData<{
    code: number;
    message: string;
    data: PnlType[];
  }>(
    [`pnl-reports-${startDate}-${endDate}`, startDate, endDate],
    generateUrlWithParams("/pnl-reports", {
      dateStart: startDate && endDate ? startDate : undefined,
      dateEnd: startDate && endDate ? endDate : undefined,
    })
  );

  return (
    <Box as="div" display="flex" flexDir="column" gap="4">
      <h1 className="text-4xl font-bold">{t("menus.dashboard")}</h1>
      <Box
        as="div"
        display="flex"
        flexDir="row"
        maxW="sm"
        flexWrap="wrap"
        gap="8"
        p="4"
        rounded="lg"
        bg={colorMode === "light" ? "white" : "gray.600"}
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
      {isLoading ? (
        <Box
          as="div"
          display="flex"
          flexDir="row"
          flexWrap="wrap"
          gap="8"
          alignItems="start"
          justifyContent="start"
        >
          <CardSkeleton skeletonNumber={4} />
        </Box>
      ) : (
        <Box
          as="div"
          display="flex"
          flexDir="row"
          flexWrap="wrap"
          gap="8"
          alignItems="start"
          justifyContent="start"
        >
          {PnlReports?.data.map((item, index) => {
            return (
              <Box
                key={index}
                as="div"
                flex="1"
                display="flex"
                flexDir="column"
                maxW="md"
                mx="auto"
                rounded="lg"
                shadow="md"
                overflow="hidden"
                bg={colorMode === "light" ? "white" : "gray.700"}
                color={colorMode === "light" ? "black" : "white"}
              >
                <Box as="div" bg="blue.600" px={6} py={4}>
                  <Text
                    as="h2"
                    color="white"
                    fontSize="xl"
                    fontWeight="semibold"
                  >
                    {t(`labels.${item.name.toLowerCase()}`)}
                  </Text>
                </Box>

                <Box as="div" p={6} my="4">
                  <Box
                    as="div"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text
                      as="span"
                      color={colorMode === "light" ? "gray.600" : "gray.500"}
                    >
                      {t("labels.count")}
                    </Text>
                    <Text
                      as="span"
                      color={colorMode === "light" ? "gray.900" : "gray.200"}
                      fontWeight="bold"
                      fontSize="large"
                    >
                      {item.count || "—"}
                    </Text>
                  </Box>

                  <Box
                    as="div"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text
                      as="span"
                      color={colorMode === "light" ? "gray.600" : "gray.500"}
                    >
                      {t("labels.sum")}{" "}
                      {t(`labels.${item.name.toLowerCase()}`).toLowerCase()}
                    </Text>
                    <Text
                      as="span"
                      color={colorMode === "light" ? "gray.900" : "gray.200"}
                      fontWeight="bold"
                      fontSize="large"
                    >
                      {formatCurrency(item.sumFC, "UZS")}
                    </Text>
                  </Box>
                  <Box
                    as="div"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text
                      as="span"
                      color={colorMode === "light" ? "gray.600" : "gray.500"}
                    >
                      {t("labels.dollar")}{" "}
                      {t(`labels.${item.name.toLowerCase()}`).toLowerCase()}
                    </Text>
                    <Text
                      as="span"
                      color={colorMode === "light" ? "gray.900" : "gray.200"}
                      fontWeight="bold"
                      fontSize="large"
                    >
                      {formatCurrency(item.sumSC, "USD")}
                    </Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
