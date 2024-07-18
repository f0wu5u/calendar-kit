import { addMonths } from "./addMonths";
import { eachMonthOfInterval } from "./eachMonthOfInterval";
import { subMonths } from "./subMonths";
import { toLocaleDateString } from "./toLocaleDateString";

type CreateRangeParam = {
  startMonth?: string;
  pastMonthsCount?: number;
  futureMonthsCount?: number;
};
export const createRange = ({
  startMonth,
  pastMonthsCount = 0,
  futureMonthsCount = 12,
}: CreateRangeParam) => {
  const initialDate = startMonth ?? toLocaleDateString(new Date());
  const maxPastSelectableDate = subMonths(initialDate, pastMonthsCount);
  const maxFutureSelectableDate = addMonths(initialDate, futureMonthsCount);
  return eachMonthOfInterval({
    start: maxPastSelectableDate,
    end: maxFutureSelectableDate,
  });
};
