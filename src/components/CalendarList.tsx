import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { I18nManager, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import {
  createRange,
  dateStringToDate,
  startOfMonth,
  toLocaleDateString,
} from "../utils/date";
import { height, width } from "../utils/screen";

import { Calendar, CalendarProps } from "./Calendar";
import { WeekDay } from "./WeekDay";

interface CalendarListProps
  extends Omit<CalendarProps, "date" | "contentContainerStyle"> {
  estimatedCalendarSize: number;
  calendarVerticalGap?: number;
  CalendarSeparator?: React.ComponentType;
  currentDate?: string;
  pastMonthsCount?: number;
  futureMonthsCount?: number;
  horizontal?: boolean;
  showDayNamesOnTop?: boolean;
  calendarContentContainerStyle?: CalendarProps["contentContainerStyle"];
  calendarSize?: {
    width?: number;
    height?: number;
  };
  showScrollIndicator?: boolean;
}

export interface CalendarListRef {
  scrollToDate: (dateString: string, animated: boolean) => void;
}
export const CalendarList = React.memo(
  forwardRef(
    (
      {
        estimatedCalendarSize,
        CalendarSeparator,
        calendarVerticalGap = 32,
        minDate,
        currentDate,
        markedDates,
        pastMonthsCount = 0,
        futureMonthsCount = 12,
        horizontal,
        showDayNamesOnTop = false,
        showDayNames = true,
        WeekDayNameComponent,
        weekdaysShort,
        firstDayOfWeek,
        calendarContentContainerStyle,
        calendarSize,
        showScrollIndicator,
        ...calendarProps
      }: CalendarListProps,
      ref: ForwardedRef<CalendarListRef>,
    ) => {
      const listRef = useRef<any>();
      const initialDateRef = useRef(currentDate);
      const renderSeparator = useCallback(
        () =>
          CalendarSeparator ? (
            <CalendarSeparator />
          ) : (
            <View style={{ height: calendarVerticalGap }} />
          ),
        [CalendarSeparator, calendarVerticalGap],
      );
      const calendarWidth = calendarSize?.width ?? width;
      const calendarHeight = calendarSize?.height ?? height;
      const months = useMemo(() => {
        return createRange({
          startMonth: minDate,
          pastMonthsCount,
          futureMonthsCount,
        });
      }, [minDate, pastMonthsCount, futureMonthsCount]);

      useImperativeHandle(ref, () => ({
        scrollToDate(dateString: string, animated: boolean) {
          const date = dateStringToDate(dateString);
          const monthOfDate = startOfMonth(date);
          const indexOfScrollToMonth = months.indexOf(
            toLocaleDateString(monthOfDate),
          );
          if (indexOfScrollToMonth >= 0) {
            const offsetValue = horizontal
              ? calendarWidth
              : estimatedCalendarSize;
            listRef.current?.scrollToOffset({
              animated,
              offset: indexOfScrollToMonth * offsetValue,
            });
          }
        },
      }));

      useEffect(() => {
        if (horizontal && I18nManager.isRTL) {
          throw new Error(
            "Calendar will not work in horizontal and RTL mode because of FlashList issue https://github.com/Shopify/flash-list/issues/544",
          );
        }
      }, [horizontal]);

      const keyExtractor = useCallback((item: string) => item, []);
      const initialDateIndex = useMemo(() => {
        if (!initialDateRef.current) {
          return 0;
        }
        const initialDateMonth = startOfMonth(
          dateStringToDate(initialDateRef.current),
        );
        const indexOfInitialMonth = months.indexOf(
          toLocaleDateString(initialDateMonth),
        );

        if (indexOfInitialMonth < 0) {
          return 0;
        }
        return indexOfInitialMonth;
      }, [months]);

      const renderCalendar = ({ item }: { item: string }) => (
        <Calendar
          {...calendarProps}
          showDayNames={showDayNames && !showDayNamesOnTop}
          firstDayOfWeek={firstDayOfWeek}
          weekdaysShort={weekdaysShort}
          minDate={minDate}
          markedDates={markedDates}
          date={item}
          contentContainerStyle={calendarContentContainerStyle}
        />
      );

      const WeekDayComponent = WeekDayNameComponent ?? WeekDay;

      return (
        <>
          {showDayNamesOnTop && showDayNames && (
            <WeekDayComponent
              firstDayOfWeek={firstDayOfWeek}
              weekdaysShort={weekdaysShort}
            />
          )}
          <FlashList
            ref={listRef}
            horizontal={horizontal}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderCalendar}
            keyExtractor={keyExtractor}
            data={months}
            estimatedItemSize={
              horizontal ? calendarWidth : estimatedCalendarSize
            }
            estimatedListSize={{ width: calendarWidth, height: calendarHeight }}
            extraData={calendarProps}
            pagingEnabled={horizontal}
            initialScrollIndex={initialDateIndex}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={showScrollIndicator}
          />
        </>
      );
    },
  ),
);

CalendarList.displayName = "CalendarList";
