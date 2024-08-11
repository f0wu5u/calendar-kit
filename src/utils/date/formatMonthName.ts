export const formatMonthName = (date: Date, locale = "en-US") =>
  date.toLocaleDateString(locale, { month: "long", year: "numeric" });
