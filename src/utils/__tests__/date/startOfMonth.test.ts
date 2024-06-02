import { startOfMonth } from "../../date";
import { getDateString } from "../helpers";

describe("startOfMonth", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => startOfMonth(new Date("2024-06-1T00:00:00"))).toThrow(
      "Invalid date",
    );
  });

  it("should return 2024-06-01 provided 2024-06-25", function () {
    const june25 = new Date("2024-06-25");
    const june1 = startOfMonth(june25);
    expect(getDateString(june1)).toStrictEqual("2024-06-01");
    expect(june1.getUTCDate()).toStrictEqual(1);
    expect(june1.getUTCFullYear()).toStrictEqual(2024);
    expect(june1.getUTCMonth()).toStrictEqual(5); //june month index;
  });
});
