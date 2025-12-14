// https://leetcode.com/problems/insert-interval/description/

import { expect, test } from "vitest";

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

