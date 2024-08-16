import { DayState } from "@arbta/calendar-kit";

export interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isWeekEnd: boolean;
  isMultiSelect: boolean;
}
