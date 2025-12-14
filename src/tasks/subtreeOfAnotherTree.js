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
 * Паттерны: #tree, #dfs, #recursion
 * Сложность: O(m * n), где m - количество узлов в root, n - количество узлов в subRoot
 * 
 * @param {TreeNode} root - Корневой узел основного дерева
 * @param {TreeNode} subRoot - Корневой узел поддерева для поиска
 * @return {boolean} true, если subRoot является поддеревом root, иначе false
 */
var isSubtree = function (root, subRoot) {
  if (!root) return !subRoot;

  if (isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

/**
 * Проверяет, идентичны ли два дерева
 * @param {TreeNode} root - Корневой узел первого дерева
 * @param {TreeNode} subRoot - Корневой узел второго дерева
 * @return {boolean} true, если деревья идентичны, иначе false
 */
function isSameTree(root, subRoot) {
  if (!root && !subRoot) return true;
  if (!root || !subRoot) return false;
  if (root.val !== subRoot.val) return false;

  return (
    isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right)
  );
}

