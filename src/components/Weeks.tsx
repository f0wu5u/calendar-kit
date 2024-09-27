import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { Week } from "./Week";
import {
  WeeklyScrollContainer,
  WeeklyScrollContainerProps,
} from "./WeeklyScrollContainer";

export interface WeeksProps
  extends Omit<WeeklyScrollContainerProps, "activeDate"> {
  scrollByWeek?: boolean;
  date: string;
  weeksContainerStyle?: ViewStyle;
}
export const Weeks: React.FC<WeeksProps> = ({
  weeklyScrollBehavior,
  date,
  weeks,
  scrollByWeek = false,
  weeksContainerStyle,
  ...weekProps
}) => {
  return (
    <View style={[styles.weeksContainer, weeksContainerStyle]}>
      {scrollByWeek ? (
        <WeeklyScrollContainer
          {...weekProps}
          weeks={weeks}
          activeDate={weekProps.markedDates?.[0]}
          weeklyScrollBehavior={weeklyScrollBehavior}
        />
      ) : (
        weeks.map((week, index) => (
          <Week {...weekProps} key={`${date}-week-${index}`} weekDays={week} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weeksContainer: {
    gap: 8,
  },
});
