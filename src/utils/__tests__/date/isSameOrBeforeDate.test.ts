import { isSameOrBeforeDate } from "../../date";

describe("isSameOrBeforeDate", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => isSameOrBeforeDate("2024-05-10", "2024-05-2")).toThrow(
      "Invalid date",
    );
  });

  it("should return true provided 2024-06-10 & 2024-06-10", function () {
    const sameOrAfterDate = isSameOrBeforeDate("2024-06-10", "2024-06-10");
    expect(sameOrAfterDate).toStrictEqual(true);
  });

  it("should return true provided 2024-06-10 & 2024-06-24", function () {
    const sameOrAfterDate = isSameOrBeforeDate("2024-06-10", "2024-06-24");
    expect(sameOrAfterDate).toStrictEqual(true);
  });

  it("should return false provided 2023-06-24 & 2024-06-24", function () {
    const sameOrAfterDate = isSameOrBeforeDate("2024-06-24", "2023-06-24");
    expect(sameOrAfterDate).toStrictEqual(false);
  });
});
