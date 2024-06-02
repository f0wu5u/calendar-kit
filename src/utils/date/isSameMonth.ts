import { dateStringToUTCDate } from "./dateStringToUTCDate";

export const isSameMonth = (dateString: string, month: Date) => {
  const date = dateStringToUTCDate(dateString);

  return (
    date.getUTCMonth() === month.getUTCMonth() &&
    date.getUTCFullYear() === month.getUTCFullYear()
  );
};
