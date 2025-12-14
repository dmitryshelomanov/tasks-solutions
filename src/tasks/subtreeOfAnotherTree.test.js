// https://leetcode.com/problems/subtree-of-another-tree/description/

/**
 * Проверить, является ли subRoot поддеревом root
 *
 * Задача: Определить, есть ли в дереве root поддерево, идентичное subRoot.
 * Поддерево означает, что узел и все его потомки должны совпадать с subRoot.
 *
 * Подход:
 * 1. Рекурсивно обходим все узлы дерева root (DFS)
 * 2. Для каждого узла проверяем, идентично ли поддерево начиная с этого узла subRoot
 * 3. Используем вспомогательную функцию isSameTree для проверки идентичности деревьев
 *
 * Паттерны: #tree, #dfs
 * Сложность: O(m * n), где m - количество узлов в root, n - количество узлов в subRoot
 *
 * @param {TreeNode} root - Корневой узел основного дерева
 * @param {TreeNode} subRoot - Корневой узел поддерева для поиска
 * @return {boolean} true, если subRoot является поддеревом root, иначе false
 */

import { expect, test } from "vitest";

// Определение TreeNode для тестов
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var isSubtree = function (root, subRoot) {
  // Базовый случай: если root пуст, subRoot тоже должен быть пуст
  if (!root) return !subRoot;

  // Проверяем, идентично ли текущее поддерево subRoot
  if (isSameTree(root, subRoot)) {
    return true;
  }

  // Рекурсивно проверяем левое и правое поддеревья
  // Если хотя бы одно из них содержит subRoot, возвращаем true
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

/**
 * Проверяет, идентичны ли два дерева
 * @param {TreeNode} root - Корневой узел первого дерева
 * @param {TreeNode} subRoot - Корневой узел второго дерева
 * @return {boolean} true, если деревья идентичны, иначе false
 */
function isSameTree(root, subRoot) {
  // Оба дерева пусты - они идентичны
  if (!root && !subRoot) return true;

  // Одно из деревьев пусто, другое нет - не идентичны
  if (!root || !subRoot) return false;

  // Значения корней не совпадают - деревья не идентичны
  if (root.val !== subRoot.val) return false;

  // Рекурсивно проверяем левые и правые поддеревья
  // Оба должны быть идентичны
  return (
    isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right)
  );
}

test("Subtree of Another Tree", () => {
  const root = new TreeNode(
    3,
    new TreeNode(4, new TreeNode(1), new TreeNode(2)),
    new TreeNode(5)
  );
  const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

  expect(isSubtree(root, subRoot)).toBe(true);
});

test("Subtree of Another Tree - нет поддерева", () => {
  const root = new TreeNode(
    3,
    new TreeNode(4, new TreeNode(1), new TreeNode(2, new TreeNode(0), null)),
    new TreeNode(5)
  );
  const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

  expect(isSubtree(root, subRoot)).toBe(false);
});

test("Subtree of Another Tree - одинаковые деревья", () => {
  const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const subRoot = new TreeNode(1, new TreeNode(2), new TreeNode(3));

  expect(isSubtree(root, subRoot)).toBe(true);
});

test("Subtree of Another Tree - одно узловое дерево", () => {
  const root = new TreeNode(1);
  const subRoot = new TreeNode(1);

  expect(isSubtree(root, subRoot)).toBe(true);
});

test("Subtree of Another Tree - пустое поддерево", () => {
  const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const subRoot = null;

  expect(isSubtree(root, subRoot)).toBe(true);
});
