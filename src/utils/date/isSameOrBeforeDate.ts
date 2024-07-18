import { dateStringToDate } from "./dateStringToDate";

export const isSameOrBeforeDate = (
  dateString: string,
  dateToCompare: string,
) => {
  const date = dateStringToDate(dateString);
  const secondDate = dateStringToDate(dateToCompare);
  return date <= secondDate;
};
