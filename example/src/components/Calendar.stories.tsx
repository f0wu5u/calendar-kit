import React, { useCallback, useState } from "react";
import { Pressable, Text } from "react-native";
import { Calendar, DayIndex, toLocaleDateString } from "@fowusu/calendar-kit";
import { addDays } from "date-fns";

import { useViewAsToggle } from "./useViewAsToggle";

const today = new Date();

const todayDateString = toLocaleDateString(today);

const CalendarComponent = ({
  basic,
  showExtraDays,
  minDate,
  maxDate,
  firstDayOfWeek = 0,
  locale,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>();
  const { onPress, viewAs } = useViewAsToggle();

  const onDayPress = useCallback((dateString) => {
    setSelectedDay(dateString);
  }, []);

  return (
    <>
      <Pressable
        style={{
          marginHorizontal: "auto",
          marginVertical: 8,
          width: 110,
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          borderRadius: 4,
          backgroundColor: "#cfcaff",
        }}
        onPress={onPress}
      >
        <Text>Toggle {viewAs === "week" ? "Full" : "Weekly"}</Text>
      </Pressable>
      <Calendar
        viewAs={viewAs}
        minDate={!basic ? minDate : undefined}
        maxDate={!basic ? maxDate : undefined}
        date={todayDateString}
        showExtraDays={showExtraDays}
        markedDates={[selectedDay]}
        onDayPress={onDayPress}
        firstDayOfWeek={firstDayOfWeek as DayIndex}
        locale={locale}
      />
    </>
  );
};

const meta = {
  title: "Components/Calendar/Single Day",
  component: CalendarComponent,
  parameters: {
    controls: {
      exclude: ["basic"],
    },
  },
  argTypes: {
    minDate: {
      control: "select",
      options: [
        toLocaleDateString(addDays(today, 2)),
        toLocaleDateString(addDays(today, 7)),
      ],
    },
    maxDate: {
      control: "select",
      options: [
        toLocaleDateString(addDays(today, 14)),
        toLocaleDateString(addDays(today, 28)),
      ],
    },
    firstDayOfWeek: { control: "radio", options: [0, 1, 2, 3, 4, 5, 6] },
  },
  args: {
    showExtraDays: true,
    basic: true,
    minDate: todayDateString,
  },
};

export default meta;

export const Default = {
  parameters: {
    controls: {
      exclude: ["minDate", "maxDate", "basic"],
    },
  },
};

export const WithMinAndMax = {
  args: {
    basic: false,
  },
};
