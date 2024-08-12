import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { DayState, InnerDayProps } from "@code-fi/react-native-calendar-ui";

import { containerStyles, textStyles } from "./styles";
import { getContainerStyle, getDayStyle } from "./styleUtils";

interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isEndOfWeek: boolean;
  isStartOfWeek: boolean;
  isMultiSelect: boolean;
}
export const Day: React.FC<InnerDayProps<DayProps>> = (props) => {
  const {
    day,
    state,
    isStartDay,
    isEndDay,
    isSelected,
    isMultiSelect,
    isToday,
    locale,
  } = props;

  const dayStyle = useMemo(() => {
    if (state !== "inactive") {
      return getDayStyle({ isStartDay, isEndDay, isToday, isSelected });
    }
    return {};
  }, [state, isStartDay, isEndDay, isSelected, isToday]);

  const containerStyle = useMemo(
    () => getContainerStyle({ isSelected, isEndDay, isStartDay }),
    [isSelected, isStartDay, isEndDay],
  );

  return (
    <View
      style={[
        containerStyle.wrapper,
        {
          backgroundColor: isMultiSelect
            ? containerStyle.wrapper?.backgroundColor
            : undefined,
        },
      ]}
    >
      <View style={[containerStyles.defaultContainer, dayStyle.containerStyle]}>
        <Text
          style={[
            textStyles.defaultDayText,
            textStyles[state],
            dayStyle.textStyle,
          ]}
        >
          {day.toLocaleDateString(locale, { day: "numeric" })}
        </Text>
      </View>
      {isMultiSelect ? <View style={containerStyle.overflow} /> : null}
    </View>
  );
};
