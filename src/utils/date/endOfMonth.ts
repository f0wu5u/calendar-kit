import { isValidDate } from "./isValidDate";

export const endOfMonth = (date: Date) => {
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return new Date(year, month, 0, 23, 59, 59);
};
