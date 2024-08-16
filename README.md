# Introduction
A **simple** and **customizable** React Native component for displaying and interacting with calendar dates.

# Features
- 💡 100% Typescript
- ⚡️ Build with `@shopify/flashlist` for faster list rendering
- 🕑 Works in all timezones
- 🎨 Fully customizable
- 🈲 Supports localization
- 🚀 DX, UX and Performance in one lightweight bundle
- 👨🏽‍💻 Works in every RN project

# Installation
To install the package, use npm or yarn:

```bash
npm install @arbta/calendar-kit
```
or

```bash
yarn add @arbta/calendar-kit
```


# Usage
Here’s a basic example of how to use the `@arbta/calendar-kit` package:

```typescript jsx
import React, { useCallback, useState } from "react";
import { Calendar, toLocaleDateString } from "@arbta/calendar-kit";

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