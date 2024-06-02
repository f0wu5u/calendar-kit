import { dateStringToUTCDate } from "./dateStringToUTCDate";
import { isValidDate } from "./isValidDate";

export const isSameMonth = (dateString: string, month: Date) => {
  const date = dateStringToUTCDate(dateString);
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }

  return (
    date.getUTCMonth() === month.getUTCMonth() &&
    date.getUTCFullYear() === month.getUTCFullYear()
  );
};
