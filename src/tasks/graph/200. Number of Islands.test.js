// https://leetcode.com/problems/number-of-islands/description/

/**
 * Найти количество островов в матрице
 *
 * Задача: Дана матрица grid, где 0 — вода, 1 — суша.
 * Остров — связная группа клеток 1 (4 направления: вверх/вниз/влево/вправо,
 * диагональ не считается). Вернуть число островов.
 *
 * Паттерны: #matrix, #graph, #dfs
 */

import { expect, test } from "vitest";

var numIslands = function (grid = [[0]]) {
  if (!grid.length || !grid[0].length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 1) continue;

      count++;
      const stack = [[r, c]];
      grid[r][c] = 0;

      // затапливаем остров циклом вместо рекурсии
      // затапливаем - тут образно, те можно было бы использовать мапу для посещений
      // но можно сделать все в массиве
      while (stack.length) {
        const [x, y] = stack.pop();

        for (const [dx, dy] of dirs) {
          const nx = x + dx;
          const ny = y + dy;
          const notInBounds = nx < 0 || ny < 0 || nx >= rows || ny >= cols;

          if (notInBounds) continue;
          if (grid[nx][ny] !== 1) continue;

          grid[nx][ny] = 0;
          stack.push([nx, ny]);
        }
      }
    }
  }

  return count;
};

const oneIsland = [
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
];

const twoIslands = [
  [1, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 1, 1],
];

const threeIslands = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];

const allWater = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const allLand = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

const singleCell = [[1]];

const diagonalIslands = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

test("number of islands", () => {
  expect(numIslands(oneIsland)).toBe(1);
  expect(numIslands(twoIslands)).toBe(2);
  expect(numIslands(threeIslands)).toBe(3);
  expect(numIslands(allWater)).toBe(0);
  expect(numIslands(allLand)).toBe(1);
  expect(numIslands(singleCell)).toBe(1);
  expect(numIslands([])).toBe(0);
  expect(numIslands(diagonalIslands)).toBe(3);
});
