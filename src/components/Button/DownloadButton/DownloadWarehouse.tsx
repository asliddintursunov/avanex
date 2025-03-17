import { Box, Button } from "@chakra-ui/react";
import { downloadAsExcel } from "../../../lib/helpers";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { ItemsInStockType } from "../../../types/warehouse";

type Props = {
  ItemsInStock: ItemsInStockType[];
};

export default function DownloadAsExcelButton({ ItemsInStock }: Props) {
  const { t } = useTranslation();
  const Data = useRef<any[]>([]);
  const warehouseNames = useRef<string[]>([]);

  useEffect(() => {
    const whsNames = Array.from(
      new Set(
        ItemsInStock.flatMap((item) =>
          item.documentLines.map((d) => d.warehouseName)
        )
      )
    );
    warehouseNames.current = whsNames;
  }, [ItemsInStock]);

  const Headers = [
    { header: t("labels.group"), key: "groupName", width: 50 },
    { header: t("labels.item_name"), key: "itemName", width: 50 },
    {
      header: t("labels.total_quantity"),
      key: "totalQuantity",
      width: 25,
    },
    ...warehouseNames.current.flatMap((wh) => [
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

  useEffect(() => {
    const result =
      ItemsInStock?.map((item) => ({
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
    Data.current = result;
  }, [ItemsInStock, t]);

  return (
    <Box as="div" mt="2" display="flex" justifyContent="end">
      <Button
        colorScheme="green"
        onClick={() =>
          downloadAsExcel(t("menus.warehouse"), Data.current, Headers)
        }
      >
        {t("buttons.download_as_excel")}
      </Button>
    </Box>
  );
}
