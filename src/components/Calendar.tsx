import React, { useMemo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import {
  createWeeksOfMonth,
  dateStringToDate,
  formatMonthName,
} from "../utils/date";

import { WeekDay, WeekDayProps } from "./WeekDay";
import { Weeks, WeeksProps } from "./Weeks";

export interface CalendarProps
  extends Omit<WeeksProps, "weeks" | "date" | "month">,
    WeekDayProps {
  date: string;
  showDayNames?: boolean;
  showMonthName?: boolean;
  MonthNameComponent?: React.ComponentType<{ month: Date; locale?: string }>;
  contentContainerStyle?: ViewStyle;
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
        <Weeks
          {...weekProps}
          month={monthDate}
          weeks={weeksOfMonth}
          date={date}
        />
      </View>
    );
  },
);

Calendar.displayName = "Calendar";

const styles = StyleSheet.create({
  calenderContainer: {
    width: "100%",
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
