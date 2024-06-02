import { dateStringToUTCDate } from "./dateStringToUTCDate";

export const isSameOrAfterDate = (
  dateString: string,
  dateToCompare: string,
) => {
  const date = dateStringToUTCDate(dateString);
  const secondDate = dateStringToUTCDate(dateToCompare);
  return date >= secondDate;
};
