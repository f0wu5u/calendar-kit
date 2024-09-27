import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { FlatList, I18nManager, View, ViewStyle } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { CalendarListRef } from "../types";
import { createRange, getWeeksInMonth } from "../utils/date";
import { height, width } from "../utils/screen";

import { Calendar, CalendarProps } from "./Calendar";
import { ListWeeklyScrollContainer } from "./ListWeeklyScrollContainer";
import { WeekDay } from "./WeekDay";

interface CalendarListProps
  extends Omit<CalendarProps, "date" | "contentContainerStyle"> {
  estimatedCalendarSize: {
    fiveWeekCalendarSize: number;
    monthTitleSize?: number;
    weekDayNamesSize?: number;
  };
  calendarVerticalGap?: number;
  CalendarSeparator?: React.ComponentType;
  currentDate?: string;
  pastMonthsCount?: number;
  futureMonthsCount?: number;
  horizontal?: boolean;
  showDayNamesOnTop?: boolean;
  calendarListContentContainerStyle?: ViewStyle;
  calendarContentContainerStyle?: CalendarProps["contentContainerStyle"];
  calendarSize?: {
    width?: number;
    height?: number;
  };
  showScrollIndicator?: boolean;
  onScroll?: (visibleMonths: string[]) => void;
  decelerationRate?: "normal" | "fast" | number;
}

