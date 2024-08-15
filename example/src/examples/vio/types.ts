import { DayState } from "react-native-one-calendar";

export interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isWeekEnd: boolean;
  isMultiSelect: boolean;
}
