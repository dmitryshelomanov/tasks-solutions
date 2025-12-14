// https://leetcode.com/problems/insert-interval/description/

/**
 * Вставить новый интервал в список непересекающихся интервалов
 *
 * Задача: Вставить newInterval в intervals так, чтобы intervals оставались отсортированными
 * и непересекающимися. Если newInterval пересекается с существующими интервалами, объединить их.
 *
 * Подход:
 * 1. Находим позицию для вставки newInterval
 * 2. Вставляем newInterval в правильную позицию
 * 3. Объединяем пересекающиеся интервалы с помощью функции merge
 *
 * Паттерны: #arrays, #two_pointers
 * Сложность: O(n)
 *
 * @param {number[][]} intervals - Массив непересекающихся интервалов [start, end]
 * @param {number[]} newInterval - Новый интервал [start, end]
 * @return {number[][]} Массив интервалов после вставки и объединения
 */

import { expect, test } from "vitest";

var insert = function (intervals, newInterval) {
  const result = [];
  let placed = false; // Флаг, указывающий, был ли вставлен newInterval

  // Проходим по всем интервалам и вставляем newInterval в правильную позицию
  for (let interval of intervals) {
    // Находим позицию для вставки: когда текущий интервал начинается после newInterval
    if (interval[0] > newInterval[0] && !placed) {
      // Вставляем newInterval перед текущим интервалом
      result.push(newInterval, interval);
      placed = true;
    } else {
      result.push(interval);
    }
  }

  // Если newInterval не был вставлен (он самый большой), добавляем в конец
  if (result.length === intervals.length) {
    result.push(newInterval);
  }

  // Объединяем пересекающиеся интервалы
  return merge(result);
};

/**
 * Объединяет пересекающиеся интервалы
 * @param {number[][]} intervals - Массив интервалов [start, end]
 * @return {number[][]} Массив объединённых непересекающихся интервалов
 */
function merge(intervals) {
  const result = [];
  let currentInterval = intervals[0]; // Текущий интервал для объединения

  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];

    // Если интервалы пересекаются (начало следующего <= конец текущего)
    if (interval[0] <= currentInterval[1]) {
      // Объединяем интервалы, расширяя конец до максимума
      currentInterval[1] = Math.max(currentInterval[1], interval[1]);
    } else {
      // Интервалы не пересекаются, сохраняем текущий и начинаем новый
      result.push(currentInterval);
      currentInterval = interval;
    }
  }

  // Добавляем последний интервал
  result.push(currentInterval);

  return result;
}

test("Insert Interval", () => {
  expect(
    insert(
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5]
    )
  ).toEqual([
    [1, 5],
    [6, 9],
  ]);
});

test("Insert Interval - пустой массив интервалов", () => {
  expect(insert([], [5, 7])).toEqual([[5, 7]]);
});

test("Insert Interval - вставка в конец", () => {
  expect(
    insert(
      [
        [1, 3],
        [6, 9],
      ],
      [10, 12]
    )
  ).toEqual([
    [1, 3],
    [6, 9],
    [10, 12],
  ]);
});

test("Insert Interval - перекрытие нескольких интервалов", () => {
  expect(
    insert(
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      [4, 8]
    )
  ).toEqual([
    [1, 2],
    [3, 10],
    [12, 16],
  ]);
});
