import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { createWeeksOfMonth } from "../utils/date";

import { FullCalendarViewProps } from "./types";
import { Week } from "./Week";

export const FullCalendarView: React.FC<FullCalendarViewProps> = ({
  firstDayOfWeek,
  month,
  date,
  weeksContainerStyle,
  locale,
  ...weekProps
}) => {
  const weeksOfMonth = useMemo(
    () => createWeeksOfMonth(month, firstDayOfWeek),
    [month, firstDayOfWeek],
  );
  return (
    <View style={[styles.weeksContainer, weeksContainerStyle]}>
      {weeksOfMonth.map((week, index) => (
        <Week
          {...weekProps}
          locale={locale}
          key={`${date}-week-${index}`}
          weekDays={week}
          month={month}
          isLastWeekOfList
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  weeksContainer: {
    gap: 8,
  },
});
