import { Dispatch, SetStateAction } from "react";
import { useRQFetchData } from "../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../lib/helpers";
import { SalesPersonsType } from "../../types/sales-persons";
import { Box, Select, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
};

function SalesPerons({ setValue }: Props) {
  const { t } = useTranslation();

  const { data: SPdata, isLoading } = useRQFetchData<SalesPersonsType>(
    [`sales-persons`],
    generateUrlWithParams("/sales-persons", {})
  );

  if (isLoading) {
    return <Skeleton width="full" height="40px" rounded="md" />;
  }
  return (
    <Box as="div" w="full">
      <Box as="span">{t("labels.sales_person")}</Box>
      <Select
        placeholder={t("labels.sales_person")}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        {SPdata?.data.map((el, idx) => (
          <option key={idx} value={el.salesEmployeeName}>
            {el.salesEmployeeName}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default SalesPerons;
