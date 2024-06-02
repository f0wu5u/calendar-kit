import { startOfWeek } from "../../date";
import { getDateString } from "../helpers";

describe("startOfWeek", function () {
  it("should return first day of week of provided 2024-06-05", function () {
    const june05 = new Date("2024-06-05");
    const startDayOfJune05Week = startOfWeek(june05, { weekStartsOn: 0 });
    expect(getDateString(startDayOfJune05Week)).toStrictEqual("2024-06-02");
    expect(startDayOfJune05Week.toDateString()).toContain("Sun"); // weekstarts on sunday
  });

  it("should return first day of week provided 2024-02-20 and Monday as weekstart", function () {
    const feb20 = new Date("2024-02-20");
    const startDayOfFeb20Week = startOfWeek(feb20, { weekStartsOn: 1 });
    expect(getDateString(startDayOfFeb20Week)).toStrictEqual("2024-02-19");
    expect(startDayOfFeb20Week.toDateString()).toContain("Mon"); // weekstarts on monday
  });
});
