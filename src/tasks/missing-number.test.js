import { expect, test } from "vitest";

function t(nums) {
  if (nums.length === 0) return 0;

  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    result += nums[i] - i;
  }

  return nums.length - result;
}

test("Missing Number", () => {
  expect(t([3, 0, 1])).toEqual(2);
  expect(t([0, 1])).toEqual(2);
  expect(t([9, 6, 4, 2, 3, 5, 7, 0, 1])).toEqual(8);
});
