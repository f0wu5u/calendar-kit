import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DayState, InnerDayProps } from "@code-fi/react-native-calendar-ui";

import { DayPrice } from "./DayPrice";

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
    isEndOfWeek,
    isStartOfWeek,
    isMultiSelect,
  } = props;

  const dayStyle = useMemo(() => {
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
    return {};
  }, [state, isStartDay, isEndDay, isSelected]);

  const containerStyle = useMemo(() => {
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
  }, [isSelected, isStartDay, isEndDay, isStartOfWeek, isEndOfWeek]);

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
          {day.getDate()}
        </Text>
        {state === "active" && <DayPrice focused={isEndDay || isStartDay} />}
      </View>
      {isMultiSelect ? <View style={containerStyle.overflow} /> : null}
    </View>
  );
};

const containerStyles = StyleSheet.create({
  defaultContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  selected: {
    backgroundColor: "#dae9fc",
    overflow: "hidden",
  },
  start: {
    borderTopLeftRadius: 44,
    borderBottomLeftRadius: 44,
    width: 44,
    height: 44,
    alignSelf: "center",
    overflow: "visible",
  },
  end: {
    borderTopRightRadius: 44,
    borderBottomRightRadius: 44,
    width: 44,
    height: 44,
    alignSelf: "center",
    overflow: "visible",
  },
  startOfWeek: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  endOfWeek: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  startEnd: {
    position: "absolute",
    backgroundColor: "#0072f0",
    borderRadius: 44,
    width: 44,
    height: 44,
    alignContent: "center",
    justifyContent: "center",
  },
  overflow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#dae9fc",
    width: 22,
    zIndex: -1,
  },
  overflowStart: {
    right: -11,
  },
  overflowEnd: {
    left: -8.5,
  },
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
  },
  selected: {
    color: "#1a1a1a",
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
