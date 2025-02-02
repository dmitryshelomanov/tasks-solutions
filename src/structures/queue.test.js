import { expect, test } from "vitest";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Начинаем с того что создаем из первой коды head & tail
// Далее мы пушим в tail.next новую ноду и заменяем tail на новую ноду
// За счет ссылок первая нода получит некст и так далее
// Читаем новы с головы
// Берем head и заменяем его на head.next
class Queue {
  constructor() {
    this.tail = null;
    this.head = null;
    this.length = 0;
  }

  enqueue = (value) => {
    const node = new Node(value);

    if (this.head && this.tail) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.length += 1;
  };

  dequeue = () => {
    if (!this.head) {
      return null;
    }

    const currentHead = this.head;

    this.head = currentHead.next ?? null;

    this.length -= 1;

    return currentHead.value;
  };

  *[Symbol.iterator]() {
    let currentHead = this.head;

    while (currentHead) {
      yield currentHead.value;
      currentHead = currentHead.next;
    }
  }
}

function buildQueue() {
  const queue = new Queue();

  queue.enqueue("a");
  queue.enqueue("b");
  queue.enqueue("c");
  queue.enqueue("d");

  return queue;
}

test("Dequeue works ", () => {
  const queue = buildQueue();

  expect(Array.from(queue)).toEqual(["a", "b", "c", "d"]);
});
