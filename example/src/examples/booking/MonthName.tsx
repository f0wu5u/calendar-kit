import React from "react";
import { StyleSheet, Text } from "react-native";

import { formatMonthName } from "../../utils";

export const MonthName = ({
  month,
  locale,
}: {
  month: Date;
  locale?: string;
}) => (
  <Text style={styles.monthNameText}>{formatMonthName(month, locale)}</Text>
);

const styles = StyleSheet.create({
  monthNameText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    marginLeft: 12,
  },
});
