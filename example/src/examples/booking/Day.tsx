import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { InnerDayProps } from "@arbta/calendar-kit";

import { containerStyles, textStyles } from "./styles";
import { getDayStyle } from "./styleUtils";
import { DayProps } from "./types";

export const Day: React.FC<InnerDayProps<DayProps>> = (props) => {
  const { day, state, locale } = props;

  const { textStyle, containerStyle } = useMemo(
    () => getDayStyle(props),
    [props],
  );

  return (
    <View style={[containerStyles.defaultContainer, containerStyle]}>
      <Text style={[textStyles.defaultDayText, textStyles[state], textStyle]}>
        {day.toLocaleDateString(locale, { day: "numeric" })}
      </Text>
    </View>
  );
};
