import { toLocaleDateString } from "@fowusu/calendar-kit";
import { addDays, isBefore, isSameDay } from "date-fns";

export const today = new Date();

export const todayDateString = toLocaleDateString(today);
export const dateRangeStart = toLocaleDateString(addDays(today, 120));
export const dateRangeEnd = toLocaleDateString(addDays(today, 127));

export const isSameOrBeforeDate = (date: string, dateToCompare: string) => {
  return isSameDay(date, dateToCompare) || isBefore(date, dateToCompare);
};

export const locales = [
  "af-ZA",
  "ar",
  "bg-BG",
  "ca-AD",
  "cs-CZ",
  "cy-GB",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-US",
  "es-ES",
  "et-EE",
  "eu",
  "fa-IR",
  "fi-FI",
  "fr-FR",
  "gl-GL",
  "he-IL",
  "hi-IN",
  "hr-HR",
  "hu-HU",
  "id-ID",
  "is-IS",
  "it-IT",
  "ja-JP",
  "km-KH",
  "ko-KR",
  "la",
  "lt-LT",
  "lv-LV",
  "mn-MN",
  "nb-NO",
  "nl-NL",
  "nn-NO",
  "pa-PK",
  "pl-PL",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "sk-SK",
  "sl-SI",
  "sr-RS",
  "sv-SE",
  "th-TH",
  "tr-TR",
  "uk-UA",
  "vi-VN",
  "zh-CN",
];

export const defaultDayStyles = {
  containerStyle: undefined,
  textStyle: undefined,
};
