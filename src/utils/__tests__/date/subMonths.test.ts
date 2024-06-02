import { subMonths } from "../../date";
import { getDateString } from "../helpers";

describe("subMonths", function () {
  it("should throw error when invalid date string is provided", function () {
    expect(() => subMonths("2024-05-1", 2)).toThrow("Invalid date");
  });

  it("should return a valid date", function () {
    const firstNovember2023 = subMonths("2024-01-01", 2);
    expect(getDateString(firstNovember2023)).toStrictEqual("2023-11-01");
  });

  it("should enforce absolute months value when negative months provided", function () {
    const firstNovember2023 = subMonths("2024-01-01", -2);
    expect(getDateString(firstNovember2023)).toStrictEqual("2023-11-01");
  });
});
