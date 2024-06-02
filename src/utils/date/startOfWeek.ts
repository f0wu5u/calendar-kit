import { DayIndex } from "../../types";

import { toUTCDate } from "./toUTCDate";

export const startOfWeek = (
  date: Date,
  { weekStartsOn = 0 }: { weekStartsOn: DayIndex },
) => {
  const UTCDate = toUTCDate(date);
  const diff = (UTCDate.getUTCDay() + 7 - weekStartsOn) % 7;
  UTCDate.setUTCDate(UTCDate.getUTCDate() - diff);
  UTCDate.setUTCHours(0, 0, 0, 0);
  return UTCDate;
};
