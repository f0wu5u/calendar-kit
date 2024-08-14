import { DayState } from "@code-fi/react-native-calendar-ui";

export interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isEndOfWeek: boolean;
  isStartOfWeek: boolean;
  isMultiSelect: boolean;
}
