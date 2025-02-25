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
