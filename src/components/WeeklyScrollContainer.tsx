/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, StyleSheet } from "react-native";

import { width } from "../utils/screen";

import { Week, WeekProps } from "./Week";

export interface WeeklyScrollContainerProps
  extends Omit<WeekProps, "weekDays"> {
  weeklyScrollBehavior?: "snap" | "free";
  onWeekVisible?: (week: string[]) => void;
  activeDate?: string;
  weeks: string[][];
}
export const WeeklyScrollContainer: React.FC<WeeklyScrollContainerProps> = ({
  weeks,
  activeDate,
  weeklyScrollBehavior = "snap",
  weekContainerStyle,
  onWeekVisible,
  ...weekProps
}) => {
  const scrollRef = useRef<FlatList>(null);
  const [scrollLayoutWidth, setScrollLayoutWidth] = useState(width);

  const initialScrollIndex = useMemo(() => {
    if (!activeDate) return 0;
    const activeWeekIndex = weeks.findIndex((week) =>
      week.includes(activeDate),
    );
    return activeWeekIndex >= 0 ? activeWeekIndex : 0;
  }, []);

  // scrollRef.current.scroll

  const renderWeek = useCallback(
    ({ item }: { item: string[] }) => {
      return (
        <Week
          {...weekProps}
          weekContainerStyle={{
            ...weekContainerStyle,
            width: scrollLayoutWidth,
          }}
          weekDays={item}
        />
      );
    },
    [weekProps],
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      const visibleWeeks = viewableItems
        //@ts-expect-error month is any
        .filter((week) => week.isViewable)
        //@ts-expect-error item is any
        .map(({ item }) => item);
      onWeekVisible?.(visibleWeeks.flat());
    },
    [onWeekVisible],
  );

  const onScrollLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setScrollLayoutWidth(layout.width);
  };

  const getItemLayout = (_: unknown, index: number) => ({
    length: scrollLayoutWidth,
    offset: scrollLayoutWidth * index,
    index,
  });

  const isSnapping = weeklyScrollBehavior === "snap";

  return (
    <FlatList
      onLayout={onScrollLayout}
      ref={scrollRef}
      data={weeks}
      renderItem={renderWeek}
      pagingEnabled={isSnapping}
      horizontal
      maxToRenderPerBatch={1}
      initialNumToRender={1}
      initialScrollIndex={initialScrollIndex}
      showsHorizontalScrollIndicator={false}
      snapToInterval={!isSnapping ? scrollLayoutWidth : undefined}
      extraData={weekProps}
      getItemLayout={getItemLayout}
      onViewableItemsChanged={onViewableItemsChanged}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};
const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
