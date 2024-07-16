import React, { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { DayState, InnerDayProps } from "../types";
import { dateStringToDate } from "../utils/date";
import { equals } from "../utils/equals";

import { DefaultDayComponent } from "./DefaultDayComponent";

export interface DayProps {
  dateString: string;
  DayComponent?: React.ComponentType<InnerDayProps<Record<string, unknown>>>;
  onPress?: (dateString: string) => void;
  viewState: DayState;
}

const DayComponent: React.FC<DayProps> = ({
  dateString,
  DayComponent = DefaultDayComponent,
  onPress,
  viewState,
}) => {
  const day = useMemo(() => dateStringToDate(dateString), [dateString]);

  return viewState.isVisible ? (
    <Pressable
      disabled={viewState.state === "inactive"}
      onPress={() => onPress?.(dateString)}
      style={styles.dayContainer}
    >
      <DayComponent {...viewState} day={day} />
    </Pressable>
  ) : (
    <View style={styles.dayContainer} />
  );
};

const styles = StyleSheet.create({
  dayContainer: { flex: 1, marginHorizontal: -0.5, width: "100%" },
  dayText: { textAlign: "center" },
});

export const Day = React.memo(DayComponent, (prevProps, nextProps) => {
  return (
    equals(prevProps.DayComponent, nextProps.DayComponent) &&
    equals(prevProps.viewState, nextProps.viewState) &&
    equals(prevProps.dateString, nextProps.dateString)
  );
});
