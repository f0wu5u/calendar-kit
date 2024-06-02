import { endOfMonth } from "../../date";
import { getDateString } from "../helpers";

describe("endOfMonth", function () {
  it("should return last day of month of May provided 2024-05-05", function () {
    const may05 = new Date("2024-05-05");
    const endDayOfMay = endOfMonth(may05);
    expect(getDateString(endDayOfMay)).toStrictEqual("2024-05-31");
  });

  it("should return last day of month of February provided 2024-02-20", function () {
    const feb20 = new Date("2024-02-20");
    const endDayOfFeb = endOfMonth(feb20);
    expect(getDateString(endDayOfFeb)).toStrictEqual("2024-02-29");
  });
});
