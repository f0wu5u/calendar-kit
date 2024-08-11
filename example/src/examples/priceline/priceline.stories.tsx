import React, { useCallback } from "react";
import { CalendarList } from "@code-fi/react-native-calendar-ui";

import { dateRangeStart, todayDateString } from "../../constants";
import { useMultiSelectCalendar } from "../../hooks/useMultiSelectCalendar";

import { Day } from "./Day";

const weekStartsOn = 1;
const PricelineCalendarListComponent = () => {
  const { markedDates, onDayPress } = useMultiSelectCalendar();

  /** extending day state with custom props
   * useful when you need to render additional
   *  state on day component
   */
  const createDayState = useCallback(({ markedDates, dateString }) => {
    if (markedDates.length === 0) {
      return {};
    }
    const indexOfDay = markedDates.indexOf(dateString);
    const isSelected = markedDates.includes(dateString);

    return {
      isStartDay: indexOfDay === 0,
      isEndDay: markedDates.length - 1 === indexOfDay && indexOfDay !== 0,
      isSelected,
      isMultiSelect: markedDates.length > 1,
    };
  }, []);

  const renderDayComponent = useCallback((props) => <Day {...props} />, []);

  return (
    <CalendarList
      horizontal
      DayComponent={renderDayComponent}
      minDate={todayDateString}
      currentDate={dateRangeStart}
      weekdaysFormat="narrow"
      estimatedCalendarSize={300}
      showExtraDays={false}
      markedDates={markedDates}
      futureMonthsCount={24}
      onDayPress={onDayPress}
      firstDayOfWeek={weekStartsOn}
      weeksContainerStyle={{
        gap: 4,
      }}
      MonthNameComponent={null}
      customStateCreator={createDayState}
      calendarContentContainerStyle={{
        paddingHorizontal: 8,
      }}
      showScrollIndicator={false}
    />
  );
};

const meta = {
  title: "Examples/Priceline",
  component: PricelineCalendarListComponent,
};

export default meta;

export const Mobile = {};
