# Introduction
A **simple** and **customizable** React Native component for displaying and interacting with **Gregorian calendar** dates.
![@fowusu/calendar-kit](https://github.com/f0wu5u/calendar-kit/blob/master/static/calendar-kit.png?raw=true)

# Features
- 💡 100% Typescript
- ⚡️ Build with `@shopify/flashlist` for faster list rendering
- 🕑 Works in all timezones
- 🎨 Fully customizable
- 🈲 Supports localization
- 🚀 DX, UX and Performance in one lightweight bundle
- 👨🏽‍💻 Works in every RN project

# Examples

| Vio.com                                                                                             | Airbnb                                                                                                |
|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/vio-calendar.gif" /> | <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/airbnb-calendar.gif"/> |

| Priceline                                                                                                 | Booking.com                                                                                            |
|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/priceline-calendar.gif" /> | <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/booking-calendar.gif"/> |

| Localized                                                                                                 | Performance                                                                                                | Schedule                                                                                                |
|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/localize-calendar.gif" /> | <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/performance-calendar.gif"/> | <img width="380" src="https://github.com/f0wu5u/calendar-kit/blob/master/static/schedule-calendar.gif"/> |


# Installation
To install the package, use npm or yarn:

```bash
npm install @fowusu/calendar-kit
```
or

```bash
yarn add @fowusu/calendar-kit
```

> ⚠️ If you plan using `CalendarList` then you need to install `@shopify/flash-list`
```bash
yarn add @shopify/flash-list

# pod installation for iOS before building app
cd ios; pod install
```

# Usage
Here’s a basic example of how to use the `@fowusu/calendar-kit` package:

## Calendar
```typescript jsx
import React, { useCallback, useState } from "react";
import { Calendar, toLocaleDateString } from "@fowusu/calendar-kit";

const today = new Date();

const todayDateString = toLocaleDateString(today);

const CalendarComponent = () => {
  const [selectedDay, setSelectedDay] = useState<string>();

  const onDayPress = useCallback((dateString) => {
    setSelectedDay(dateString);
  }, []);

  return (
    <Calendar
      date={todayDateString}
      markedDates={[selectedDay]}
      onDayPress={onDayPress}
    />
  );
};
```

## CalendarList
```typescript jsx
import React, { useCallback, useState } from "react";
import {CalendarList, toLocaleDateString} from "@fowusu/calendar-kit";

const today = new Date();
const todayDateString = toLocaleDateString(today);

const CalendarListComponent = () => {
    const [selectedDay, setSelectedDay] = useState<string>();
    
    const onDayPress = useCallback((dateString) => {
        setSelectedDay(dateString);
    }, []);

  return (
    <CalendarList
      currentDate={todayDateString}
      estimatedCalendarSize={{
          fiveWeekCalendarSize: 400
      }}
      markedDates={[selectedDay]}
      futureMonthsCount={12}
      pastMonthsCount={0}
      onDayPress={onDayPress}
    />
  );
};
```

# API Reference
See our [API Reference docs](API_REFERENCE.md)
# Contributing
Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
