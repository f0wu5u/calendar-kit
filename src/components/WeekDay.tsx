import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DayIndex } from "../types";
import { getLocaleWeekDayNames } from "../utils/date/getLocaleWeekDayNames";

const CONTAINER_HEIGHT = 40;
export interface WeekDayProps {
  firstDayOfWeek?: DayIndex;
  weekdaysShort?: string[];
  weekdaysFormat?: "long" | "short" | "narrow";
  locale?: string;
  WeekDayNameComponent?: React.ComponentType<{ weekDays: string[] }>;
}

export const WeekDay: React.FC<WeekDayProps> = memo(
  ({
    firstDayOfWeek = 0,
    weekdaysShort,
    WeekDayNameComponent,
    locale = "en-US",
    weekdaysFormat = "short",
  }) => {
    const baseWeekDays = useMemo(() => {
      if (weekdaysShort) {
        return weekdaysShort;
      }
      return getLocaleWeekDayNames(locale, weekdaysFormat);
    }, [weekdaysShort, locale, weekdaysFormat]);

    const weekdays = useMemo(() => {
      const weekEnd = baseWeekDays.slice(0, firstDayOfWeek);
      const weekStart = baseWeekDays.slice(firstDayOfWeek);
      return [...weekStart, ...weekEnd];
    }, [firstDayOfWeek, baseWeekDays]);

    return WeekDayNameComponent ? (
      <WeekDayNameComponent weekDays={weekdays} />
    ) : (
      <View style={styles.daysContainer}>
        {weekdays.map((day, index) => (
          <View key={day + index} style={styles.day}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>
    );
  },
);

WeekDay.displayName = "WeekDayName";

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: CONTAINER_HEIGHT,
    gap: 2,
    zIndex: 2,
  },
  day: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  dayText: {
    textAlign: "center",
    color: "#c3c3c3",
    fontWeight: "500",
    fontSize: 16,
  },
});
