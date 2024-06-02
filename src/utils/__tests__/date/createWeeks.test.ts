import { createWeeksOfMonth } from "../../date";

describe("createWeeksOfMonth", function () {
  it("should return weeks of June, 2024 given 2024-06-10", function () {
    const june = new Date("2024-06-10");
    const weeksOfJune = createWeeksOfMonth(june, 0);
    const firstWeekOfJune = weeksOfJune[0];
    const lastWeekOfJune = weeksOfJune[weeksOfJune.length - 1];
    expect(firstWeekOfJune).toContain("2024-06-01");
    expect(lastWeekOfJune).toContain("2024-06-30");
    expect(lastWeekOfJune).not.toContain("2024-06-31");

    // check first day of each week to be Sunday = weekStartsOn = 0
    expect(new Date(firstWeekOfJune[0]).toDateString()).toContain("Sun");
    expect(new Date(lastWeekOfJune[0]).toDateString()).toContain("Sun");

    // check last day of each week to be Saturday
    expect(new Date(firstWeekOfJune[6]).toDateString()).toContain("Sat");
    expect(new Date(lastWeekOfJune[6]).toDateString()).toContain("Sat");
  });
});
