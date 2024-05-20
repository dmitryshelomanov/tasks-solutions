import { expect, test } from "vitest";

// Дан массив интервалов, где intervals[i] = [start, end],
// объедините все пересекающиеся интервалы и верните массив непересекающихся интервалов.

function t(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

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

test("Interval", () => {
  expect(
    t([
      [2, 6],
      [1, 3],
      [2, 8],
      [8, 10],
      [15, 18],
    ])
  ).toEqual([
    [1, 10],
    [15, 18],
  ]);
  expect(
    t([
      [1, 3],
      [2, 10],
      [8, 12],
    ])
  ).toEqual([[1, 12]]);

  expect(
    t([
      [1, 10],
      [2, 9],
    ])
  ).toEqual([[1, 10]]);

  expect(
    t([
      [1, 10],
      [2, 15],
    ])
  ).toEqual([[1, 15]]);
});
