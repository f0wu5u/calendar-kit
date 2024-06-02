import { DayState, StateInputParams } from "../types";

import {
  isSameMonth,
  isSameOrAfterDate,
  isSameOrBeforeDate,
  isToday,
} from "./date";

export const getDayState: (params: StateInputParams) => DayState = ({
  month,
  showExtraDays,
  dateString,
  minDate,
  maxDate,
  markedDates,
}) => {
  const isInMonth = isSameMonth(dateString, month);
  const isWithinMin = minDate ? isSameOrAfterDate(dateString, minDate) : true;
  const isWithinMax = maxDate ? isSameOrBeforeDate(dateString, maxDate) : true;
  const isActive = isInMonth && isWithinMax && isWithinMin;
  const isVisible = Boolean(isInMonth || showExtraDays);
  const today = isInMonth && isToday(dateString);
  const isSelected = markedDates.includes(dateString);
  return {
    state: today ? "today" : isActive ? "active" : "inactive",
    isVisible,
    isSelected,
  };
};
