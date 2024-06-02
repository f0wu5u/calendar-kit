import { isSameMonth } from "../../date";

describe("isSameMonth", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => isSameMonth("2024-05-1", new Date())).toThrow("Invalid date");
  });
  it("should return true provided 2024-06-10 & 2024-06-24", function () {
    const june05 = new Date("2024-06-10");
    const sameMonth = isSameMonth("2024-06-24", june05);
    expect(sameMonth).toStrictEqual(true);
  });

  it("should return false provided 2023-06-10 & 2024-06-24", function () {
    const june05 = new Date("2023-06-10");
    const sameMonth = isSameMonth("2024-06-24", june05);
    expect(sameMonth).toStrictEqual(false);
  });
});
