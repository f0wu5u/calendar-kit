import { eachMonthOfInterval } from "../../date";

describe("eachDayOfInterval", function () {
  const may05 = new Date("2024-05-05");
  const july05 = new Date("2024-07-05");

  it("should return error if start date is after end date", () => {
    expect(() =>
      eachMonthOfInterval({
        start: july05,
        end: may05,
      }),
    ).toThrow("Invalid date range");
  });

  it("should return first day of each month from 2024-05-05 to 2024-07-05", function () {
    const months = eachMonthOfInterval({ start: may05, end: july05 });
    expect(months).toHaveLength(3);
    expect(months[0]).toStrictEqual("2024-05-01");
    expect(months[months.length - 1]).toStrictEqual("2024-07-01");
  });
});
