export type ItemsInStockType = {
  itemCode: string;
  itemName: string;
  groupCode: number;
  groupName: string;
  inStockTotal: number;
  orderedTotal: string;
  documentLines: {
    warehouseCode: string;
    warehouseName: string;
    inStock: number;
    ordered: number;
  }[];
}
