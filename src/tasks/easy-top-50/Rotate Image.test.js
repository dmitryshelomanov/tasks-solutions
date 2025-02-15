// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/770/
import { expect, test } from "vitest";

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly.
DO NOT allocate another 2D matrix and do the rotation.
 * #arrays, #matrix


Обьяснение

To rotate a matrix by 90 degrees clockwise in-place (without allocating additional 2D memory),
you can achieve this by performing two steps:

Transpose the Matrix : Swap the rows with columns.
Reverse Each Row : Reverse the elements of each row.
This approach ensures that the rotation is done in-place,
modifying the original matrix without using extra space for another 2D array.
 */
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
