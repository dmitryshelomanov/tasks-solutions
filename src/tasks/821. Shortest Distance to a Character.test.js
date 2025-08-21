import { expect, test } from "vitest";

/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
  const n = s.length;
  const answer = new Array(n).fill(Infinity);

  let prev = -Infinity;

  for (let i = 0; i < n; i++) {
    if (s[i] === c) {
      prev = i;
    }
    answer[i] = i - prev;
  }

  prev = +Infinity;

  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === c) {
      prev = i;
    }
    answer[i] = Math.min(answer[i], prev - i);
  }

  return answer;
};

test("shortestToChar", () => {
  // Input: s = "loveleetcode", c = "e"
  // Output: [3,2,1,0,1,0,0,1,2,2,1,0]
  // Explanation: The character 'e' appears at indices 3, 5, 6, and 11 (0-indexed).
  // The closest occurrence of 'e' for index 0 is at index 3, so the distance is abs(0 - 3) = 3.
  // The closest occurrence of 'e' for index 1 is at index 3, so the distance is abs(1 - 3) = 2.
  // For index 4, there is a tie between the 'e' at index 3 and the 'e' at index 5, but the distance is still the same: abs(4 - 3) == abs(4 - 5) = 1.
  // The closest occurrence of 'e' for index 8 is at index 6, so the distance is abs(8 - 6) = 2.

  expect(shortestToChar("loveleetcode", "e")).toEqual([
    3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0,
  ]);

  // Example 2:

  // Input: s = "aaab", c = "b"
  // Output: [3,2,1,0]

  expect(shortestToChar("aaab", "b")).toEqual([3, 2, 1, 0]);
});
