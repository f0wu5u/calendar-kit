import { dateStringToUTCDate } from "./dateStringToUTCDate";

export const isToday = (dateString: string) => {
  const date = dateStringToUTCDate(dateString);
  const today = new Date();

  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
};
