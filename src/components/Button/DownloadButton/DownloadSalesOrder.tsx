import { Box, Button } from "@chakra-ui/react";
import { downloadAsExcel, generateUrlWithParams } from "../../../lib/helpers";
import { useTranslation } from "react-i18next";
import { SalesOrdersType } from "../../../types/orders";
import api from "../../../api/axiosInstance";
import { useState } from "react";

type Props = {
  timeInterval: string;
};

export default function DownloadAsExcelButton({ timeInterval }: Props) {
  const { t } = useTranslation();
  const [startDate, endDate] = timeInterval.split("&&");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Headers = [
    {
      header: t("labels.doc_num"),
      key: "docNum",
      width: 30,
    },
    {
      header: t("labels.card_name"),
      key: "cardName",
      width: 30,
    },
    {
      header: t("labels.doc_date"),
      key: "docDate",
      width: 30,
    },
    {
      header: t("labels.doc_total"),
      key: "docTotalFc",
      width: 30,
    },
    {
      header: t("labels.u_type_order"),
      key: "uTypeOrder",
      width: 30,
    },
    {
      header: t("labels.u_firma"),
      key: "uFirma",
      width: 30,
    },
    {
      header: t("labels.num_at_card"),
      key: "numAtCard",
      width: 30,
    },
    {
      header: t("labels.u_jonatildi"),
      key: "uJonatildi",
      width: 30,
    },
    {
      header: t("labels.u_tip_dostavka"),
      key: "uTipdostavkaName",
      width: 30,
    },
    {
      header: t("labels.specification"),
      key: "uSpecification",
      width: 30,
    },
    {
      header: t("labels.u_ruxsat"),
      key: "uRuxsat",
      width: 30,
    },
    {
      header: t("labels.sales_person_name"),
      key: "salesPersonName",
      width: 30,
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    const url = generateUrlWithParams("/orders", {
      docDateStart: startDate,
      docDateEnd: endDate,
      skip: 0,
      limit: 1000,
    });
    try {
      const response: {
        data: {
          data: SalesOrdersType[];
        };
      } = await api.get(url);
      const data = response.data.data.map((order) => {
        return {
          docNum: `№${order.docNum}`,
          cardName: order.cardName,
          docDate: order.docDate.split("T")[0],
          docTotalFc: order.docTotalFc,
          uTypeOrder: order.uTypeOrder,
          uFirma: order.uFirma,
          numAtCard: order.numAtCard,
          uJonatildi: order.uJonatildi,
          uTipdostavkaName: order.uTipdostavkaName,
          uSpecification: order.uSpecification,
          uRuxsat: order.uRuxsat,
          salesPersonName: order.salesPersonName,
        };
      });
      downloadAsExcel(t("menus.sales_order"), data, Headers);
    } catch (error) {
      alert("Excel ga yuklashda xatolik yuz berdi");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="div" mt="2" display="flex" justifyContent="end">
      <Button
        colorScheme="green"
        onClick={() => fetchData()}
        isLoading={isLoading}
        loadingText={t("buttons.download_as_excel")}
      >
        {t("buttons.download_as_excel")}
      </Button>
    </Box>
  );
}
