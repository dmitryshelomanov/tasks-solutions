/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  if (!root) return !subRoot;

  if (isSameTree(root, subRoot)) {
    return true;
  }

  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(root, subRoot) {
  if (!root && !subRoot) return true;
  if (!root || !subRoot) return false;
  if (root.val !== subRoot.val) return false;

  return (
    isSameTree(root.left, subRoot.left) && isSameTree(root.right, subRoot.right)
  );
}

// Решение
// 1) Обойти все узлы дерева root.
// 2) Для каждого узла, у которого значение совпадает с subRoot.val, проверить, идентичны ли поддеревья.
// 3) Если хотя бы одно поддерево идентично — вернуть true.
// 4) Если ни одно не подошло — вернуть false.
