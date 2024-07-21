import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DayIndex } from "../types";

const CONTAINER_HEIGHT = 38;
const DAY_WIDTH = 44;
const WEEKDAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export interface WeekDayProps {
  firstDayOfWeek?: DayIndex;
  weekdaysShort?: string[];
}

export const WeekDay: React.FC<WeekDayProps> = memo(
  ({ firstDayOfWeek = 0, weekdaysShort = WEEKDAYS_SHORT }) => {
    const weekdays = useMemo(() => {
      const weekEnd = weekdaysShort.slice(0, firstDayOfWeek);
      const weekStart = weekdaysShort.slice(firstDayOfWeek);
      return [...weekStart, ...weekEnd];
    }, [firstDayOfWeek, weekdaysShort]);

    return (
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
    paddingHorizontal: 8,
    elevation: 6,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 2,
    zIndex: 2,
    shadowOpacity: 0.05,
  },
  day: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: DAY_WIDTH,
  },
  dayText: {
    textTransform: "capitalize",
    textAlign: "center",
    color: "#5a5a5a",
    fontWeight: "500",
    fontSize: 18,
  },
});
