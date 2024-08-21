import React, { useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import {
  createWeeksOfMonth,
  dateStringToDate,
  formatMonthName,
} from "../utils/date";

import { Week, WeekProps } from "./Week";
import { WeekDay, WeekDayProps } from "./WeekDay";

export interface CalendarProps
  extends Omit<WeekProps, "month" | "weekDays">,
    WeekDayProps {
  date: string;
  showDayNames?: boolean;
  showMonthName?: boolean;
  MonthNameComponent?: React.ComponentType<{ month: Date; locale?: string }>;
  contentContainerStyle?: ViewStyle;
  weeksContainerStyle?: ViewStyle;
}

export const Calendar: React.FC<CalendarProps> = React.memo(
  ({
    date,
    firstDayOfWeek = 0,
    weekdaysShort,
    MonthNameComponent,
    showDayNames = true,
    contentContainerStyle,
    weeksContainerStyle,
    WeekDayNameComponent,
    locale,
    showMonthName = true,
    weekdaysFormat,
    ...weekProps
  }) => {
    const monthDate = useMemo(() => dateStringToDate(date), [date]);
    const weeksOfMonth = useMemo(
      () => createWeeksOfMonth(monthDate, firstDayOfWeek),
      [monthDate, firstDayOfWeek],
    );
    const renderMonthName = () => {
      if (!showMonthName) return null;
      return MonthNameComponent ? (
        <MonthNameComponent month={monthDate} locale={locale} />
      ) : (
        <View style={styles.monthNameContainer}>
          <Text style={styles.monthNameText}>
            {formatMonthName(monthDate, locale)}
          </Text>
        </View>
      );
    };

    const weeks = useMemo(
      () =>
        weeksOfMonth.map((week, index) => (
          <Week
            {...weekProps}
            locale={locale}
            key={`${date}-week-${index}`}
            weekDays={week}
            month={monthDate}
          />
        )),
      [weeksOfMonth, weekProps, locale, monthDate, date],
    );

    return (
      <View style={[styles.calenderContainer, contentContainerStyle]}>
        {renderMonthName()}
        {showDayNames ? (
          <WeekDay
            firstDayOfWeek={firstDayOfWeek}
            weekdaysShort={weekdaysShort}
            WeekDayNameComponent={WeekDayNameComponent}
            locale={locale}
            weekdaysFormat={weekdaysFormat}
          />
        ) : null}
        <View style={[styles.weeksContainer, weeksContainerStyle]}>
          {weeks}
        </View>
      </View>
    );
  },
);

Calendar.displayName = "Calendar";

const styles = StyleSheet.create({
  calenderContainer: {
    width: "100%",
  },
  weeksContainer: {
    gap: 8,
  },
  monthNameContainer: {
    paddingBottom: 8,
    height: 30,
  },
  monthNameText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
