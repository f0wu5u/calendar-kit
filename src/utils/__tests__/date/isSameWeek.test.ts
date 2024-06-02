import { isSameWeek } from "../../date";

describe("isSameWeek", function () {
  const june01 = new Date("2024-06-01");
  const may26 = new Date("2024-05-26");
  const june02 = new Date("2024-06-02");

  it("should return true provided 2024-06-01 & 2024-05-31", function () {
    const sameWeek = isSameWeek(june01, may26, { weekStartsOn: 0 });
    expect(sameWeek).toStrictEqual(true);
  });

  it("should return false provided 2024-06-01 & 2024-05-26", function () {
    const sameWeek = isSameWeek(june01, may26, { weekStartsOn: 1 });
    expect(sameWeek).toStrictEqual(false);
  });

  it("should return true provided 2024-06-02 & 2024-06-01", function () {
    const sameOrAfterDate = isSameWeek(june01, june02, { weekStartsOn: 1 });
    expect(sameOrAfterDate).toStrictEqual(true);
  });

  it("should return false provided 2024-06-02 & 2024-06-01", function () {
    const sameOrAfterDate = isSameWeek(june01, june02, { weekStartsOn: 0 });
    expect(sameOrAfterDate).toStrictEqual(false);
  });
});
