import React, { useMemo, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import { DayIndex } from "../types";
import {
  createWeeksOfMonth,
  dateStringToDate,
  formatMonthName,
} from "../utils/date";
import { width } from "../utils/screen";

import { CalendarProps } from "./Calendar";
import { Week } from "./Week";
import { WeeklyScrollContainer } from "./WeeklyScrollContainer";

interface ListWeeklyScrollContainerProps extends Omit<CalendarProps, "date"> {
  months: string[];
}
export const ListWeeklyScrollContainer: React.FC<
  ListWeeklyScrollContainerProps
> = ({
  months,
  firstDayOfWeek = 0,
  showMonthName,
  MonthNameComponent,
  locale,
  weekContainerStyle,
  ...calendarProps
}) => {
  const [scrollLayoutWidth, setScrollLayoutWidth] = useState(width);

  const data = useMemo(() => {
    const weeksOfMonths = months.map((month) => {
      const monthDate = dateStringToDate(month);
      const weeks = createWeeksOfMonth(monthDate, firstDayOfWeek, true);
      console.log(JSON.stringify(weeks));
      return {
        month: monthDate,
        weeks,
      };
    });

    return weeksOfMonths.flat();
  }, [months, firstDayOfWeek]);

  const renderMonthName = () => {
    if (!showMonthName) return null;
    return MonthNameComponent ? (
      <MonthNameComponent month={new Date()} locale={locale} />
    ) : (
      <View style={styles.monthNameContainer}>
        <Text style={styles.monthNameText}>
          {formatMonthName(new Date(), locale)}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item: { month, weeks } }: any) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {weeks.map((week: string[], index: number) => (
          <Week
            {...calendarProps}
            month={month}
            key={`${month}-week-${index}`}
            weekDays={week}
            showExtraDays
            weekContainerStyle={{
              ...weekContainerStyle,
              width: scrollLayoutWidth
          }}
          />
        ))}
      </View>
    );
  };

  const onScrollLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setScrollLayoutWidth(layout.width);
  };

  return (
    <View style={[styles.calenderContainer]}>
      {renderMonthName()}
      <FlashList
        onLayout={onScrollLayout}
        horizontal
        data={data}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={scrollLayoutWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
  calenderContainer: {
    width: "100%",
  },
  monthNameContainer: {
    paddingBottom: 8,
    height: 30,
  },
  monthNameText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
