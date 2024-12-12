import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  I18nManager,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import { DayIndex } from "../types";
import {
  createWeeksInRange,
  dateStringToDate,
  endOfMonth,
  startOfMonth,
} from "../utils/date";
import { width } from "../utils/screen";

import { CalendarListViewProps } from "./types";
import { Week, WeekProps } from "./Week";

export interface ListWeeklyScrollContainerProps
  extends CalendarListViewProps,
    Omit<WeekProps, "weekDays" | "month" | "isLastWeekOfList"> {
  currentDate?: string;
  months: string[];
  showDayNames?: boolean;
  firstDayOfWeek?: DayIndex;
  MonthNameComponent?: React.ComponentType<{ month: Date; locale?: string }>;
}
const isWeb = Platform.select({ web: true, default: false });

export const ListWeeklyScrollContainer = forwardRef(
  (
    {
      months,
      firstDayOfWeek = 0,
      MonthNameComponent,
      locale,
      weekContainerStyle,
      currentDate,
      onScroll,
      calendarSize,
      showScrollIndicator = false,
      decelerationRate,
      onListEndReached,
      onEndReachedThreshold,
      showDayNames,
      calendarListContentContainerStyle,
      ...weekProps
    }: ListWeeklyScrollContainerProps,
    ref: any,
  ) => {
    const [scrollLayoutWidth, setScrollLayoutWidth] = useState(width);
    const listRef = useRef<any>(null);
    const calendarWidth = calendarSize?.width ?? width;

    const data = useMemo(() => {
      const lastMonth = endOfMonth(dateStringToDate(months[months.length - 1]));
      const startMonth = dateStringToDate(months[0]);
      return createWeeksInRange(startMonth, lastMonth, firstDayOfWeek).map(
        (week) => ({
          month: startOfMonth(dateStringToDate(week[0])),
          week,
        }),
      );
    }, [months, firstDayOfWeek]);

    const initialDateRef = useRef(currentDate);
    const initialMonthIndex = useMemo(() => {
      if (initialDateRef.current && currentDate) {
        const indexOfInitialMonth = data.findIndex(({ week }) =>
          week.includes(currentDate),
        );
        return indexOfInitialMonth >= 0 ? indexOfInitialMonth : 0;
      }
      return 0;
    }, [currentDate, data]);

    const webFallbackWeekContainerStyle: any = {
      scrollSnapAlign: "center",
      width: isWeb ? "100vw" : scrollLayoutWidth,
    };

    const renderItem = ({ item: { month, week }, index }: any) => {
      return (
        <Week
          {...weekProps}
          month={month}
          key={`${month}-week-${index}`}
          weekDays={week}
          isLastWeekOfList={index === data.length - 1}
          weekContainerStyle={{
            ...weekContainerStyle,
            ...webFallbackWeekContainerStyle,
          }}
        />
      );
    };

    const onScrollLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setScrollLayoutWidth(layout.width);
    };

    useImperativeHandle(ref, () => ({
      scrollToItem(dateString: string, animated: boolean = true) {
        const item = data.find(({ week }) => week.includes(dateString));
        if (item) {
          listRef.current?.scrollToItem({
            animated,
            item,
          });
        }
      },
    }));

    const onViewableItemsChanged = useCallback(
      ({ viewableItems }: any) => {
        const visibleWeeks = viewableItems
          //@ts-expect-error month is any
          .filter((week) => week.isViewable)
          //@ts-expect-error item is any
          .map(({ item }) => item);
        // fix issues with fast scroll on web
        if (visibleWeeks && visibleWeeks.length > 0) {
          onScroll?.(visibleWeeks);
        }
      },
      [onScroll],
    );
    return I18nManager.isRTL ? (
      <FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
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
        extraData={weekProps}
      />
    ) : (
      <FlashList
        ref={listRef}
        onViewableItemsChanged={onViewableItemsChanged}
        onLayout={onScrollLayout}
        horizontal
        data={data}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={scrollLayoutWidth}
        estimatedItemSize={scrollLayoutWidth}
        estimatedListSize={{
          width: calendarWidth,
          height: calendarSize?.height ?? 150,
        }}
        initialScrollIndex={initialMonthIndex}
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={onListEndReached}
        showsHorizontalScrollIndicator={showScrollIndicator}
        decelerationRate={decelerationRate}
        extraData={weekProps}
        contentContainerStyle={calendarListContentContainerStyle}
      />
    );
  },
);

ListWeeklyScrollContainer.displayName = "ListWeeklyScrollContainer";
