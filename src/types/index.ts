export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayState = {
  isVisible: boolean;
  isSelected?: boolean;
  isToday: boolean;
  state: "active" | "inactive";
};

export type InnerDayProps<T> = T &
  DayState & {
    locale?: string;
    day: Date;
  };

export type StateInputParams = {
  markedDates: string[];
  dateString: string;
  minDate?: string;
  maxDate?: string;
  month: Date;
  showExtraDays?: boolean;
};
