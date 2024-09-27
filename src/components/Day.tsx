import React, { useMemo } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { DayState, InnerDayProps } from "../types";
import { dateStringToDate } from "../utils/date";
import { equals } from "../utils/equals";

import { DefaultDayComponent } from "./DefaultDayComponent";

export interface DayProps {
  dateString: string;
  DayComponent?: React.ComponentType<InnerDayProps<Record<string, unknown>>>;
  onPress?: (dateString: string) => void;
  viewState: DayState;
  locale?: string;
  dayContainerStyle?: ViewStyle;
}

const DayComponent: React.FC<DayProps> = ({
  dateString,
  DayComponent = DefaultDayComponent,
  onPress,
  viewState,
  locale,
  dayContainerStyle,
}) => {
  const day = useMemo(() => dateStringToDate(dateString), [dateString]);

  return viewState.isVisible ? (
    <Pressable
      disabled={viewState.state === "inactive"}
      onPress={() => onPress?.(dateString)}
      style={[styles.dayContainer, dayContainerStyle]}
    >
      <DayComponent {...viewState} day={day} locale={locale} />
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  dayContainer: { width: "14.28%" },
  dayText: { textAlign: "center" },
});

export const Day = React.memo(DayComponent, (prevProps, nextProps) => {
  return (
    equals(prevProps.DayComponent, nextProps.DayComponent) &&
    equals(prevProps.viewState, nextProps.viewState) &&
    equals(prevProps.locale, nextProps.locale) &&
    equals(prevProps.dateString, nextProps.dateString)
  );
});
