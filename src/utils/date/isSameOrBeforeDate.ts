import { dateStringToUTCDate } from "./dateStringToUTCDate";

export const isSameOrBeforeDate = (
  dateString: string,
  dateToCompare: string,
) => {
  const date = dateStringToUTCDate(dateString);
  const secondDate = dateStringToUTCDate(dateToCompare);
  return date <= secondDate;
};
