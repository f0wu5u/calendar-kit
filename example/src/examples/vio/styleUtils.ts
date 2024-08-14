import { defaultDayStyles } from "../../constants";

import { containerStyles, textStyles } from "./styles";
import { DayProps } from "./types";

export const getDayStyle = ({
  isWeekEnd,
  isStartDay,
  isEndDay,
  isSelected,
  isToday,
  state,
}: DayProps) => {
  if (state !== "inactive") {
    if (isStartDay || isEndDay) {
      return {
        textStyle: textStyles.startEnd,
        containerStyle: isStartDay
          ? { ...containerStyles.start, ...containerStyles.startBorders }
          : { ...containerStyles.end, ...containerStyles.endBorders },
      };
    }
    if (isSelected) {
      return {
        textStyle: textStyles.selected,
        containerStyle: containerStyles.selected,
      };
    }
  }
  if (isToday) {
    return {
      textStyle: textStyles.selected,
      containerStyle: isWeekEnd ? containerStyles.weekend : undefined,
    };
  }
  if (isWeekEnd) {
    return { ...defaultDayStyles, containerStyle: containerStyles.weekend };
  }
  return defaultDayStyles;
};

export const getContainerStyle = ({
  isSelected,
  isMultiSelect,
  isStartDay,
  isEndDay,
}: DayProps) => {
  if (isSelected && isMultiSelect) {
    const defaultStyle = { ...containerStyles.selected };
    if (isStartDay) {
      return { ...defaultStyle, ...containerStyles.startBorders };
    } else if (isEndDay) {
      return { ...defaultStyle, ...containerStyles.endBorders };
    }
    return defaultStyle;
  }
  return {};
};
