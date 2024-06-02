import { isSameOrAfterDate } from "../../date";

describe("isSameOrAfterDate", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => isSameOrAfterDate("2024-05-1", "2024-05-20")).toThrow(
      "Invalid date",
    );
  });

  it("should return true provided 2024-06-10 & 2024-06-10", function () {
    const sameOrAfterDate = isSameOrAfterDate("2024-06-10", "2024-06-10");
    expect(sameOrAfterDate).toStrictEqual(true);
  });

  it("should return true provided 2024-06-10 & 2024-06-24", function () {
    const sameOrAfterDate = isSameOrAfterDate("2024-06-24", "2024-06-10");
    expect(sameOrAfterDate).toStrictEqual(true);
  });

  it("should return false provided 2023-06-24 & 2024-06-24", function () {
    const sameOrAfterDate = isSameOrAfterDate("2023-06-24", "2024-06-24");
    expect(sameOrAfterDate).toStrictEqual(false);
  });
});
