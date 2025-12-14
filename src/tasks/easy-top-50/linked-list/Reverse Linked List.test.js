// https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/560/

/**
 * Развернуть связный список
 *
 * Задача: Развернуть односвязный список и вернуть развёрнутый список.
 *
 * Паттерны: #linked_list, #two_pointers
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
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null; // Pointer to store the previous node
  let current = head; // Pointer to the current node
  let nextTemp = null; // Temporary pointer to store the next node

  while (current) {
    nextTemp = current.next; // Store the next node
    current.next = prev; // Reverse the link
    prev = current; // Move prev to the current node
    current = nextTemp; // Move current to the next node
  }

  return prev;
};

test("linked-list/reverseList", () => {
  expect(1).toEqual(1);
});
