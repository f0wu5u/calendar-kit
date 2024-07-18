import { isValidDate } from "./isValidDate";

export const startOfMonth = (date: Date) => {
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1, 0, 0, 0);
};
