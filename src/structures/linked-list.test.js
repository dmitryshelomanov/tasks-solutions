import { expect, test } from "vitest";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Начинаем с того что создаем из первой ноды head & tail
// Далее мы пушим в tail.next новую ноду и заменяем tail на новую ноду
// За счет ссылок первая нода получит некст и так далее
// Читаем ноды с головы (!)
// Берем head и заменяем его на head.next
class LinkedList {
  constructor() {
    this.tail = null;
    this.head = null;
    this.size = 0;
  }

  add = (value) => {
    const node = new Node(value);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size += 1;
  };

  insertToIndex = (value, index) => {
    if (this.size < index) {
      return -1;
    }

    if (this.size === 0) {
      this.add(value);
      return this.size;
    }

    const node = new Node(value);

    let currentIndex = 0;
    let prevNode = null;
    let currentNode = this.head;

    while (currentIndex < index) {
      currentIndex += 1;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    prevNode.next = node;
    node.next = currentNode;
    this.size += 1;
  };

  removeByIndex = (index) => {
    let currentIndex = 0;
    let prevNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (currentIndex === index) {
        prevNode.next = currentNode.next;
        this.size -= 1;

        return index;
      }

      currentIndex += 1;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    return -1;
  };

  remove = (value) => {
    let prevNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        prevNode.next = currentNode.next;
        this.size -= 1;

        return;
      }

      prevNode = currentNode;
      currentNode = currentNode.next;
    }
  };

  indexOf = (value) => {
    let index = 0;
    let currentHead = this.head;

    while (currentHead) {
      if (currentHead.value === value) {
        return index;
      }

      currentHead = currentHead.next;
      index += 1;
    }

    return -1;
  };
}

function buildList() {
  const list = new LinkedList();

  list.add("A");
  list.add("B");
  list.add("C");
  list.add("D");

  return list;
}

test("Linked list works ", () => {
  const list = buildList();

  expect(list.indexOf("A")).toBe(0);
  expect(list.indexOf("B")).toBe(1);
  expect(list.indexOf("C")).toBe(2);
  expect(list.indexOf("D")).toBe(3);
  expect(list.size).toBe(4);

  list.remove("C");
  expect(list.size).toBe(3);
  expect(list.indexOf("A")).toBe(0);
  expect(list.indexOf("B")).toBe(1);
  expect(list.indexOf("C")).toBe(-1);
  expect(list.indexOf("D")).toBe(2);

  list.add("E");
  expect(list.size).toBe(4);
  expect(list.indexOf("A")).toBe(0);
  expect(list.indexOf("B")).toBe(1);
  expect(list.indexOf("C")).toBe(-1);
  expect(list.indexOf("D")).toBe(2);
  expect(list.indexOf("E")).toBe(3);

  list.insertToIndex("F", 3);
  expect(list.size).toBe(5);
  expect(list.indexOf("A")).toBe(0);
  expect(list.indexOf("B")).toBe(1);
  expect(list.indexOf("C")).toBe(-1);
  expect(list.indexOf("D")).toBe(2);
  expect(list.indexOf("E")).toBe(4);
  expect(list.indexOf("F")).toBe(3);

  list.removeByIndex(4);
  expect(list.size).toBe(4);
  expect(list.indexOf("A")).toBe(0);
  expect(list.indexOf("B")).toBe(1);
  expect(list.indexOf("C")).toBe(-1);
  expect(list.indexOf("D")).toBe(2);
  expect(list.indexOf("E")).toBe(-1);
  expect(list.indexOf("F")).toBe(3);
});
