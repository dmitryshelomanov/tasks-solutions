// https://leetcode.com/problems/count-common-words-with-one-occurrence/description/?envType=problem-list-v2&envId=string&
import { expect, test } from "vitest";

/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 * Given two string arrays words1 and words2, return the number of strings that appear exactly once in each of the two arrays
 */
var countWords = function (words1, words2) {
  const map1 = new Map();
  const map2 = new Map();
  let count = 0;

  for (const word of words1) {
    map1.set(word, map1.get(word) + 1 || 1);
  }
  for (const word of words2) {
    map2.set(word, map2.get(word) + 1 || 1);
  }
  for (const word of words1) {
    if (map1.get(word) === 1 && map2.get(word) === 1) count++;
  }

  return count;
};

test("countWords", () => {
  expect(
    countWords(
      ["leetcode", "is", "amazing", "as", "is"],
      ["amazing", "leetcode", "is"]
    )
  ).toEqual(2);
  expect(countWords(["b", "bb", "bbb"], ["a", "aa", "aaa"])).toEqual(0);
  expect(countWords(["a", "ab"], ["a", "a", "a", "ab"])).toEqual(1);
});
