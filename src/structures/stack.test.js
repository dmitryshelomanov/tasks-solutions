import { expect, test } from "vitest";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
  }

  push(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      const tempHead = this.head;

      node.next = tempHead;
      this.head = node;
    }
  }

  pop() {
    const currentHead = this.head;

    if (currentHead) {
      this.head = currentHead.next;

      return currentHead.value;
    }

    return null;
  }
}

function buildStack() {
  const stack = new Stack();

  stack.push("a");
  stack.push("b");
  stack.push("c");
  stack.push("d");

  return stack;
}

test("Stack works ", () => {
  const stack = buildStack();

  expect(stack.pop()).toEqual("d");
  expect(stack.pop()).toEqual("c");
  expect(stack.pop()).toEqual("b");
  expect(stack.pop()).toEqual("a");
  expect(stack.pop()).toEqual(null);
});
