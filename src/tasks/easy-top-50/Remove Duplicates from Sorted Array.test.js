// https://leetcode.com/explore/featured/card/top-interview-questions-easy/92/array/727/

/**
 * Удалить дубликаты из отсортированного массива
 *
 * Задача: Удалить дубликаты из отсортированного массива на месте и вернуть количество уникальных элементов.
 *
 * Паттерны: #arrays, #in_place, #two_pointers
 */

import { expect, test } from "vitest";

var removeDuplicates = function (nums = []) {
  let left = 1;

  for (let right = 1; right < nums.length; right++) {
    if (nums[right] !== nums[left - 1]) {
      nums[left] = nums[right];
      left++;
    }
  }

  return left;
};

test("removeDuplicates", () => {
  expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toEqual(5);
  expect(removeDuplicates([1, 1, 2])).toEqual(2);
});

/*

left=1 // указывает на место куда мы следующее не повторяющееся число
right=1 // по списку бежит всегда

right (0) === left (0) // skip
right++

left=1 
right=2

right (1) === left (0) //заменяем left на это число
right++
left++




*/
