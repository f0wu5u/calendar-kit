import { DayIndex } from "../../types";

import { dateStringToDate } from "./dateStringToDate";
import { endOfMonth } from "./endOfMonth";

export const getWeeksInMonth = (month: string, startOfWeek: DayIndex = 0) => {
  const firstDayOfMonth = dateStringToDate(month);
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  // Calculate the offset to align the first day with the desired start of the week
  const startDayOffset = (firstDayOfMonth.getDay() - startOfWeek + 7) % 7;
  // Calculate the total number of days in the month
  const totalDaysInMonth = lastDayOfMonth.getDate();
  // Calculate the number of days in the first week
  const firstWeekDays = 7 - startDayOffset;
  // Calculate the remaining days after the first week
  const remainingDays = totalDaysInMonth - firstWeekDays;
  // Calculate the number of full weeks in the remaining days
  const fullWeeks = Math.ceil(remainingDays / 7);
  // Return the total number of weeks
  return fullWeeks + 1; // Add 1 for the first partial week
};
