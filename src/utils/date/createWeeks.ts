import { DayIndex } from "../../types";

import { endOfMonth } from "./endOfMonth";
import { endOfWeek } from "./endOfWeek";
import { startOfMonth } from "./startOfMonth";
import { startOfWeek } from "./startOfWeek";
import { toLocaleDateString } from "./toLocaleDateString";

const createIntervalRange = (date: Date) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
};

export const createWeeksOfMonth = (date: Date, weekStartsOn: DayIndex = 0) => {
  const { start, end } = createIntervalRange(date);
  return createWeeksInRange(start, end, weekStartsOn);
};

export const createWeeksInRange = (
  startDate: Date,
  endDate: Date,
  weekStartsOn: DayIndex = 0, // Default to Sunday (0)
): string[][] => {
  const weeks: string[][] = [];
  const currentDate = startOfWeek(startDate, { weekStartsOn });
  const lastDate = endOfWeek(endDate, { weekStartsOn });

  while (currentDate <= lastDate) {
    const week: string[] = [];
    for (let i = 0; i < 7; i++) {
      if (currentDate > lastDate) break; // Stop if exceeding end date
      week.push(toLocaleDateString(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
    weeks.push(week);
  }
  return weeks;
};
