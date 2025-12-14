// https://leetcode.com/problems/3sum/description/

import { expect, test } from "vitest";

var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
};

test("3Sum", () => {
  const result = threeSum([-1, 0, 1, 2, -1, -4]);
  // Результат может быть в любом порядке, но должен содержать уникальные тройки
  expect(result.length).toBe(2);
  expect(result).toEqual(
    expect.arrayContaining([
      expect.arrayContaining([-1, -1, 2]),
      expect.arrayContaining([-1, 0, 1]),
    ])
  );
});

test("3Sum - нет решений", () => {
  expect(threeSum([0, 1, 1])).toEqual([]);
});

test("3Sum - один элемент", () => {
  expect(threeSum([0])).toEqual([]);
});

test("3Sum - пустой массив", () => {
  expect(threeSum([])).toEqual([]);
});

test("3Sum - только нули", () => {
  expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
});

test("3Sum - дубликаты", () => {
  const result = threeSum([-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]);
  // Проверяем, что нет дублирующихся троек
  const unique = new Set(result.map(triplet => triplet.sort().join(",")));
  expect(unique.size).toBe(result.length);
});

