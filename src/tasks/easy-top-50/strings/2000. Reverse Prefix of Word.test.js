// https://leetcode.com/problems/reverse-prefix-of-word/description/?envType=problem-list-v2&envId=string&
import { expect, test } from "vitest";

/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
  let reversedPrefix = "";

  for (let i = 0; i < word.length; i++) {
    reversedPrefix = word[i] + reversedPrefix;

    if (word[i] === ch) {
      return reversedPrefix + word.slice(i + 1);
    }
  }

  return word;
};

test("reversePrefix", () => {
  expect(reversePrefix("abcdefd", "d")).toEqual("dcbaefd");
  expect(reversePrefix("abcdefd", "1")).toEqual("abcdefd");
});
