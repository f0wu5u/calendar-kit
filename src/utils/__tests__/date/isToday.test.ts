import { isToday, toLocaleDateString } from "../../date";

describe("isToday", function () {
  const june01 = "2024-06-01";
  const todayDateString = toLocaleDateString(new Date());

  it("should throw error when invalid date string is provided", function () {
    expect(() => isToday("2024-05-1")).toThrow("Invalid date");
  });

  it("should return false provided 2024-06-01", function () {
    const today = isToday(june01);
    expect(today).toStrictEqual(false);
  });

  it("should return true provided today's date string", function () {
    const today = isToday(todayDateString);
    expect(today).toStrictEqual(true);
  });
});
