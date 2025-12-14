// https://leetcode.com/problems/length-of-last-word/description/?envType=problem-list-v2&envId=string&

/**
 * Найти длину последнего слова
 *
 * Задача: Вернуть длину последнего слова в строке. Слово - это максимальная подстрока без пробелов.
 *
 * Паттерны: #strings
 */

import { expect, test } from "vitest";
var lengthOfLastWord = function (s) {
  let count = 0;
  let i = s.length - 1;

  while (i >= 0 && s[i] === " ") {
    i--;
  }

  while (i >= 0 && s[i] !== " ") {
    count++;
    i--;
  }

  return count;
};

test("lengthOfLastWord", () => {
  expect(lengthOfLastWord("a b c d")).toEqual(1);
  expect(lengthOfLastWord("Hello World")).toEqual(5);
  expect(lengthOfLastWord("a b c dd")).toEqual(2);
  expect(lengthOfLastWord("   a b c dd     ")).toEqual(2);
  expect(lengthOfLastWord("hhhhh   hh")).toEqual(2);
  expect(lengthOfLastWord("hhhhh hh ")).toEqual(2);
});
