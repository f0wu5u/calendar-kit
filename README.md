# Introduction
A **simple** and **customizable** React Native component for displaying and interacting with **Gregorian calendar** dates.

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

## Calendar
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

## CalendarList
```typescript jsx
import React, { useCallback, useState } from "react";
import {CalendarList, toLocaleDateString} from "@arbta/calendar-kit";

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
      estimatedCalendarSize={400}
      markedDates={[selectedDay]}
      futureMonthsCount={12}
      pastMonthsCount={0}
      onDayPress={onDayPress}
    />
  );
};
```

# API Reference

## Calendar Props
Our `Calendar` component has a list of props that make it easy to plug and play UI for your calendars.

### **`contentContainerStyle`** <small><`ViewStyle?`></small>
`ViewStyle` for calendar's parent view component
>Default `undefined`
<hr/>

### **`customStateCreator`** <small><`((stateInputParams: StateInputParams, defaultState?: DayState) => object)?`></small>
`Function` for extending/customizing calendar day state
>Default `undefined`
>>  ⚠️ **_Caution_**<br/>Always use a pure named function for optimal performance. See example [here](https://github.com/arbta/calendar-kit/blob/22259522e87e177c255369a872165063514b7868/example/src/examples/airbnb/airbnb.stories.tsx#L19)
<hr/>

### **`date`** <small><`string`></small>
Any date in the month you want to show in the calendar; example: `2024-08-16` for month of `August, 2024`
>Format `YYYY-MM-DD`
<hr/>

### **`firstDayOfWeek`** <small> <`DayIndex?`></small>
`DayIndex` which is used to determine the first day of the week for this `date` according to local time, where 0 represents Sunday
>Default `0`
<hr/>

### **`locale`** <small><`string?`></small>
Locale string used to localize calendar content
>Default `en-US`
<hr/>
   
### **`markedDates`** <small><`string[]`></small>
Selected day(s) on the calendar to be highlighted
>Default `[]` Format `[YYYY-MM-DD]`
<hr/>

### **`maxDate`** <small><`string?`></small>
Maximum selectable date on the calendar example: `2024-12-31`
>Default `undefined` Format `YYYY-MM-DD`
<hr/>

### **`minDate`** <small><`string?`></small>
Minimum selectable date on the calendar example: `2024-01-01`
>Default `undefined` Format `YYYY-MM-DD`
<hr/>

### **`MonthNameComponent`** <small><`React.ComponentType<{ month: Date; locale?: string }>`></small>
Custom component to render calendar's `month` title; example: `August, 2024`
>Default `undefined`
<hr/>

### **`onDayPress`** <small><`((dateString: string) => void)?`></small>
`Function` for adding press listener to calendar day
>Default `undefined`
>> ⚠️ **_Caution_**<br/>Always use a pure named function for optimal performance. See example [here](https://github.com/arbta/calendar-kit/blob/22259522e87e177c255369a872165063514b7868/example/src/hooks/useMultiSelectCalendar.ts#L29)
<hr/>

### **`showDayNames`** <small><`Boolean?`></small>
Show week day names on the calendar
>Default `true`
<hr/>

### **`showExtraDays`** <small><`Boolean?`></small>
Show extra days from previous and next month in the current month's calendar
>Default `true`
<hr/>

### **`showMonthName`** <small><`Boolean?`></small>
Show calendar's month title
>Default `true`
<hr/>

### **`weekContainerStyle`** <small><`ViewStyle?`></small>
`ViewStyle` for each week `row` on the calendar
>Default `undefined`
<hr/>

### **`WeekDayNameComponent`** <small><`React.ComponentType<{ weekDays:string[] }>`></small>
Custom component to render calendar's week day names;
>Default `undefined`
<hr/>

### **`weekdaysFormat`** <small><`"long"|"short"|"narrow"`></small>
Format option for week day names
```
short = ['Mon', 'Tue', ..., 'Sun']
long = ['Monday', 'Tuesday', ..., 'Sunday']
narrow = ['M', 'T', ..., 'S']
```
>Default `short`
<hr/>

### **`weekdaysShort`** <small><`string[]?`></small>
Custom names for week days
>Default `undefined`
>>⚠️ _This overrides the default localized week day names_
<hr/>
   
### **`weeksContainerStyle`** <small><`ViewStyle?`></small>
`ViewStyle` for parent view component of all week `columns` on the calendar. Useful when you need to apply styling to all weeks in the calendar
> Default `undefined`

## CalendarList Props
`CalendarList` inherits all props of `Calendar` except `contentContainerStyle` & `date` props. It also comes with unique props to help you build performant list of calendars whiles using `@shopify/flashlist` under the hood.

### **`calendarContentContainerStyle`** <small><`ViewStyle?`></small>
`ViewStyle` for each calendar's parent view component. This is same as `contentContentContainerStyle` prop for  `Calendar` component
>Default `undefined`
<hr/>

### **`CalendarSeparator`** <small><`React.ComponentType?`></small>
A component rendered between calendars in the list
>Default `undefined`
>> ⚠️ This overrides `calendarVerticalGap` prop when defined
<hr/>

### **`calendarSize`** <small><`{width?:number, height?: number}?`></small>
Visible width and height of the CalendarList. This is not the scroll content size.
>Default `{ width, height } = Dimensions.get("window")`
<hr/>

### **`calendarVerticalGap`** <small><`number?`></small>
Space (px) between calendars in the list 
>Default `32`
<hr/>

### **`currentDate`** <small><`string?`></small>
Initial date to focus or scroll to when the `CalendarList` mounts
>Default `undefined` Format `YYYY-MM-DD`
>> ⚠️ This prop is not reactive, changing it will not trigger re-render
<hr/>

### **`estimatedCalendarSize`** <small><`number`></small>
Estimated height or width (px) of each calendar when using `vertical` or `horizontal` calendar lists respectively.
>💡 `FlashList` uses this information to decide how many calendar months it needs to draw on the screen before initial load and while scrolling. Since some calendar months have 5 and 6 weeks, you need to find the average or median value and if most calendars are of the same size, just use that number. A quick look at `Element Inspector` can help you determine this. If you're confused between two values, the smaller value is a better choice.
<hr/>

### **`futureMonthsCount`** <small><`number?`></small>
Number of months to render after `minDate`
>Default `12`
<hr/>

### **`horizontal`** <small><`boolean?`></small>
Toggle horizontal scrollable list
>Default `false`
<hr/>

### **`minDate`** <small><`string?`></small>
Date in your `starred` month on the calendar. A `starred` month is the month in calendar list used to determined `past` and `future` months of the list. 

Example: If you need to render daily events 6 months `before` and `after` date `2024-02-10`. Then `2024-02` becomes the `starred` month
>Default `today's date` Format `YYYY-MM-DD`
<hr/>

### **`onScroll`** <small><`((visibleMonths: string[]) => void)?`></small>
Callback for calendar list scroll events; returns array of visible months on the list ordered according to appearance on the list.
>Default `undefined` Format `[YYYY-MM-DD, ...]`
<hr/>

### **`pastMonthsCount`** <small><`number?`></small>
Number of months to render before `minDate`
>Default `0`
<hr/>

### **`showDayNamesOnTop`** <small><`boolean?`></small>
Show week day names on top of list instead of in each calendar
>Default `false`
<hr/>


### **`showScrollIndicator`** <small><`boolean?`></small>
Toggle on scroll indicators for `vertical` calendar list
>Default `true`
<hr/>