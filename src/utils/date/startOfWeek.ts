import { DayIndex } from "../../types";

export const startOfWeek = (
  date: Date,
  { weekStartsOn = 0 }: { weekStartsOn: DayIndex },
) => {
  const currentDate = new Date(date);
  const diff = (currentDate.getDay() + 7 - weekStartsOn) % 7;
  currentDate.setDate(currentDate.getDate() - diff);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
};
