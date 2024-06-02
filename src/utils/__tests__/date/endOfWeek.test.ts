import { endOfWeek } from "../../date";
import { getDateString } from "../helpers";

describe("endOfWeek", function () {
  it("should return last day of week of provided 2024-06-05", function () {
    const june05 = new Date("2024-06-05");
    const endDayOfJune05Week = endOfWeek(june05, { weekStartsOn: 0 });
    expect(getDateString(endDayOfJune05Week)).toStrictEqual("2024-06-08");
  });

  it("should return last day of week provided 2024-02-20 and Monday as weekstart", function () {
    const feb20 = new Date("2024-02-20");
    const endDayOfFeb20Week = endOfWeek(feb20, { weekStartsOn: 1 });
    expect(getDateString(endDayOfFeb20Week)).toStrictEqual("2024-02-25");
  });
});