export const CalendarList = React.memo(
  forwardRef(
    (
      {
        estimatedCalendarSize: {
          fiveWeekCalendarSize,
          monthTitleSize = 30,
          weekDayNamesSize = 40,
        },
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
        onScroll,
        showMonthName = true,
        calendarListContentContainerStyle,
        decelerationRate = "fast",
        scrollByWeek,
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

      const initialMonthIndex = useMemo(() => {
        if (initialDateRef.current) {
          const indexOfInitialMonth = months.indexOf(
            `${initialDateRef.current.slice(0, 8)}01`,
          );
          return indexOfInitialMonth >= 0 ? indexOfInitialMonth : 0;
        }
        return 0;
      }, [months]);

      const onViewableItemsChanged = useCallback(
        ({ viewableItems }: any) => {
          const visibleMonths = viewableItems
            //@ts-expect-error month is any
            .filter((month) => month.isViewable)
            //@ts-expect-error item is any
            .map(({ item }) => item);
          onScroll?.(visibleMonths);
        },
        [onScroll],
      );

      const calendarItemSize = useMemo(() => {
        const _monthTitleSize = showMonthName ? monthTitleSize : 0;
        const _weekDayNamesSize =
          showDayNames && !showDayNamesOnTop ? weekDayNamesSize : 0;
        return fiveWeekCalendarSize - _weekDayNamesSize - _monthTitleSize;
      }, [
        showMonthName,
        fiveWeekCalendarSize,
        monthTitleSize,
        weekDayNamesSize,
        showDayNamesOnTop,
        showDayNames,
      ]);

      const overrideLayout = useCallback(
        (layout: any, item: string) => {
          if (horizontal) {
            layout.size = calendarWidth;
            return;
          }
          const weeksInMonth = getWeeksInMonth(item, firstDayOfWeek);
          const size = fiveWeekCalendarSize + calendarVerticalGap;
          if (weeksInMonth > 5) {
            const heightPerWeek = calendarItemSize / 5;
            layout.size = size + Math.ceil(1 + heightPerWeek);
          } else {
            layout.size = size;
          }
        },
        [
          horizontal,
          calendarWidth,
          firstDayOfWeek,
          calendarItemSize,
          calendarVerticalGap,
          fiveWeekCalendarSize,
        ],
      );

      useImperativeHandle(ref, () => ({
        scrollToDate(dateString: string, animated: boolean = true) {
          listRef.current?.scrollToItem({
            animated,
            item: dateString,
          });
        },
      }));

      const keyExtractor = useCallback((item: string) => item, []);

      const renderCalendar = ({ item }: { item: string }) => (
        <Calendar
          {...calendarProps}
          showMonthName={showMonthName}
          showDayNames={showDayNames && !showDayNamesOnTop}
          firstDayOfWeek={firstDayOfWeek}
          weekdaysShort={weekdaysShort}
          minDate={minDate}
          markedDates={markedDates}
          date={item}
          WeekDayNameComponent={WeekDayNameComponent}
          contentContainerStyle={{
            ...calendarContentContainerStyle,
            width: calendarWidth,
          }}
          scrollByWeek={false}
        />
      );

      return (
        <>
          {showDayNamesOnTop && showDayNames && (
            <WeekDay
              firstDayOfWeek={firstDayOfWeek}
              weekdaysShort={weekdaysShort}
              WeekDayNameComponent={WeekDayNameComponent}
              locale={calendarProps.locale}
              weekdaysFormat={calendarProps.weekdaysFormat}
            />
          )}
          {/*/!***/}
          {/* * Calendar will not work in horizontal and RTL mode*/}
          {/* * because of FlashList issue https://github.com/Shopify/flash-list/issues/544",*/}
          {/* **!/*/}

          {/*{horizontal && I18nManager.isRTL ? (*/}
          {/*  <FlatList*/}
          {/*    data={months}*/}
          {/*    renderItem={renderCalendar}*/}
          {/*    ref={listRef}*/}
          {/*    ItemSeparatorComponent={renderSeparator}*/}
          {/*    keyExtractor={keyExtractor}*/}
          {/*    extraData={calendarProps}*/}
          {/*    horizontal*/}
          {/*    pagingEnabled*/}
          {/*    showsHorizontalScrollIndicator={false}*/}
          {/*    onViewableItemsChanged={onViewableItemsChanged}*/}
          {/*    initialScrollIndex={initialMonthIndex}*/}
          {/*    getItemLayout={(_, index) => ({*/}
          {/*      length: calendarWidth,*/}
          {/*      offset: calendarWidth * index,*/}
          {/*      index,*/}
          {/*    })}*/}
          {/*    initialNumToRender={1}*/}
          {/*    maxToRenderPerBatch={1}*/}
          {/*    contentContainerStyle={calendarListContentContainerStyle}*/}
          {/*    decelerationRate={decelerationRate}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <FlashList*/}
          {/*    ref={listRef}*/}
          {/*    horizontal={horizontal}*/}
          {/*    ItemSeparatorComponent={renderSeparator}*/}
          {/*    renderItem={renderCalendar}*/}
          {/*    keyExtractor={keyExtractor}*/}
          {/*    data={months}*/}
          {/*    estimatedItemSize={horizontal ? calendarWidth : calendarItemSize}*/}
          {/*    estimatedListSize={{*/}
          {/*      width: calendarWidth,*/}
          {/*      height: calendarHeight,*/}
          {/*    }}*/}
          {/*    extraData={calendarProps}*/}
          {/*    pagingEnabled={horizontal}*/}
          {/*    showsHorizontalScrollIndicator={false}*/}
          {/*    showsVerticalScrollIndicator={showScrollIndicator}*/}
          {/*    onViewableItemsChanged={onViewableItemsChanged}*/}
          {/*    initialScrollIndex={initialMonthIndex}*/}
          {/*    overrideItemLayout={overrideLayout}*/}
          {/*    contentContainerStyle={calendarListContentContainerStyle}*/}
          {/*    decelerationRate={decelerationRate}*/}
          {/*  />*/}
          {/*)}*/}
          <ListWeeklyScrollContainer
            {...calendarProps}
            WeekDayNameComponent={WeekDayNameComponent}
            markedDates={markedDates}
            showMonthName={showMonthName}
            showDayNames={showDayNames && !showDayNamesOnTop}
            showExtraDays={false}
            months={months}
            minDate={minDate}
            weekdaysShort={weekdaysShort}
            firstDayOfWeek={firstDayOfWeek}
          />
        </>
      );
    },
  ),
);

CalendarList.displayName = "CalendarList";
