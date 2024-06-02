import { DayIndex } from "../../types";

import { startOfWeek } from "./startOfWeek";

export const endOfWeek = (
  date: Date,
  { weekStartsOn = 0 }: { weekStartsOn: DayIndex },
) => {
  const start = startOfWeek(date, { weekStartsOn });
  start.setUTCDate(start.getUTCDate() + 6);
  start.setUTCHours(23, 59, 59, 999);
  return start;
};
