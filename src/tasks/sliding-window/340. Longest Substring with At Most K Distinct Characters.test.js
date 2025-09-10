import { expect, test } from "vitest";

// Найти самую длинную подстроку где только k повторяющихся элемента (!)
function longest(str, k) {
  let left = 0;
  let right = 0;
  let maxLen = 0;
  const map = new Map();

  while (right < str.length) {
    const currChar = str[right];

    map.set(currChar, map.get(currChar) + 1 || 1);

    while (map.size > k) {
      const leftChar = str[left];

      map.set(leftChar, map.get(leftChar) - 1);

      if (map.get(leftChar) === 0) {
        map.delete(leftChar);
      }

      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
    right++;
  }

  return maxLen;
}

test("longest dynamic", () => {
  // Input: s = "eceba", k = 2
  // Output: 3
  // Explanation: T is "ece" which its length is 3.
  expect(longest("eceba", 2)).toBe(3);
  // Input: s = "aa", k = 1
  // Output: 2
  // Explanation: T is "aa" which its length is 2.
  expect(longest("aa", 1)).toBe(2);
});
