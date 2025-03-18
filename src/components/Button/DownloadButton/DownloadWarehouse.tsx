import { Box, Button } from "@chakra-ui/react";
import { downloadAsExcel, generateUrlWithParams } from "../../../lib/helpers";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ItemsInStockType } from "../../../types/warehouse";
import api from "../../../api/axiosInstance";

type Props = {
  groupName?: string;
  itemName?: string;
};

export default function DownloadAsExcelButton({ groupName, itemName }: Props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getExcelHeaders = (data: ItemsInStockType[]) => {
    const whsNames = Array.from(
      new Set(
        data.flatMap((item) => item.documentLines.map((d) => d.warehouseName))
      )
    );

    const Headers = [
      { header: t("labels.group"), key: "groupName", width: 50 },
      { header: t("labels.item_name"), key: "itemName", width: 50 },
      {
        header: t("labels.total_quantity"),
        key: "totalQuantity",
        width: 25,
      },
      ...whsNames.flatMap((wh) => [
        {
          header: `${wh} ${t("labels.quantity")}`,
          key: `${wh} ${t("labels.quantity")}`,
          width: 25,
        },
        {
          header: `${wh} ${t("labels.bron")}`,
          key: `${wh} ${t("labels.bron")}`,
          width: 25,
        },
        {
          header: `${wh} ${t("labels.kg")}`,
          key: `${wh} ${t("labels.kg")}`,
          width: 25,
        },
      ]),
    ];

    return Headers;
  };

  const getExcelBodyData = (data: ItemsInStockType[]) => {
    const body =
      data.map((item) => ({
        groupName: item.groupName,
        itemName: item.itemName,
        totalQuantity: item.inStockTotal,
        ...item.documentLines.reduce((acc: Record<string, any>, curr) => {
          acc[`${curr.warehouseName} ${t("labels.quantity")}`] = curr.inStock;
          acc[`${curr.warehouseName} ${t("labels.bron")}`] = curr.ordered;
          acc[`${curr.warehouseName} ${t("labels.kg")}`] = item.uoMCode;
          return acc;
        }, {}),
      })) || [];
    return body;
  };

  const fetchData = async () => {
    setIsLoading(true);
    const url = generateUrlWithParams("/items/in-stock", {
      skip: 0,
      limit: 10000,
    });

    try {
      const response: {
        data: {
          data: ItemsInStockType[];
        };
      } = await api.get(url);
      console.log("response", response.data.data);

      const Headers = getExcelHeaders(response.data.data);
      const Body = getExcelBodyData(response.data.data);

      downloadAsExcel(t("menus.warehouse"), Body, Headers);
    } catch (error) {
      console.error(error);
      console.log(groupName, itemName);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="div" mt="2" display="flex" justifyContent="end">
      <Button
        colorScheme="green"
        isLoading={isLoading}
        loadingText={t("buttons.download_as_excel")}
        onClick={() => fetchData()}
      >
        {t("buttons.download_as_excel")}
      </Button>
    </Box>
  );
}
