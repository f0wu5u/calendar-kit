import { isValidDate } from "./isValidDate";
import { toUTCDateString } from "./toUTCDateString";

type Interval = { start: Date; end: Date };
export const eachMonthOfInterval = ({ start, end }: Interval) => {
  if (!isValidDate(start) || !isValidDate(end)) {
    throw new Error("Invalid start or end date");
  }

  if (start > end) {
    throw new Error("Invalid date range");
  }

  const months = [];
  const currenDate = new Date(start);
  currenDate.setUTCDate(1);
  currenDate.setUTCHours(0, 0, 0, 0);
  while (currenDate <= end) {
    months.push(toUTCDateString(currenDate));
    const utcMonth = currenDate.getUTCMonth();
    currenDate.setUTCMonth(utcMonth + 1);
  }
  return months;
};
