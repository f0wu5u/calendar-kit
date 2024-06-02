import { formatMonthName } from "../../date";
import { monthNames } from "../helpers";

describe("formatMonthName", function () {
  it("should return June 2024", function () {
    const monthName = formatMonthName(new Date("2024-06-05"));
    expect(monthName).toStrictEqual("June 2024");
  });

  it("should return current {month year} format", function () {
    const today = new Date();
    const monthName = formatMonthName(today);
    expect(monthName).toStrictEqual(
      `${monthNames[today.getUTCMonth()]} ${today.getUTCFullYear()}`,
    );
  });
});
