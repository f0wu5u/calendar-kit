import { isValidDate } from "./isValidDate";

export const dateStringToDate = (date: string) => {
  const newDate = new Date(`${date}T12:00:00`);
  if (!isValidDate(newDate)) {
    throw new Error("Invalid date");
  }
  return newDate;
};
