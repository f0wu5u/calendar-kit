import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const WeekDayName = ({ weekDays }: { weekDays: string[] }) => {
  return (
    <View style={styles.daysContainer}>
      {weekDays.map((day, index) => (
        <View key={day + index} style={styles.day}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 32,
    borderBottomColor: "#ececec",
    borderBottomWidth: 0.5,
  },
  day: {
    height: "100%",
    width: "14.2857%", // 100/7
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    textAlign: "center",
    color: "#5a5a5a",
    fontSize: 14,
  },
});
