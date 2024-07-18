import { dateStringToDate } from "./dateStringToDate";

export const isSameMonth = (dateString: string, month: Date) => {
  const date = dateStringToDate(dateString);

  return (
    date.getMonth() === month.getMonth() &&
    date.getFullYear() === month.getFullYear()
  );
};
