import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  createWeeksOfMonth,
  dateStringToUTCDate,
  formatMonthName,
} from "../utils/date";

import { Week, WeekProps } from "./Week";
import { WeekDay, WeekDayProps } from "./WeekDay";

export interface CalendarProps
  extends Omit<WeekProps, "month" | "weekDays">,
    WeekDayProps {
  date: string;
  showDayNames?: boolean;
  MonthNameComponent?: React.ComponentType<{ month: Date }>;
  WeekDayNameComponent?: React.ComponentType<WeekDayProps>;
}

export const Calendar: React.FC<CalendarProps> = React.memo(
  ({
    date,
    firstDayOfWeek = 0,
    weekdaysShort,
    MonthNameComponent,
    showDayNames = true,
    WeekDayNameComponent,
    ...weekProps
  }) => {
    const WeekDayComponent = WeekDayNameComponent ?? WeekDay;

    const monthDate = useMemo(() => dateStringToUTCDate(date), [date]);
    const weeksOfMonth = useMemo(
      () => createWeeksOfMonth(monthDate, firstDayOfWeek),
      [monthDate, firstDayOfWeek],
    );

    const weeks = useMemo(
      () =>
        weeksOfMonth.map((week, index) => (
          <Week
            {...weekProps}
            key={`week-${index}`}
            weekDays={week}
            month={monthDate}
          />
        )),
      [monthDate, weeksOfMonth, weekProps],
    );

    return (
      <>
        {MonthNameComponent ? (
          <MonthNameComponent month={monthDate} />
        ) : (
          <View style={styles.monthNameContainer}>
            <Text style={styles.monthNameText}>
              {formatMonthName(monthDate)}
            </Text>
          </View>
        )}
        {showDayNames ? (
          <WeekDayComponent
            firstDayOfWeek={firstDayOfWeek}
            weekdaysShort={weekdaysShort}
          />
        ) : null}
        <View style={styles.weeksContainer}>{weeks}</View>
      </>
    );
  },
);

Calendar.displayName = "Calendar";

const styles = StyleSheet.create({
  weeksContainer: {
    gap: 8,
  },
  monthNameContainer: {
    paddingBottom: 8,
  },
  monthNameText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
