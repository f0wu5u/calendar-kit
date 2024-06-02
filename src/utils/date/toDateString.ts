export const toDateString = (date: Date) => {
  return date.toISOString().split("T")[0];
};
