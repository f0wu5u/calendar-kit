import React, { useCallback } from "react";
import { CalendarList } from "@code-fi/react-native-calendar-ui";
import { endOfWeek, isSameDay, startOfWeek } from "date-fns";

import { dateRangeStart, todayDateString } from "../../constants";
import { useMultiSelectCalendar } from "../../hooks/useMultiSelectCalendar";

import { Day } from "./Day";
import { MonthName } from "./MonthName";

const weekStartsOn = 1;
const weekdaysShort = ["S", "M", "T", "W", "T", "F", "S"];
const AirbnbCalendarListComponent = () => {
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
    const firstDayOfWeek = startOfWeek(dateString, { weekStartsOn });
    const lastDayOfWeek = endOfWeek(dateString, { weekStartsOn });
    const isSelected = markedDates.includes(dateString);

    return {
      isStartDay: indexOfDay === 0,
      isEndDay: markedDates.length - 1 === indexOfDay && indexOfDay !== 0,
      isSelected,
      isStartOfWeek: isSameDay(dateString, firstDayOfWeek),
      isEndOfWeek: isSameDay(dateString, lastDayOfWeek),
      isMultiSelect: markedDates.length > 1,
    };
  }, []);

  const renderDayComponent = useCallback((props) => <Day {...props} />, []);

  return (
    <CalendarList
      DayComponent={renderDayComponent}
      minDate={todayDateString}
      currentDate={dateRangeStart}
      weekdaysShort={weekdaysShort}
      estimatedCalendarSize={300}
      showExtraDays={false}
      markedDates={markedDates}
      futureMonthsCount={24}
      showDayNamesOnTop
      onDayPress={onDayPress}
      firstDayOfWeek={weekStartsOn}
      weeksContainerStyle={{
        gap: 4,
      }}
      MonthNameComponent={MonthName}
      customStateCreator={createDayState}
      calendarContentContainerStyle={{
        paddingHorizontal: 8,
      }}
      showScrollIndicator={false}
    />
  );
};

const meta = {
  title: "Examples/Airbnb",
  component: AirbnbCalendarListComponent,
};

export default meta;

export const Mobile = {};
