import { isValidDate } from "./isValidDate";

export const startOfMonth = (date: Date) => {
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1, 0, 0, 0);
};

export const startOfMonthForDateString = (dateString: string) => {
  return dateString.replace(/.{2}$/, "01");
};
