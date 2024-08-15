import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { InnerDayProps } from "react-native-one-calendar";

import { containerStyles, textStyles } from "./styles";
import { getContainerStyle, getDayStyle } from "./styleUtils";
import { DayProps } from "./types";

export const Day: React.FC<InnerDayProps<DayProps>> = (props) => {
  const { day, state, isMultiSelect, locale } = props;

  const dayStyle = useMemo(() => getDayStyle(props), [props]);
  const containerStyle = useMemo(() => getContainerStyle(props), [props]);

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
