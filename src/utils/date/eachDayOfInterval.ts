import { isValidDate } from "./isValidDate";

type Interval = { start: Date; end: Date };
export const eachDayOfInterval = ({ start, end }: Interval) => {
  if (!isValidDate(start) || !isValidDate(end)) {
    throw new Error("Invalid start or end date");
  }

  if (start > end) {
    throw new Error("Invalid date range");
  }

  const days = [];
  const currenDate = new Date(start);
  currenDate.setUTCHours(0, 0, 0, 0);
  while (currenDate <= end) {
    days.push(new Date(currenDate));
    const utcDay = currenDate.getUTCDate();
    currenDate.setUTCDate(utcDay + 1);
  }
  return days;
};
