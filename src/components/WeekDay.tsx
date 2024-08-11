import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DayIndex } from "../types";
import { getLocaleWeekDayNames } from "../utils/date/getLocaleWeekDayNames";

const CONTAINER_HEIGHT = 38;
const DAY_WIDTH = 44;
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
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    gap: 2,
    zIndex: 2,
  },
  day: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: DAY_WIDTH,
  },
  dayText: {
    textAlign: "center",
    color: "#5a5a5a",
    fontSize: 18,
  },
});
