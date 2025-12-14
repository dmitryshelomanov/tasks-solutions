// https://leetcode.com/problems/fruit-into-baskets/description/

/**
 * Собрать максимальное количество фруктов
 *
 * Задача: У вас есть два корзины, каждая может содержать только один тип фрукта.
 * Найти максимальное количество фруктов, которое можно собрать, начиная с любого дерева.
 *
 * Паттерны: #arrays, #sliding_window, #hashtable
 */

import { expect, test } from "vitest";
function totalFruit(fruits) {
  let left = 0;
  let right = 0;
  let maxCount = 0;
  let basketCount = 2;
  const map = new Map();

  while (right < fruits.length) {
    map.set(fruits[right], (map.get(fruits[right]) ?? 0) + 1);

    if (map.size > basketCount) {
      map.set(fruits[left], map.get(fruits[left]) - 1);

      if (map.get(fruits[left]) === 0) {
        map.delete(fruits[left]);
      }

      left += 1;
    }

    // Формула расчета окна
    maxCount = Math.max(maxCount, right - left + 1);
    right += 1;
  }

  return maxCount;
}

test("fruit-into-baskets", () => {
  // Input: fruits = [1,2,1]
  // Output: 3
  // Explanation: We can pick from all 3 trees.
  expect(totalFruit([1, 2, 1])).toEqual(3);
  // Input: fruits = [0,1,2,2]
  // Output: 3
  // Explanation: We can pick from trees [1,2,2].
  // If we had started at the first tree, we would only pick from trees [0,1].
  expect(totalFruit([0, 1, 2, 2])).toEqual(3);
  // Input: fruits = [1,2,3,2,2]
  // Output: 4
  // Explanation: We can pick from trees [2,3,2,2].
  // If we had started at the first tree, we would only pick from trees [1,2].
  expect(totalFruit([1, 1, 1, 1, 1, 1, 2, 3, 2, 2])).toEqual(7);
  expect(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4])).toEqual(5);
});
