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
  const currentDate = new Date(start);
  currentDate.setUTCHours(0, 0, 0, 0);
  const currentEndDate = new Date(end);
  currentEndDate.setUTCHours(0, 0, 0, 0);
  while (currentDate <= currentEndDate) {
    days.push(new Date(currentDate));
    const utcDay = currentDate.getUTCDate();
    currentDate.setUTCDate(utcDay + 1);
  }
  return days;
};
