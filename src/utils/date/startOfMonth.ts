import { isValidDate } from "./isValidDate";

export const startOfMonth = (date: Date) => {
  if (!isValidDate(date)) {
    throw new Error("Invalid date");
  }
  const UTCYear = date.getUTCFullYear();
  const UTCMonth = date.getUTCMonth();
  return new Date(Date.UTC(UTCYear, UTCMonth, 1, 0, 0, 0));
};
