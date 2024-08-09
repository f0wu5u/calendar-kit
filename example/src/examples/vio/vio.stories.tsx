import React, { useCallback } from "react";
import {
  CalendarList,
  StateInputParams,
} from "@code-fi/react-native-calendar-ui";
import { isWeekend } from "date-fns";

import { dateRangeStart, todayDateString } from "../../constants";
import { useMultiSelectCalendar } from "../../hooks/useMultiSelectCalendar";

import { Day } from "./Day";

const weekStartsOn = 1;
const VioCalendarListComponent = () => {
  const { markedDates, onDayPress, maxDate } = useMultiSelectCalendar(30);

  /** extending day state with custom props
   * useful when you need to render additional
   *  state on day component
   */
  const createDayState = useCallback(
    ({ markedDates, dateString }: StateInputParams) => {
      if (markedDates.length === 0) {
        return {};
      }
      const indexOfDay = markedDates.indexOf(dateString);
      const dayIsWeekend = isWeekend(dateString);
      const isSelected = markedDates.includes(dateString);

      return {
        isStartDay: indexOfDay === 0,
        isEndDay: markedDates.length - 1 === indexOfDay && indexOfDay !== 0,
        isSelected,
        isWeekEnd: dayIsWeekend,
        isMultiSelect: markedDates.length > 1,
      };
    },
    [],
  );

  const renderDayComponent = useCallback((props) => <Day {...props} />, []);

  return (
    <CalendarList
      DayComponent={renderDayComponent}
      minDate={todayDateString}
      maxDate={maxDate}
      currentDate={dateRangeStart}
      estimatedCalendarSize={300}
      showExtraDays={false}
      markedDates={markedDates}
      futureMonthsCount={13}
      showDayNamesOnTop
      onDayPress={onDayPress}
      firstDayOfWeek={weekStartsOn}
      weeksContainerStyle={{
        gap: 8,
      }}
      customStateCreator={createDayState}
      calendarContentContainerStyle={{
        paddingHorizontal: 8,
      }}
      showScrollIndicator={false}
    />
  );
};

const meta = {
  title: "Examples/Vio",
  component: VioCalendarListComponent,
};

export default meta;

export const Mobile = {};
