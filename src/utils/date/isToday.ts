import { dateStringToUTCDate } from "./dateStringToUTCDate";
import { isValidDate } from "./isValidDate";

export const isToday = (dateString: string) => {
  const date = dateStringToUTCDate(dateString);
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const today = new Date();

  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
};
