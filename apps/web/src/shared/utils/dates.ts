export const formatPrettyDate = (
  isoDate: string,
  locale: string | null,
): string => {
  const date = new Date(isoDate);

  return date.toLocaleDateString(locale || "en", {
    day: "2-digit",
    month: "long",
  });
};
