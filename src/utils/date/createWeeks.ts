import { DayIndex } from "../../types";
import { compose } from "../compose";

import { eachDayOfInterval } from "./eachDayOfInterval";
import { endOfMonth } from "./endOfMonth";
import { endOfWeek } from "./endOfWeek";
import { isSameWeek } from "./isSameWeek";
import { startOfMonth } from "./startOfMonth";
import { startOfWeek } from "./startOfWeek";
import { toLocaleDateString } from "./toLocaleDateString";

const createIntervalRange = (date: Date) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
};

const fillWeek = (week: Date[], weekStartsOn: DayIndex) => {
  if (week.length === 7) {
    return week.map(toLocaleDateString);
  }
  const firstDayInWeek = week[0];

  const start = startOfWeek(firstDayInWeek, { weekStartsOn });
  const end = endOfWeek(firstDayInWeek, { weekStartsOn });
  return eachDayOfInterval({ start, end }).map(toLocaleDateString);
};

export const createWeeksOfMonth = (date: Date, weekStartsOn: DayIndex = 0) => {
  const localeMonthDays = compose(eachDayOfInterval, createIntervalRange)(date);
  const monthWeeks: Date[][] = [];
  let currentWeek: Date[] = [];

  localeMonthDays.forEach((currentDay: Date) => {
    if (currentWeek.length > 0) {
      const lastDayInLastWeek = currentWeek[currentWeek.length - 1];
      if (!isSameWeek(lastDayInLastWeek, currentDay, { weekStartsOn })) {
        monthWeeks.push(currentWeek);
        currentWeek = [];
      }
    }
    currentWeek.push(currentDay);
  });

  if (currentWeek.length > 0) {
    monthWeeks.push(currentWeek);
  }

  return monthWeeks.map((week) => fillWeek(week, weekStartsOn));
};
