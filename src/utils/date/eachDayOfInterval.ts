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
  currentDate.setHours(0, 0, 0, 0);
  const currentEndDate = new Date(end);
  currentEndDate.setHours(23, 59, 59, 999);
  while (currentDate <= currentEndDate) {
    days.push(new Date(currentDate));
    const date = currentDate.getDate();
    currentDate.setDate(date + 1);
  }
  return days;
};
