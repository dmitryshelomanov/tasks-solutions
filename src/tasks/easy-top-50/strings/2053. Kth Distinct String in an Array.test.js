// https://leetcode.com/problems/kth-distinct-string-in-an-array/description/?envType=problem-list-v2&envId=string&
import { expect, test } from "vitest";

/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 * #strings
 */
var kthDistinct = function (arr, k) {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], (map.get(arr[i]) || 0) + 1);
  }

  let index = 0;

  for (let key of map.keys()) {
    if (map.get(key) === 1) {
      index++;

      if (index === k) {
        return key;
      }
    }
  }

  return "";
};

test("minimumMoves", () => {
  expect(kthDistinct(["d", "b", "c", "b", "c", "a"], 2)).toEqual("a");
  expect(kthDistinct(["aaa", "aa", "a"], 1)).toEqual("aaa");
  expect(kthDistinct(["a", "b", "a"], 3)).toEqual("");
});
