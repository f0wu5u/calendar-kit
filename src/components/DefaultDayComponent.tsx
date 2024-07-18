import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { InnerDayProps } from "../types";

interface DefaultDayComponentProps {
  isSelected?: boolean;
}

export const DefaultDayComponent: React.FC<
  InnerDayProps<DefaultDayComponentProps>
> = ({ day, state, isToday, isSelected }) => {
  const dayStyle = useMemo(() => {
    if (state !== "inactive") {
      if (isSelected) {
        return {
          textStyle: textStyles.selected,
          containerStyle: containerStyles.selected,
        };
      }
    }
    if (isToday) {
      return {
        textStyle: textStyles.today,
      };
    }
    return {};
  }, [state, isSelected, isToday]);

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
          {day.getDate()}
        </Text>
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
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontSize: 16,
  },
  selected: {
    color: "#fff",
    fontWeight: "normal",
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
});
