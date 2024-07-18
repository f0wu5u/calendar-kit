import { DayIndex } from "../../types";

import { startOfWeek } from "./startOfWeek";

export const endOfWeek = (
  date: Date,
  { weekStartsOn = 0 }: { weekStartsOn: DayIndex },
) => {
  const start = startOfWeek(date, { weekStartsOn });
  start.setDate(start.getDate() + 6);
  start.setHours(23, 59, 59, 999);
  return start;
};
