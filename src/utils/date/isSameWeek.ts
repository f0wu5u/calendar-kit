import { DayIndex } from "../../types";

import { endOfWeek } from "./endOfWeek";
import { startOfWeek } from "./startOfWeek";

export const isSameWeek = (
  date: Date,
  dateToCompare: Date,
  { weekStartsOn = 0 }: { weekStartsOn?: DayIndex },
) => {
  const startOfDateWeek = startOfWeek(date, { weekStartsOn });
  const endOfDateWeek = endOfWeek(date, { weekStartsOn });
  return dateToCompare >= startOfDateWeek && dateToCompare <= endOfDateWeek;
};
