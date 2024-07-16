import { isValidDate } from "./isValidDate";
import { toLocaleDateString } from "./toLocaleDateString";

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
  currenDate.setDate(1);
  currenDate.setHours(0, 0, 0, 0);
  const currentEndDate = new Date(end);
  currentEndDate.setDate(1);
  currentEndDate.setHours(0, 0, 0, 0);
  while (currenDate <= currentEndDate) {
    months.push(toLocaleDateString(currenDate));
    const month = currenDate.getMonth();
    currenDate.setMonth(month + 1);
  }
  return months;
};
