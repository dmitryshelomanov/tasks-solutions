import { expect, test } from "vitest";

// https://leetcode.com/problems/fruit-into-baskets/description/

/**
 * @param {number[]} fruits
 * @return {number}
 * Суть в том что мы двигаем указатели в одну сторону с постоянным увеличением
 * 
 * You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:

You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
Given the integer array fruits, return the maximum number of fruits you can pick.
 *
 * #hastable
 */
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
