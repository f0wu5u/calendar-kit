import { dateStringToDate } from "../../date";

describe("dateStringToUTCDate", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => dateStringToDate("2024-05-1")).toThrow("Invalid date");
  });
  it("should return a UTC Date object", () => {
    const utcDate = dateStringToDate("2024-05-01");
    expect(utcDate).toBeInstanceOf(Date);
    expect(utcDate.toUTCString()).toStrictEqual(
      "Wed, 01 May 2024 00:00:00 GMT",
    );
  });
});
