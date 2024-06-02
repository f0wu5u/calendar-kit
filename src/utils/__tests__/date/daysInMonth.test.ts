import { getDaysInMonth } from "../../date/daysInMonth";

describe("getDaysInMonth", () => {
  it("should return 30 for June and 31 for July", () => {
    const daysInJune = getDaysInMonth(2024, 6);
    const daysInJuly = getDaysInMonth(2024, 7);

    expect(daysInJune).toStrictEqual(30);
    expect(daysInJuly).toStrictEqual(31);
  });

  it("should return 29 for February in leap year and 28 other years", () => {
    const daysInLeap = getDaysInMonth(2024, 2);
    const daysInNonLeap = getDaysInMonth(2025, 2);

    expect(daysInLeap).toStrictEqual(29);
    expect(daysInNonLeap).toStrictEqual(28);
  });
});
