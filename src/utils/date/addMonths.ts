import { dateStringToDate } from "./dateStringToDate";
import { getDaysInMonth } from "./daysInMonth";

export const addMonths = (dateString: string, months: number) => {
  const date = dateStringToDate(dateString);

  const day = date.getDate();
  date.setMonth(date.getMonth() + Math.abs(months));
  const daysInNewMonth = getDaysInMonth(
    date.getFullYear(),
    date.getMonth() + 1,
  );
  const newDay = Math.min(day, daysInNewMonth);
  date.setDate(newDay);
  return date;
};
