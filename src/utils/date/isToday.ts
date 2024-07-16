import { dateStringToDate } from "./dateStringToDate";

export const isToday = (dateString: string) => {
  const date = dateStringToDate(dateString);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};
