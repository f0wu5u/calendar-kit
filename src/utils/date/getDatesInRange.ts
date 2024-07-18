import { dateStringToDate } from "./dateStringToDate";
import { eachDayOfInterval } from "./eachDayOfInterval";
import { toLocaleDateString } from "./toLocaleDateString";

export const getDatesInRange = (
  startDateString: string,
  endDateString: string,
) => {
  return eachDayOfInterval({
    start: dateStringToDate(startDateString),
    end: dateStringToDate(endDateString),
  }).map(toLocaleDateString);
};
