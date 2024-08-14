import { defaultDayStyles } from "../../constants";

import { containerStyles, textStyles } from "./styles";
import { DayProps } from "./types";

export const getContainerStyle = ({
  isSelected,
  isStartDay,
  isEndDay,
}: DayProps) => {
  if (!isSelected) {
    return {};
  }
  if (isStartDay) {
    return {
      wrapper: { ...containerStyles.selected, ...containerStyles.start },
      overflow: {
        ...containerStyles.overflow,
        ...containerStyles.overflowStart,
      },
    };
  } else if (isEndDay) {
    return {
      wrapper: { ...containerStyles.selected, ...containerStyles.end },
      overflow: {
        ...containerStyles.overflow,
        ...containerStyles.overflowEnd,
      },
    };
  }
  return { wrapper: containerStyles.selected };
};

export const getDayStyle = ({
  isStartDay,
  isEndDay,
  isToday,
  isSelected,
  state,
}: DayProps) => {
  if (state !== "inactive") {
    if (isStartDay || isEndDay) {
      return {
        textStyle: textStyles.startEnd,
        containerStyle: containerStyles.startEnd,
      };
    } else if (isSelected) {
      return {
        textStyle: textStyles.selected,
        containerStyle: containerStyles.selected,
      };
    } else if (isToday) {
      return {
        ...defaultDayStyles,
        containerStyle: {
          ...containerStyles.startEnd,
          ...containerStyles.today,
        },
      };
    }
    return defaultDayStyles;
  }
  return defaultDayStyles;
};
