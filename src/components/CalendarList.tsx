import React, { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { createRange, dateStringToUTCDate, startOfMonth } from "../utils/date";
import { toDateString } from "../utils/date/toDateString";

import { Calendar, CalendarProps } from "./Calendar";
import { WeekDay } from "./WeekDay";

interface CalendarListProps extends Omit<CalendarProps, "date"> {
  estimatedCalendarSize: number;
  calendarVerticalGap?: number;
  CalendarSeparator?: React.ComponentType;
  currentDate?: string;
  pastMonthsCount?: number;
  futureMonthsCount?: number;
  horizontal?: boolean;
  showDayNamesOnTop?: boolean;
}

export const CalendarList: React.FC<CalendarListProps> = React.memo(
  ({
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
    showDayNames,
    WeekDayNameComponent,
    weekdaysShort,
    firstDayOfWeek,
    ...calendarProps
  }) => {
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

    const months = useMemo(() => {
      return createRange({
        startMonth: minDate,
        pastMonthsCount,
        futureMonthsCount,
      });
    }, [minDate, pastMonthsCount, futureMonthsCount]);

    // console.table(months)
    // useEffect(()=>{
    //     if (currentDate){
    //         const initialDateMonth = toUTCDateString(startOfMonth(currentDate))
    //         listRef.current?.scrollToItem({animated: false, item: initialDateMonth })
    //     }
    // },[currentDate])

    const keyExtractor = useCallback((item: string) => item, []);
    const initialDateIndex = useMemo(() => {
      if (!initialDateRef.current) {
        return 0;
      }
      const initialDateMonth = startOfMonth(
        dateStringToUTCDate(initialDateRef.current),
      );
      const indexOfInitialMonth = months.indexOf(
        toDateString(initialDateMonth),
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
          estimatedItemSize={estimatedCalendarSize}
          extraData={markedDates}
          pagingEnabled={horizontal}
          initialScrollIndex={initialDateIndex}
        />
      </>
    );
  },
);

CalendarList.displayName = "CalendarList";
