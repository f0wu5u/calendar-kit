import { isValidDate } from "./isValidDate";

export const endOfMonth = (date: Date) => {
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return new Date(Date.UTC(year, month, 0, 23, 59, 59));
};
