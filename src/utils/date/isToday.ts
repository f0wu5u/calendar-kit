import { dateStringToUTCDate } from "./dateStringToUTCDate";

export const isToday = (dateString: string) => {
  const date = dateStringToUTCDate(dateString);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};
