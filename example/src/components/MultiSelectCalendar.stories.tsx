import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Calendar,
  DayIndex,
  getDatesInRange,
  InnerDayProps,
  toLocaleDateString,
  useRenderCount,
} from "@code-fi/react-native-calendar-ui";
import { addDays, isBefore, isSameDay } from "date-fns";

const today = new Date();

const todayDateString = toLocaleDateString(today);
const dateRangeStart = toLocaleDateString(addDays(today, 7));
const dateRangeEnd = toLocaleDateString(addDays(today, 14));

const CalendarComponent = ({
  maxDaysInRange = 7,
  showExtraDays,
  firstDayOfWeek,
  debugMode = false,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>();
  const choiceTurnRef = useRef<"start" | "end">("start");
  const [dateRange, setDateRange] = useState({
    start: dateRangeStart,
    end: dateRangeEnd,
  });

  //effect for creating date range for multi select dates
  useEffect(() => {
    if (selectedDay) {
      const sameOrBeforeCheckInDate = isSameOrBeforeDate(
        selectedDay,
        dateRange.start,
      );
      if (choiceTurnRef.current === "start" || sameOrBeforeCheckInDate) {
        setDateRange({ start: selectedDay, end: undefined });
        choiceTurnRef.current = "end";
      } else {
        setDateRange((prevState) => ({ ...prevState, end: selectedDay }));
        choiceTurnRef.current = "start";
        setSelectedDay(undefined);
      }
    }
  }, [selectedDay, dateRange.start]);

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

  const onDayPress = useCallback((dateString) => {
    setSelectedDay(dateString);
  }, []);

  const markedDates = useMemo(() => {
    const { start, end } = dateRange;
    if (start && end) {
      return getDatesInRange(start, end);
    }
    if (start && !end) {
      return [start];
    }
    return [];
  }, [dateRange]);

  const maxDate = useMemo(() => {
    if (choiceTurnRef.current === "start") return undefined;
    return toLocaleDateString(addDays(dateRange.start, maxDaysInRange));
  }, [dateRange.start, maxDaysInRange, choiceTurnRef.current]);

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
    />
  );
};

const meta = {
  title: "Calendar/Multi Selection",
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
  },
};

export default meta;

export const Default = {};
export const DebugRenderCount = {
  args: {
    debugMode: true,
  },
};

const isSameOrBeforeDate = (date: string, dateToCompare: string) => {
  return isSameDay(date, dateToCompare) || isBefore(date, dateToCompare);
};

const CustomDay: React.FC<InnerDayProps<any>> = (props) => {
  const { day, state, isStartDay, isEndDay, isToday, isSelected, debugMode } =
    props;
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
        {day.getDate()}
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
