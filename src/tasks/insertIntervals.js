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
 * Паттерны: #intervals, #merge_intervals, #arrays
 * Сложность: O(n)
 * 
 * @param {number[][]} intervals - Массив непересекающихся интервалов [start, end]
 * @param {number[]} newInterval - Новый интервал [start, end]
 * @return {number[][]} Массив интервалов после вставки и объединения
 */
var insert = function (intervals, newInterval) {
  const result = [];
  let placed = false;

  for (let interval of intervals) {
    if (interval[0] > newInterval[0] && !placed) {
      result.push(newInterval, interval);
      placed = true;
    } else {
      result.push(interval);
    }
  }

  if (result.length === intervals.length) {
    result.push(newInterval);
  }

  return merge(result);
};

/**
 * Объединяет пересекающиеся интервалы
 * @param {number[][]} intervals - Массив интервалов [start, end]
 * @return {number[][]} Массив объединённых непересекающихся интервалов
 */
function merge(intervals) {
  const result = [];
  let currentInterval = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];

    if (interval[0] <= currentInterval[1]) {
      currentInterval[1] = Math.max(currentInterval[1], interval[1]);
    } else {
      result.push(currentInterval);
      currentInterval = interval;
    }
  }

  result.push(currentInterval);

  return result;
}

