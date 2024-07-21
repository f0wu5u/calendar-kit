import { toLocaleDateString } from "@code-fi/react-native-calendar-ui";
import { addDays, isBefore, isSameDay } from "date-fns";

const today = new Date();

export const todayDateString = toLocaleDateString(today);
export const dateRangeStart = toLocaleDateString(addDays(today, 30));
export const dateRangeEnd = toLocaleDateString(addDays(today, 60));

export const isSameOrBeforeDate = (date: string, dateToCompare: string) => {
  return isSameDay(date, dateToCompare) || isBefore(date, dateToCompare);
};
