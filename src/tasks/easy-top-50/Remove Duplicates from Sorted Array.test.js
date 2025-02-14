// https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/727/
// #in_place, #arrays
// Two pointers
import { expect, test } from "vitest";

var removeDuplicates = function (nums = []) {
  let i = 1;

  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i - 1]) {
      nums[i] = nums[j];
      i++;
    }
  }

  return i;
};

test("removeDuplicates", () => {
  expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toEqual(5);
  expect(removeDuplicates([1, 1, 2])).toEqual(2);
});
