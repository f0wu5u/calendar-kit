import { dateStringToDate } from "./dateStringToDate";
import { getDaysInMonth } from "./daysInMonth";

export const addMonths = (dateString: string, months: number) => {
  const date = dateStringToDate(dateString);

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
