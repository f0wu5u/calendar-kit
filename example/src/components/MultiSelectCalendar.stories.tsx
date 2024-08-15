import React, { useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Calendar,
  DayIndex,
  InnerDayProps,
  toLocaleDateString,
  useRenderCount,
} from "react-native-calendar-ui";
import { addDays } from "date-fns";

import { useMultiSelectCalendar } from "../hooks/useMultiSelectCalendar";

const today = new Date();

const todayDateString = toLocaleDateString(today);
const dateRangeStart = toLocaleDateString(addDays(today, 7));
const dateRangeEnd = toLocaleDateString(addDays(today, 14));

const CalendarComponent = ({
  maxDaysInRange = 7,
  showExtraDays,
  firstDayOfWeek,
  debugMode = false,
  locale,
}) => {
  const { maxDate, markedDates, onDayPress } = useMultiSelectCalendar(
    maxDaysInRange,
    dateRangeStart,
    dateRangeEnd,
  );

  /** extending day state with custom props
   * useful when you need to render additional
   *  state on day component
   */
  const createDayState = useCallback(({ markedDates, dateString }) => {
    if (markedDates.length === 0) {
      return {};
    }
    const indexOfDay = markedDates.indexOf(dateString);
    return {
      isStartDay: indexOfDay === 0,
      isEndDay: markedDates.length - 1 === indexOfDay,
      isSelected: markedDates.includes(dateString),
    };
  }, []);

  const renderDayComponent = useCallback(
    (props) => <CustomDay {...props} debugMode={debugMode} />,
    [debugMode],
  );
  return (
    <Calendar
      DayComponent={renderDayComponent}
      maxDate={maxDate}
      date={todayDateString}
      showExtraDays={showExtraDays}
      markedDates={markedDates}
      onDayPress={onDayPress}
      firstDayOfWeek={firstDayOfWeek as DayIndex}
      customStateCreator={createDayState}
      contentContainerStyle={{ paddingHorizontal: 2 }}
      locale={locale}
    />
  );
};

const meta = {
  title: "Components/Calendar/Multi Selection",
  component: CalendarComponent,
  parameters: {
    controls: {
      exclude: ["debugMode"],
    },
  },
  argTypes: {
    firstDayOfWeek: { control: "radio", options: [0, 1, 2, 3, 4, 5, 6] },
  },
  args: {
    maxDaysInRange: 7,
    showExtraDays: true,
    debugMode: false,
    locale: "en-US",
  },
};

export default meta;

export const Default = {};
export const DebugRenderCount = {
  args: {
    debugMode: true,
  },
};

const CustomDay: React.FC<InnerDayProps<any>> = (props) => {
  const {
    day,
    state,
    isStartDay,
    isEndDay,
    isToday,
    isSelected,
    debugMode,
    locale,
  } = props;
  const renderCount = useRenderCount();
  const dayStyle = useMemo(() => {
    if (state !== "inactive") {
      if (isStartDay || isEndDay) {
        return {
          textStyle: textStyles.selected,
          containerStyle: isStartDay
            ? containerStyles.start
            : containerStyles.end,
        };
      }
      if (isSelected) {
        return {
          textStyle: textStyles.selected,
          containerStyle: containerStyles.selected,
        };
      }
    }
    if (isToday) {
      return {
        textStyle: textStyles.today,
      };
    }
    return {};
  }, [state, isStartDay, isEndDay, isSelected, isToday]);

  return (
    <View style={[containerStyles.defaultContainer, dayStyle.containerStyle]}>
      <Text
        style={[
          textStyles.defaultDayText,
          textStyles[state],
          dayStyle.textStyle,
        ]}
      >
        {day.toLocaleDateString(locale, { day: "numeric" })}
      </Text>
      {debugMode ? (
        <Text style={textStyles.debugRenderText}>R={renderCount}x</Text>
      ) : null}
    </View>
  );
};

const containerStyles = StyleSheet.create({
  defaultContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  selected: {
    backgroundColor: "#b1b5ff",
  },
  start: {
    backgroundColor: "#2b2e7d",
    borderRadius: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  end: {
    backgroundColor: "#2b2e7d",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontSize: 16,
  },
  selected: {
    color: "#fff",
    fontWeight: "normal",
  },
  active: {
    color: "#5a5a5a",
  },
  inactive: {
    color: "#cacaca",
  },
  today: {
    color: "#787de7",
    fontWeight: "bold",
  },
  debugRenderText: {
    textAlign: "center",
    fontSize: 10,
    color: "#868686",
  },
});
