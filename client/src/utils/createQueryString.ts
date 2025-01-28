export const objectToQueryString = <T extends Record<string, unknown>>(
  inputObject: T
): string => {
  const params = new URLSearchParams();

  Object.entries(inputObject).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  });

  return params.toString();
};
