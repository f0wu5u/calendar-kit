import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { FlatList, I18nManager, Platform, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { getWeeksInMonth, startOfMonthForDateString } from "../utils/date";
import { height, width } from "../utils/screen";

import { Calendar } from "./Calendar";
import { VIEWABILITY_CONFIG } from "./constants";
import {
  CalendarListProps,
  CalendarListViewProps,
  FullCalendarListViewProps,
} from "./types";

export const FullCalendarListView = forwardRef(
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
      onEndReachedThreshold,
      onListEndReached,
      months,
      ...calendarProps
    }: CalendarListViewProps &
      CalendarListProps &
      FullCalendarListViewProps & {
        months: string[];
      },
    ref: any,
  ) => {
    const calendarWidth = calendarSize?.width ?? width;
    const calendarHeight = calendarSize?.height ?? height;
    const isWeb = Platform.select({ web: true, default: false });
    const webFallbackContainerStyle: any = {
      scrollSnapAlign: horizontal ? "center" : "start",
      width: isWeb && calendarWidth === width ? "100vw" : calendarWidth,
    };
    const initialDateRef = useRef(currentDate);
    const initialMonthIndex = useMemo(() => {
      if (initialDateRef.current) {
        const indexOfInitialMonth = months.indexOf(
          startOfMonthForDateString(initialDateRef.current),
        );
        return indexOfInitialMonth >= 0 ? indexOfInitialMonth : 0;
      }
      return 0;
    }, [months]);

    const renderSeparator = useCallback(
      () =>
        CalendarSeparator ? (
          <CalendarSeparator />
        ) : (
          <View style={{ height: calendarVerticalGap }} />
        ),
      [CalendarSeparator, calendarVerticalGap],
    );
    const onViewableItemsChanged = useCallback(
      ({ viewableItems }: any) => {
        const visibleMonths = viewableItems
          //@ts-expect-error month is any
          .filter((month) => month.isViewable)
          //@ts-expect-error item is any
          .map(({ item }) => item);
        // fix issues with fast scroll on web
        if (visibleMonths && visibleMonths.length > 0) {
          onScroll?.(visibleMonths);
        }
      },
      [onScroll],
    );

    const overrideLayout = useCallback(
      (layout: any, item: string) => {
        if (horizontal) {
          layout.size = calendarWidth;
          return;
        }
        const weeksInMonth = getWeeksInMonth(item, firstDayOfWeek);
        const size = fiveWeekCalendarSize + calendarVerticalGap;
        if (weeksInMonth > 5) {
          const _monthTitleSize = showMonthName ? monthTitleSize : 0;
          const _weekDayNamesSize =
            showDayNames && !showDayNamesOnTop ? weekDayNamesSize : 0;
          const heightPerWeek =
            (fiveWeekCalendarSize - _weekDayNamesSize - _monthTitleSize) / 5;
          layout.size = size + heightPerWeek;
        } else {
          layout.size = size;
        }
      },
      [
        horizontal,
        calendarWidth,
        firstDayOfWeek,
        showMonthName,
        showDayNames,
        monthTitleSize,
        showDayNamesOnTop,
        calendarVerticalGap,
        weekDayNamesSize,
        fiveWeekCalendarSize,
      ],
    );

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
          ...webFallbackContainerStyle,
        }}
      />
    );
    const keyExtractor = useCallback((item: string) => item, []);

    return (
      <>
        {/*/!***/}
        {/* * Calendar will not work in horizontal and RTL mode*/}
        {/* * because of FlashList issue https://github.com/Shopify/flash-list/issues/544",*/}
        {/* **!/*/}

        {horizontal && I18nManager.isRTL ? (
          <FlatList
            data={months}
            renderItem={renderCalendar}
            ref={ref}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={keyExtractor}
            extraData={calendarProps}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            initialScrollIndex={initialMonthIndex}
            getItemLayout={(_, index) => ({
              length: calendarWidth,
              offset: calendarWidth * index,
              index,
            })}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            contentContainerStyle={calendarListContentContainerStyle}
            decelerationRate={decelerationRate}
            viewabilityConfig={VIEWABILITY_CONFIG}
          />
        ) : (
          <FlashList
            ref={ref}
            horizontal={horizontal}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderCalendar}
            keyExtractor={keyExtractor}
            data={months}
            estimatedItemSize={
              horizontal ? calendarWidth : fiveWeekCalendarSize
            }
            estimatedListSize={{
              width: calendarWidth,
              height: calendarHeight,
            }}
            extraData={calendarProps}
            pagingEnabled={horizontal}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={showScrollIndicator}
            snapToAlignment="start"
            onViewableItemsChanged={onViewableItemsChanged}
            initialScrollIndex={initialMonthIndex}
            overrideItemLayout={overrideLayout}
            contentContainerStyle={calendarListContentContainerStyle}
            decelerationRate={decelerationRate}
            onEndReached={onListEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            viewabilityConfig={VIEWABILITY_CONFIG}
          />
        )}
      </>
    );
  },
);

FullCalendarListView.displayName = "FullCalendarListView";
