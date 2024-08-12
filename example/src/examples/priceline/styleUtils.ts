import { containerStyles, textStyles } from "./styles";

interface ContainerState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
}

export const getContainerStyle = ({
  isSelected,
  isStartDay,
  isEndDay,
}: ContainerState) => {
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
}: ContainerState & { isToday: boolean }) => {
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
  if (isToday) {
    return {
      containerStyle: {
        ...containerStyles.startEnd,
        ...containerStyles.today,
      },
    };
  }
  return {};
};
