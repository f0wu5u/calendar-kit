import React from "react";
import { ViewStyle } from "react-native";

import { DayIndex } from "../types";

import { CalendarProps } from "./Calendar";
import { WeekProps } from "./Week";

export interface CalendarListProps
  extends Omit<CalendarProps, "date" | "contentContainerStyle"> {
  currentDate?: string;
  pastMonthsCount?: number;
  futureMonthsCount?: number;
  horizontal?: boolean;
}

export type CalendarListViewProps = {
  calendarSize?: {
    width?: number;
    height?: number;
  };
  showScrollIndicator?: boolean;
  decelerationRate?: "normal" | "fast" | number;
  onListEndReached?: () => void;
  onEndReachedThreshold?: number;
  /**
   * passes array of visible month dateStrings when viewAs=month
   * and passes month date object week dateString array when viewAs=week
   * @param visibleDates
   */
  onScroll?: (
    visibleDates: { month: Date; week: string[] }[] | string[],
  ) => void;
  calendarListContentContainerStyle?: ViewStyle;
};

export interface FullCalendarListViewProps {
  estimatedCalendarSize: {
    fiveWeekCalendarSize: number;
    monthTitleSize?: number;
    weekDayNamesSize?: number;
  };
  calendarVerticalGap?: number;
  CalendarSeparator?: React.ComponentType;
  showDayNamesOnTop?: boolean;
  calendarContentContainerStyle?: CalendarProps["contentContainerStyle"];
}

export interface FullCalendarViewProps
  extends Omit<WeekProps, "weekDays" | "isWeeklyCalendarList"> {
  firstDayOfWeek?: DayIndex;
  weeksContainerStyle?: ViewStyle;
  showMonthName?: boolean;
  MonthNameComponent?: React.ComponentType<{ month: Date; locale?: string }>;
  WeekAnimatedTransitionComponent?: React.ComponentType<React.PropsWithChildren>;
  MonthAnimatedTransitionComponent?: React.ComponentType<React.PropsWithChildren>;
  date: string;
}
