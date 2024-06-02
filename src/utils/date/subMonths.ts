import { dateStringToUTCDate } from "./dateStringToUTCDate";
import { getDaysInMonth } from "./daysInMonth";

export const subMonths = (dateString: string, months: number) => {
  const date = dateStringToUTCDate(dateString);
  const day = date.getUTCDate();
  date.setMonth(date.getUTCMonth() - Math.abs(months));
  const daysInNewMonth = getDaysInMonth(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
  );
  const newDay = Math.min(day, daysInNewMonth);
  date.setUTCDate(newDay);
  return date;
};
