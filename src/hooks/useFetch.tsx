/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDialog } from "./useDialog";
import api from "../api/axiosInstance";

interface ApiRequestProps<T> {
  url: string;
  data: T;
  method: "POST" | "PATCH";
}

export function useFetch() {
  const { showDialog } = useDialog();
  const { t } = useTranslation();

  const getData = useCallback(async (url: string): Promise<any> => {
    try {
      const response = await api.get(url);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      showDialog(
        t("toast_messages.error"),
        t("toast_messages.error_fetching_products"),
        "error"
      );
    }
  }, []);

  const sendData = useCallback(
    async <T,>({ url, data, method }: ApiRequestProps<T>): Promise<T> => {
      try {
        const response = await api({
          method,
          url,
          data,
        });

        // showDialog(
        //   t("toast_messages.success"),
        //   t("toast_messages.success_sending_request"),
        //   "success"
        // );
        return response.data;
      } catch (error) {
        console.error(`Error in ${method} request to ${url}:`, error);
        showDialog(
          t("toast_messages.error"),
          t("toast_messages.error_sending_request"), // error.data.message
          "error"
        );
        throw error;
      }
    },
    []
  );

  return { getData, sendData };
}
