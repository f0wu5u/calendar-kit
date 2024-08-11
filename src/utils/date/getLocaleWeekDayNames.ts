export const getLocaleWeekDayNames = (
  locale: string,
  format: "long" | "short" | "narrow" = "short",
) => {
  const weekDayNames = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, i);
    const weekDayName = date.toLocaleDateString(locale, {
      weekday: format,
    });
    weekDayNames.push(weekDayName);
  }
  return weekDayNames;
};
