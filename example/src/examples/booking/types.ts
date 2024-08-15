import { DayState } from "react-native-calendar-kit";

export interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isMultiSelect: boolean;
}
