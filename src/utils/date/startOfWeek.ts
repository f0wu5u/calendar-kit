import { DayIndex } from "../../types";

export const startOfWeek = (
  date: Date,
  { weekStartsOn = 0 }: { weekStartsOn: DayIndex },
) => {
  const currentDate = new Date(date);
  const diff = (currentDate.getUTCDay() + 7 - weekStartsOn) % 7;
  currentDate.setUTCDate(currentDate.getUTCDate() - diff);
  currentDate.setUTCHours(0, 0, 0, 0);
  return currentDate;
};
