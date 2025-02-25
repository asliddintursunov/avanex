/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDialog } from "./useDialog";
import api from "../api/axiosInstance";

interface ApiRequestProps<T> {
  url: string;
  data: T;
  method: "POST" | "PATCH";
  success_message?: string;
  error_message?: string;
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
    async <TResponse, TRequest>({
      url,
      data,
      method,
      success_message,
      error_message,
    }: ApiRequestProps<TRequest>): Promise<TResponse> => {
      try {
        const response = await api({
          method,
          url,
          data,
        });

        if (success_message) {
          showDialog(t("toast_messages.success"), success_message, "success");
        }

        return response.data;
      } catch (error: any) {
        console.error(`Error in ${method} request to ${url}:`, error);

        showDialog(
          t("toast_messages.error"),
          !error_message
            ? error.message
            : t("toast_messages.error_sending_request"),
          "error"
        );

        throw error;
      }
    },
    []
  );

  return { getData, sendData };
}
