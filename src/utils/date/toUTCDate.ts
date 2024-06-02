export const toUTCDate = (date: Date) => {
  const utcOffset = getUTCOffsetMinutes(date);
  const newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() + utcOffset);
  return newDate;
};
const getUTCOffsetMinutes = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  return timezoneOffset >= 0 ? timezoneOffset : -timezoneOffset;
};
