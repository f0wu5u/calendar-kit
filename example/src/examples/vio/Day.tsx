import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { InnerDayProps } from "react-native-calendar-ui";

import CheckInArrow from "./CheckInArrow";
import CheckOutArrow from "./CheckOutArrow";
import { containerStyles, textStyles } from "./styles";
import { getContainerStyle, getDayStyle } from "./styleUtils";
import { DayProps } from "./types";
export const Day: React.FC<InnerDayProps<DayProps>> = (props) => {
  const { day, state, isStartDay, isEndDay } = props;

  const dayStyle = useMemo(() => getDayStyle(props), [props]);

  const containerStyle = useMemo(() => getContainerStyle(props), [props]);

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
      </View>
      {isStartDay && (
        <View style={{ marginLeft: -2 }}>
          <CheckInArrow />
        </View>
      )}
    </View>
  );
};
