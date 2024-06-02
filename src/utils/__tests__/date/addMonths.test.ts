import { addMonths } from "../../date";

describe("addMonths", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => addMonths("2024-05-1", 2)).toThrow("Invalid date");
  });

  it("should return a valid date", function () {
    const firstMarch2024 = addMonths("2024-01-01", 2);
    expect(firstMarch2024.toISOString().split("T")[0]).toStrictEqual(
      "2024-03-01",
    );
  });

  it("should enforce absolute months value when negative months provided", function () {
    const firstMarch2024 = addMonths("2024-01-01", -2);
    expect(firstMarch2024.toISOString().split("T")[0]).toStrictEqual(
      "2024-03-01",
    );
  });
});
