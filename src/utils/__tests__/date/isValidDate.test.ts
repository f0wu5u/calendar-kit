import { isValidDate } from "../../date";

describe("isValidDate", function () {
  it("should return false provided 2024-06-1T00:00:00", function () {
    const validDate = isValidDate(new Date("2024-06-1T00:00:00"));
    expect(validDate).toStrictEqual(false);
  });

  it("should return true provided 2024-06-01", function () {
    const june01 = new Date("2024-06-01");
    expect(isValidDate(june01)).toStrictEqual(true);
  });

  it("should return true provided today's date", function () {
    const today = new Date();
    expect(isValidDate(today)).toStrictEqual(true);
  });

  it("should return true provided 2024/06/01", function () {
    const today = new Date("2024/06/01");
    expect(isValidDate(today)).toStrictEqual(true);
  });
});
