import React from "react";
import {StyleSheet, Text, View} from "react-native";

import { formatMonthName } from "../../utils";

export const MonthName = ({
  month,
  locale,
}: {
  month: Date;
  locale?: string;
}) => (
  <View style={styles.container}>
    <Text style={styles.monthNameText}>{formatMonthName(month, locale)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container:{
    height: 30,
    paddingHorizontal: 8,
  },
  monthNameText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
