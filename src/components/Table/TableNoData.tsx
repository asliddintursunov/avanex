import { Table, Td, Text, Tr } from "@chakra-ui/react";
import { TableNoData as TableNoDataFound } from "../../lottie/illustrations/index";
import { useTranslation } from "react-i18next";

function TableNoData() {
  const { t } = useTranslation();
  return (
    <Table>
      <Tr>
        <Td colSpan={7} textAlign="center" py={4}>
          <TableNoDataFound />
          <Text fontSize="2xl" color="gray.500" my="4">
            {t("labels.no_data")}
          </Text>
        </Td>
      </Tr>
    </Table>
  );
}

export default TableNoData;
