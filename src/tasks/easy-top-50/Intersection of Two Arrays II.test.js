// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/674/

/**
 * Найти пересечение двух массивов
 *
 * Задача: Вернуть массив пересечения двух массивов. Каждый элемент должен появляться столько раз,
 * сколько он встречается в обоих массивах.
 *
 * Паттерны: #arrays, #hashtable
 */

import { expect, test } from "vitest";
var intersect = function (nums1, nums2) {
  const rs = [];
  const map = new Map();

  for (let n of nums1) {
    if (!map.has(n)) {
      map.set(n, 1);
    }
  }

  for (let n of nums2) {
    if (map.has(n)) {
      rs.push(n);
      map.delete(n);
    }
  }

  return rs;
};

test("intersect", () => {
  expect(intersect([3, 1, 2], [1, 1])).toEqual([1]);
  expect(intersect([1, 2, 2, 1], [2])).toEqual([2]);
  expect(intersect([1, 2, 2, 1], [2, 2])).toEqual([2]);
  expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4]);
  expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4]);
});
