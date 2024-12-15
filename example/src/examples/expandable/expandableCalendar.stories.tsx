import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { Calendar } from "@fowusu/calendar-kit";

import { today, todayDateString } from "../../constants";
import { formatMonthName } from "../../utils";
const ExpandableCalendarView = ({ locale }) => {
  const [selectedDate, setSelectedDate] = useState<string>();
  const [viewAs, setViewAs] = useState<"week" | "month">("month");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#eaeaea",
        justifyContent: "flex-end",
      }}
    >
      <Animated.View
        style={{
          height: viewAs === "month" ? 350 : undefined,
          backgroundColor: "#fff",
        }}
        layout={LinearTransition}
      >
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eaeaea",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            {formatMonthName(today, locale)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setViewAs((prevState) =>
                prevState === "week" ? "month" : "week",
              )
            }
          >
            <Feather
              name={viewAs === "month" ? "minimize-2" : "maximize-2"}
              size={16}
              color="#555555"
            />
          </TouchableOpacity>
        </View>
        <Calendar
          locale={locale}
          MonthAnimatedTransitionComponent={MonthTransitionComponent}
          WeekAnimatedTransitionComponent={WeekTransitionComponent}
          viewAs={viewAs}
          firstDayOfWeek={1}
          date={todayDateString}
          markedDates={[selectedDate]}
          onDayPress={setSelectedDate}
          weekdaysFormat="narrow"
          showMonthName={false}
        />
      </Animated.View>
    </View>
  );
};

const MonthTransitionComponent = ({ children }) => (
  <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
    {children}
  </Animated.View>
);
const WeekTransitionComponent = ({ children }) => (
  <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
    {children}
  </Animated.View>
);
const meta = {
  title: "Examples/Expandable/Calendar",
  component: ExpandableCalendarView,
};

export default meta;

export const Mobile = {};
