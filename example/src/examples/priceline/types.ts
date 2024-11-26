import { DayState } from "@fowusu/calendar-kit";

export interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isEndOfWeek: boolean;
  isStartOfWeek: boolean;
  isMultiSelect: boolean;
}
