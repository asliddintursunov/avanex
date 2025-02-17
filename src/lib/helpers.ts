export const generateUrlWithParams = (
  baseUrl: string,
  params: Record<string, string | number | null | undefined>
): string => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      urlParams.append(key, value.toString());
    }
  });

  return `${baseUrl}?${urlParams.toString()}`;
};
