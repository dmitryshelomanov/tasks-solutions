// https://leetcode.com/explore/interview/card/top-interview-questions-easy/93/linked-list/603/

/**
 * Удалить n-й узел с конца списка
 *
 * Задача: Удалить n-й узел с конца односвязного списка и вернуть голову списка.
 *
 * Паттерны: #linked_list, #two_pointers
 */

import { expect, test } from "vitest";
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

/*
[1,2,3,4,5], n = 2

1) 

перемещаем head на n

head = [3,4,5,6]
*/
var removeNthFromEnd = function (head, n) {
  let res = new ListNode(0, head);
  let dummy = res;

  for (let i = 0; i < n; i++) {
    head = head.next;
  }

  while (head) {
    head = head.next;
    dummy = dummy.next;
  }

  dummy.next = dummy.next.next;

  return res.next;
};

test("linked-list/removeNthFromEnd", () => {
  expect(1).toEqual(1);
});
