import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayState, InnerDayProps } from "@code-fi/react-native-calendar-ui";

import CheckInArrow from "./CheckInArrow";
import CheckOutArrow from "./CheckOutArrow";
import { DayPrice } from "./DayPrice";

interface DayProps extends DayState {
  isSelected: boolean;
  isEndDay: boolean;
  isStartDay: boolean;
  isWeekEnd: boolean;
  isMultiSelect: boolean;
}
export const Day: React.FC<InnerDayProps<DayProps>> = (props) => {
  const {
    day,
    state,
    isStartDay,
    isEndDay,
    isSelected,
    isWeekEnd,
    isMultiSelect,
    isToday,
  } = props;

  const dayStyle = useMemo(() => {
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
    if (isWeekEnd) {
      return { containerStyle: containerStyles.weekend };
    }
    if (isToday) {
      return { textStyle: textStyles.selected };
    }
    return {};
  }, [state, isWeekEnd, isToday, isStartDay, isEndDay, isSelected]);

  const containerStyle = useMemo(() => {
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
  }, [isEndDay, isMultiSelect, isSelected, isStartDay]);

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
        },
        containerStyle,
      ]}
    >
      {isEndDay && (
        <View style={{ marginRight: -2 }}>
          <CheckOutArrow />
        </View>
      )}
      <View style={[containerStyles.defaultContainer, dayStyle.containerStyle]}>
        <Text
          style={[
            textStyles.defaultDayText,
            textStyles[state],
            dayStyle.textStyle,
          ]}
        >
          {day.getDate()}
        </Text>
        {state !== "inactive" && <DayPrice focused={isEndDay || isStartDay} />}
      </View>
      {isStartDay && (
        <View style={{ marginLeft: -2 }}>
          <CheckInArrow />
        </View>
      )}
    </View>
  );
};

const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    flexGrow: 0.85,
  },
  selected: {
    backgroundColor: "#E6E9FD",
  },
  startBorders: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  endBorders: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  start: {
    backgroundColor: "#3C69F5",
    paddingStart: 8,
  },
  end: {
    backgroundColor: "#3C69F5",
    paddingEnd: 8,
  },
  weekend: {
    backgroundColor: "#F8F6F5",
    borderRadius: 8,
  },
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontWeight: "500",
    alignSelf: "center",
  },
  selected: {
    color: "#3C69F5",
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
