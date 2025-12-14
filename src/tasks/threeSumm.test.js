// https://leetcode.com/problems/3sum/description/

/**
 * Найти все уникальные тройки чисел, сумма которых равна нулю
 *
 * Задача: Найти все уникальные тройки чисел в массиве nums, такие что nums[i] + nums[j] + nums[k] == 0.
 * Решение не должно содержать дублирующихся троек.
 *
 * Подход (два указателя):
 * 1. Сначала сортируем массив — так проще искать, и можно пропускать повторы.
 * 2. Берём первое число (индекс i) — оно будет "якорем".
 *    - Если оно уже больше нуля — дальше всё будет положительным, сумма не будет нулём → выход.
 *    - Если оно такое же, как предыдущее — пропускаем, чтобы не дублировать тройки.
 * 3. Два других числа ищем двумя указателями:
 *    - left — сразу после i,
 *    - right — в конце массива.
 * 4. Считаем сумму:
 *    - 0? — нашли тройку! Добавляем в результат. Двигаем оба указателя, пропуская одинаковые числа.
 *    - Меньше 0? — нужно больше → двигаем left вправо.
 *    - Больше 0? — нужно меньше → двигаем right влево.
 *
 * Паттерны: #arrays, #two_pointers
 * Сложность: O(n^2)
 *
 * @param {number[]} nums - Массив чисел
 * @return {number[][]} Массив уникальных троек, сумма которых равна нулю
 */

import { expect, test } from "vitest";

var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Пропускаем дубликаты первого числа, чтобы избежать повторяющихся троек
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Если первое число больше нуля, все остальные тоже положительные
    // Сумма трёх положительных чисел не может быть нулём
    if (nums[i] > 0) break;

    // Два указателя для поиска оставшихся двух чисел
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        // Нашли тройку с суммой 0
        result.push([nums[i], nums[left], nums[right]]);

        // Пропускаем дубликаты, чтобы избежать повторяющихся троек
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Двигаем оба указателя
        left++;
        right--;
      } else if (sum < 0) {
        // Сумма слишком мала, нужно увеличить - двигаем left вправо
        left++;
      } else {
        // Сумма слишком велика, нужно уменьшить - двигаем right влево
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
  const unique = new Set(result.map((triplet) => triplet.sort().join(",")));
  expect(unique.size).toBe(result.length);
});
