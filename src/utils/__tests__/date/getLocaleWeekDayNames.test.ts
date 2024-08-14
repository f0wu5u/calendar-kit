import { getLocaleWeekDayNames } from "../../date/getLocaleWeekDayNames";

describe("getLocaleWeekDayNames", () => {
  describe("en-US locale", () => {
    const locale = "en-US";
    it("should return long week day names", function () {
      const results = getLocaleWeekDayNames(locale, "long");
      expect(results).toContain("Monday");
      expect(results).toContain("Tuesday");
    });
    it("should return short week day names", function () {
      const results = getLocaleWeekDayNames(locale, "short");
      expect(results).toContain("Mon");
      expect(results).toContain("Tue");
    });
    it("should return narrow week day names", function () {
      const results = getLocaleWeekDayNames(locale, "narrow");
      expect(results).toContain("M");
      expect(results).toContain("T");
    });
  });

  describe("ar-AR locale", () => {
    const locale = "ar-AR";
    it("should return long week day names", function () {
      const results = getLocaleWeekDayNames(locale, "long");
      expect(results).toContain("السبت");
      expect(results).toContain("الجمعة");
    });
    it("should return short week day names", function () {
      const results = getLocaleWeekDayNames(locale, "short");
      expect(results).toContain("الخميس");
      expect(results).toContain("الجمعة");
    });
    it("should return narrow week day names", function () {
      const results = getLocaleWeekDayNames(locale, "narrow");
      expect(results).toContain("خ");
      expect(results).toContain("ج");
    });
  });
});
