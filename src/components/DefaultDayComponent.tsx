import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useRenderCount } from "../hooks/useRenderCount";
import { InnerDayProps } from "../types";

interface DefaultDayComponentProps {
  isSelected?: boolean;
  isEndDay?: boolean;
  isStartDay?: boolean;
}

export const DefaultDayComponent: React.FC<
  InnerDayProps<DefaultDayComponentProps>
> = ({ day, state, isStartDay, isEndDay, isSelected }) => {
  const renderCount = useRenderCount(day.toISOString());

  const dayStyle = useMemo(() => {
    if (state !== "inactive") {
      if (isStartDay || isEndDay) {
        return {
          textStyle: textStyles.selected,
          containerStyle: isStartDay
            ? containerStyles.start
            : containerStyles.end,
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

  return (
    <>
      <View style={[containerStyles.defaultContainer, dayStyle.containerStyle]}>
        <Text
          style={[
            textStyles.defaultDayText,
            textStyles[state],
            dayStyle.textStyle,
          ]}
        >
          {day.getUTCDate()}
        </Text>
        <Text style={textStyles.debugRenderText}>R={renderCount}x</Text>
      </View>
    </>
  );
};

const containerStyles = StyleSheet.create({
  defaultContainer: {
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  selected: {
    backgroundColor: "#b1b5ff",
  },
  start: {
    backgroundColor: "#2b2e7d",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  end: {
    backgroundColor: "#2b2e7d",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
  },
  selected: {
    color: "#fff",
  },
  active: {
    color: "#5a5a5a",
  },
  inactive: {
    color: "#cacaca",
  },
  today: {
    color: "#787de7",
    fontWeight: "bold",
  },
  debugRenderText: {
    textAlign: "center",
    fontSize: 10,
    color: "#868686",
  },
});
