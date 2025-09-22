/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
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
 * @param {number[][]} intervals
 * @return {number[][]}
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

console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
);

console.log(insert([], [5, 7]));

console.log(
  insert(
    [
      [1, 3],
      [2, 5],
      [6, 9],
    ],
    []
  )
);

console.log(insert([[1, 5]], [2, 7]));
