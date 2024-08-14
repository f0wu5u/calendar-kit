import { dateStringToDate } from "@code-fi/react-native-calendar-ui";

export const formatMonthName = (date: Date, locale: string = "en-US") =>
  date.toLocaleDateString(locale, { month: "long", year: "numeric" });

export const isWeekend = (dateString: string) => {
  const day = dateStringToDate(dateString).getDay();
  return day === 0 || day === 6;
};