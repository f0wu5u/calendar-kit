import React from "react";
import { StyleSheet, Text } from "react-native";

import { formatMonthName } from "../../../../src/utils/date";

export const MonthName = ({ month }: { month: Date }) => (
  <Text style={styles.monthNameText}>{formatMonthName(month)}</Text>
);

const styles = StyleSheet.create({
  monthNameText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    marginLeft: 12,
  },
});
