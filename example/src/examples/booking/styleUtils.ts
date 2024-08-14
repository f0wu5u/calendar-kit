import { defaultDayStyles } from "../../constants";

import { containerStyles, textStyles } from "./styles";
import { DayProps } from "./types";

export const getDayStyle = ({
  isStartDay,
  isEndDay,
  isSelected,
  isMultiSelect,
  isToday,
  state,
}: Omit<DayProps, "isVisible">) => {
  if (state !== "inactive") {
    if (isStartDay || isEndDay) {
      if (!isMultiSelect) {
        return {
          textStyle: textStyles.startEnd,
          containerStyle: {
            ...containerStyles.start,
            ...containerStyles.end,
          },
        };
      }
      return {
        textStyle: textStyles.startEnd,
        containerStyle: isStartDay
          ? containerStyles.start
          : containerStyles.end,
      };
    } else if (isSelected) {
      return {
        ...defaultDayStyles,
        containerStyle: containerStyles.selected,
      };
    }
  } else if (isToday) {
    return {
      ...defaultDayStyles,
      textStyle: textStyles.today,
    };
  }
  return defaultDayStyles;
};
