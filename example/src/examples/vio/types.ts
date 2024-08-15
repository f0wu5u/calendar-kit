import { DayState } from "react-native-calendar-ui";

export interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isWeekEnd: boolean;
  isMultiSelect: boolean;
}
