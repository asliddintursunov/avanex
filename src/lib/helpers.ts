import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const generateUrlWithParams = (
  endpoint: string,
  params: Record<string, string | number | null | undefined>
): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      urlParams.append(key, value.toString());
    }
  });

  return `${baseUrl + endpoint}?${urlParams.toString()}`;
};

export const formatCurrency = (value: number, currencyType: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyType,
    minimumFractionDigits: 2,
  }).format(value);
};

export const downloadAsExcel = async (
  fileName: string,
  data: any[],
  headers: Record<string, string | number>[]
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = headers;

  data.forEach((row) => worksheet.addRow(row));

  worksheet.getRow(1).font = { bold: true, color: { argb: "FF0000FF" } };
  worksheet.getRow(1).alignment = { horizontal: "center", vertical: "middle" };
  worksheet.getRow(1).font = { bold: true };

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const file = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `${fileName}.xlsx`);
};
