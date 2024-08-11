import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayState, InnerDayProps } from "@code-fi/react-native-calendar-ui";

interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
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
      }
      if (isSelected) {
        return {
          containerStyle: containerStyles.selected,
        };
      }
    }
    if (isToday) {
      return { textStyle: textStyles.today };
    }
    return {};
  }, [state, isToday, isStartDay, isEndDay, isSelected, isMultiSelect]);

  return (
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
  );
};

const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    flex: 1,
  },
  selected: {
    backgroundColor: "#f5f5f5",
  },
  start: {
    backgroundColor: "#0072f0",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 0,
  },
  end: {
    backgroundColor: "#0072f0",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 0,
  },
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontWeight: "500",
    alignSelf: "center",
  },
  today: {
    color: "#0072f0",
  },
  active: {
    color: "#5a5a5a",
  },
  startEnd: {
    color: "#ffffff",
  },
  inactive: {
    color: "#cacaca",
  },
});
