// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/770/

/**
 * Повернуть изображение на 90 градусов по часовой стрелке
 *
 * Задача: Повернуть матрицу n x n на 90 градусов по часовой стрелке на месте.
 *
 * Паттерны: #arrays, #matrix, #in_place
 */

import { expect, test } from "vitest";

var rotate = function (matrix) {
  const n = matrix.length;

  // Step 1: Transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Swap matrix[i][j] with matrix[j][i]
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
};

test("rotate", () => {
  const m1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  expect((rotate(m1), m1)).toEqual([
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);
});
