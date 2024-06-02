import { isValidDate } from "./isValidDate";
import { toUTCDate } from "./toUTCDate";

export const dateStringToUTCDate = (date: string) => {
  const newDate = new Date(`${date}T00:00:00`);
  if (!isValidDate(newDate)) {
    throw new Error("Invalid date");
  }
  return toUTCDate(newDate);
};
