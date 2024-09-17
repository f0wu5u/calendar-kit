import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Calendar,
  InnerDayProps,
  toLocaleDateString,
} from "@fowusu/calendar-kit";
import { addDays, eachDayOfInterval, isWeekend } from "date-fns";

const today = new Date();

const todayDateString = toLocaleDateString(today);
const orangeDays = eachDayOfInterval({
  start: addDays(today, 6),
  end: addDays(today, 10),
}).map(toLocaleDateString);

const CalendarComponent = ({ locale }) => {
  const [selectedDay, setSelectedDay] = useState<string>();

  /** extending day state with custom props
   * useful when you need to render additional
   *  state on day component
   */
  const createDayState = useCallback(
    ({ markedDates, dateString }, defaultState) => {
      const isOrangeDay = orangeDays.includes(dateString);
      // disable all weekend days
      const isWeekendDate = isWeekend(dateString);
      return {
        isOrangeDay,
        state: isWeekendDate ? "inactive" : defaultState.state,
        isSelected: markedDates.includes(dateString),
      };
    },
    [],
  );

  const onDayPress = useCallback((dateString) => {
    setSelectedDay(dateString);
  }, []);

  return (
    <Calendar
      DayComponent={CustomDay}
      date={todayDateString}
      showExtraDays={false}
      markedDates={[selectedDay]}
      onDayPress={onDayPress}
      customStateCreator={createDayState}
      locale={locale}
    />
  );
};

const meta = {
  title: "Components/Calendar/Custom Day State",
  component: CalendarComponent,
};

export default meta;

export const Default = {};
const CustomDay: React.FC<InnerDayProps<any>> = (props) => {
  const { day, state, isSelected, isOrangeDay, isToday, locale } = props;
  const dayStyle = useMemo(() => {
    if (state !== "inactive") {
      if (isToday) {
        return {
          textStyle: textStyles.today,
          containerStyle: isSelected ? containerStyles.selected : undefined,
        };
      }
      if (isSelected) {
        return {
          textStyle: textStyles.selected,
          containerStyle: containerStyles.selected,
        };
      }
    }
    return {};
  }, [state, isSelected, isToday]);

  return (
    <View style={[containerStyles.defaultContainer, dayStyle.containerStyle]}>
      <Text
        style={[
          textStyles.defaultDayText,
          textStyles[state],
          dayStyle.textStyle,
        ]}
      >
        {day.toLocaleDateString(locale, { day: "2-digit" })}
      </Text>
      {isOrangeDay ? <View style={containerStyles.orange} /> : undefined}
    </View>
  );
};

const containerStyles = StyleSheet.create({
  defaultContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  orange: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: "#de4911",
    marginTop: 4,
    position: "absolute",
    bottom: 5,
  },
  selected: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
});

const textStyles = StyleSheet.create({
  defaultDayText: {
    textAlign: "center",
    fontSize: 16,
  },
  selected: {
    color: "#174d9d",
    fontWeight: "normal",
  },
  active: {
    color: "#5a5a5a",
  },
  inactive: {
    color: "#cacaca",
  },
  today: {
    color: "#174d9d",
    fontWeight: "bold",
  },
});
