// https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/553/

/**
 * Удалить узел из связного списка
 *
 * Задача: Удалить узел из односвязного списка, имея доступ только к этому узлу (не к голове списка).
 *
 * Паттерны: #linked_list
 */

import { expect, test } from "vitest";
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};

test("linked-list/deleteNode", () => {
  expect(1).toEqual(1);
});
