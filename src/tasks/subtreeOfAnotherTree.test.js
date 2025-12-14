// https://leetcode.com/problems/subtree-of-another-tree/description/

import { expect, test } from "vitest";

// Определение TreeNode для тестов
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var isSubtree = function (root, subRoot) {
  if (!root) return !subRoot;

  if (isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

function isSameTree(root, subRoot) {
  if (!root && !subRoot) return true;
  if (!root || !subRoot) return false;
  if (root.val !== subRoot.val) return false;

  return (
    isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right)
  );
}

test("Subtree of Another Tree", () => {
  const root = new TreeNode(3, 
    new TreeNode(4, new TreeNode(1), new TreeNode(2)), 
    new TreeNode(5)
  );
  const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));
  
  expect(isSubtree(root, subRoot)).toBe(true);
});

test("Subtree of Another Tree - нет поддерева", () => {
  const root = new TreeNode(3, 
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

