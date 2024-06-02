import { toDateString } from "./toDateString";
import { toUTCDate } from "./toUTCDate";

export const toUTCDateString = (date: Date) => {
  return toDateString(toUTCDate(date));
};
