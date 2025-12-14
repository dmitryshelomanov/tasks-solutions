/**
 * Развернуть порядок слов в строке
 *
 * Задача: Развернуть порядок слов в строке. Слова разделены одним или несколькими пробелами.
 *
 * Паттерны: #strings, #two_pointers, #in_place
 */

import { expect, test } from "vitest";

function reverse(left, right, s) {
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}

var reverseWords = function (s) {
  s = s.trim().replace(/\s+/gi, " ").split("");

  let left = 0;
  let right = 0;

  reverse(0, s.length - 1, s);

  while (right < s.length) {
    if (s[right] === " ") {
      reverse(left, right - 1, s);

      left = right + 1;
    }

    right++;
  }

  reverse(left, right, s);

  return s.join("");
};

test("reverseWords", () => {
  expect(reverseWords("the sky is blue")).toEqual("blue is sky the");
});
