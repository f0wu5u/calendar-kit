import { dateStringToDate } from "./dateStringToDate";

export const isSameMonth = (dateString: string, month: Date) => {
  const date = dateStringToDate(dateString);

  return (
    date.getUTCMonth() === month.getUTCMonth() &&
    date.getUTCFullYear() === month.getUTCFullYear()
  );
};
