import { dateStringToUTCDate } from "./dateStringToUTCDate";
import { getDaysInMonth } from "./daysInMonth";
import { isValidDate } from "./isValidDate";

export const addMonths = (dateString: string, months: number) => {
  const date = dateStringToUTCDate(dateString);
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const day = date.getUTCDate();
  date.setUTCMonth(date.getMonth() + Math.abs(months));
  const daysInNewMonth = getDaysInMonth(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
  );
  const newDay = Math.min(day, daysInNewMonth);
  date.setUTCDate(newDay);
  return date;
};
