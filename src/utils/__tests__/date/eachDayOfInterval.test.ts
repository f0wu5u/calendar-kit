import { eachDayOfInterval } from "../../date";

describe("eachDayOfInterval", function () {
  const may01 = new Date("2024-05-01");
  const may10 = new Date("2024-05-10");

  it("should return error if start date is after end date", () => {
    expect(() =>
      eachDayOfInterval({
        start: may10,
        end: may01,
      }),
    ).toThrow("Invalid date range");
  });

  it("should return dates of all days from 2024-05-01 to 2024-05-10", function () {
    const days = eachDayOfInterval({ start: may01, end: may10 });
    expect(days).toHaveLength(10);
    expect(days[0]).toStrictEqual(may01);
    expect(days[days.length - 1]).toStrictEqual(may10);
  });
});
