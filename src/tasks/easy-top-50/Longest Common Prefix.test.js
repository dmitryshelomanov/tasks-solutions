// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/887/

/**
 * Найти самый длинный общий префикс
 *
 * Задача: Найти самый длинный общий префикс среди массива строк. Если общего префикса нет, вернуть пустую строку.
 *
 * Паттерны: #strings
 */

import { expect, test } from "vitest";
var longestCommonPrefix = function (strs) {
  const first = strs[0];
  let prefix = "";

  for (let i = 0; i < first.length; i++) {
    const everyHasPrefix = strs.every((s) => s[i] === first[i]);

    if (everyHasPrefix) {
      prefix += first[i];
    } else {
      return prefix;
    }
  }

  return prefix;
};

test("longestCommonPrefix", () => {
  expect(longestCommonPrefix(["dog", "tee", "tee"])).toEqual("");
  expect(longestCommonPrefix(["flower", "flow", "flight"])).toEqual("fl");
});
