import { Dispatch, SetStateAction } from "react";
import { useRQFetchData } from "../../../hooks/useRQfetch";
import { generateUrlWithParams } from "../../../lib/helpers";
import { BusinessPartnersGroupType } from "../../../types/business-partners";
import { Box, Select, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
};

function BusinessPartnersGroup({ setValue }: Props) {
  const { t } = useTranslation();

  const { data: BPdata, isLoading } = useRQFetchData<BusinessPartnersGroupType>(
    [`business-partner-groups`],
    generateUrlWithParams("/business-partner-groups", {})
  );

  if (isLoading) {
    return <Skeleton width="full" height="40px" rounded="md" />;
  }
  return (
    <Box as="div" w="full">
      <Box as="span">{t("labels.business_partners_group")}</Box>
      <Select
        placeholder={t("labels.business_partners_group")}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
        {BPdata?.data.map((el, idx) => (
          <option key={idx} value={el.name}>
            {el.name}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default BusinessPartnersGroup;
