import { defaultDayStyles } from "../../constants";

import { containerStyles, textStyles } from "./styles";
import { DayProps } from "./types";

export const getDayStyle = ({
  state,
  isEndDay,
  isStartDay,
  isSelected,
}: DayProps) => {
  if (state !== "inactive") {
    if (isStartDay || isEndDay) {
      return {
        textStyle: textStyles.startEnd,
        containerStyle: containerStyles.startEnd,
      };
    }
    if (isSelected) {
      return {
        textStyle: textStyles.selected,
        containerStyle: containerStyles.selected,
      };
    }
  }
  return defaultDayStyles;
};

export const getContainerStyle = ({
  isStartDay,
  isEndDay,
  isEndOfWeek,
  isStartOfWeek,
  isSelected,
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
        ...(isEndOfWeek ? containerStyles.endOfWeek : undefined),
      },
    };
  }
  if (isEndDay) {
    return {
      wrapper: { ...containerStyles.selected, ...containerStyles.end },
      overflow: {
        ...containerStyles.overflow,
        ...containerStyles.overflowEnd,
        ...(isStartOfWeek ? containerStyles.startOfWeek : undefined),
      },
    };
  }
  if (isStartOfWeek) {
    return {
      wrapper: {
        ...containerStyles.selected,
        ...containerStyles.startOfWeek,
      },
    };
  }
  if (isEndOfWeek) {
    return {
      wrapper: {
        ...containerStyles.selected,
        ...containerStyles.endOfWeek,
      },
    };
  }
  return { wrapper: containerStyles.selected };
};
