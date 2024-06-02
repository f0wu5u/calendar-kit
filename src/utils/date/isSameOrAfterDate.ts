import { dateStringToUTCDate } from "./dateStringToUTCDate";
import { isValidDate } from "./isValidDate";

export const isSameOrAfterDate = (
  dateString: string,
  dateToCompare: string,
) => {
  const date = dateStringToUTCDate(dateString);
  const secondDate = dateStringToUTCDate(dateToCompare);
  if (!isValidDate(date) || !isValidDate(secondDate)) {
    throw new Error("Invalid date");
  }
  return date >= secondDate;
};
