import { useQuery, UseQueryResult } from "react-query";
import { getCookie, removeCookies } from "../lib/actions";
import { useToast } from "./useToast";
import { useTranslation } from "react-i18next";

async function fetchData<T>(url: string): Promise<T> {
  const access_token = getCookie("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (response.status === 401) {
    removeCookies();
    window.location.assign("/");
  }

  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return await response.json();
}

export function useRQFetchData<T>(
  queryKey: string | Array<string | number>,
  url: string,
  refetch?: boolean
): UseQueryResult<T, Error> {
  const showToast = useToast();
  const { t } = useTranslation();

  return useQuery<T, Error>({
    queryKey,
    queryFn: () =>
      fetchData<T>(url).catch(() => {
        showToast({
          title: t("toast_messages.error"),
          description: t("toast_messages.error_fetching_products"),
          status: "error",
          position: "top",
        });
        throw new Error("Error fetching data");
      }),
    refetchInterval: refetch ? 5000 : undefined,
    refetchIntervalInBackground: !refetch,
  });
}
