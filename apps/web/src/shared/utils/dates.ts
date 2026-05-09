export const formatPrettyDate = (
  isoDate: string,
  locale: string | null,
): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(locale || "en", {
    day: "2-digit",
    month: "long",
  });
};
