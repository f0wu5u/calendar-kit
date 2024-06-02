import { createRange } from "../../date";

describe("createRange", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() =>
      createRange({ startMonth: "2024-05-1", pastMonthsCount: 12 }),
    ).toThrow("Invalid date");
  });

  it("should return default range when past and future counts not provided", function () {
    const startMonth = "2024-01-01";
    const range = createRange({ startMonth });
    expect(range).toHaveLength(13);
    expect(range).toContain(startMonth);
  });

  it("should return a valid range", function () {
    const startMonth = "2024-01-01";
    const range = createRange({
      startMonth,
      pastMonthsCount: 1,
      futureMonthsCount: 1,
    });
    expect(range).toHaveLength(3);
    expect(range).toContain(startMonth);
    expect(range).toContain("2023-12-01");
    expect(range).toContain("2024-02-01");
  });
});
