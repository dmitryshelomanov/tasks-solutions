// https://leetcode.com/problems/lru-cache/description/

import { expect, test } from "vitest";

// Копируем реализацию из исходного файла для тестирования
function Node(val) {
  this.value = val;
  this.next = null;
  this.prev = null;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

LinkedList.prototype.add = function (val) {
  const node = new Node(val);

  if (!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  this.size++;
  return node;
};

LinkedList.prototype.remove = function (node) {
  if (node.prev) {
    node.prev.next = node.next;
  } else {
    this.head = node.next;
  }

  if (node.next) {
    node.next.prev = node.prev;
  } else {
    this.tail = node.prev;
  }

  this.size--;
};

LinkedList.prototype.pop = function () {
  if (!this.head) return null;

  const head = this.head;

  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = head.next;
    this.head.prev = null;
  }

  this.size--;
  return head.value;
};

var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.tree = new LinkedList();
  this.map = new Map();
};

LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;

  const node = this.map.get(key);

  this.tree.remove(node);
  const newNode = this.tree.add(node.value);
  this.map.set(key, newNode);

  return node.value.value;
};

LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    const node = this.map.get(key);

    this.tree.remove(node);
    this.tree.add({ key, value });
    this.map.set(key, this.tree.tail);
    return;
  }

  if (this.tree.size >= this.capacity) {
    const oldNode = this.tree.pop();

    this.map.delete(oldNode.key);
  }

  const node = this.tree.add({ key, value });

  this.map.set(key, node);
};

test("LRU Cache", () => {
  const lru = new LRUCache(2);

  lru.put(1, 1);
  lru.put(2, 2);
  expect(lru.get(1)).toBe(1);

  lru.put(3, 3);
  expect(lru.get(2)).toBe(-1);

  lru.put(4, 4);
  expect(lru.get(1)).toBe(-1);
  expect(lru.get(3)).toBe(3);
  expect(lru.get(4)).toBe(4);
});

test("LRU Cache - обновление существующего ключа", () => {
  const lru = new LRUCache(2);

  lru.put(1, 1);
  lru.put(2, 2);
  lru.put(2, 3);
  expect(lru.get(2)).toBe(3);
});

test("LRU Cache - ёмкость 1", () => {
  const lru = new LRUCache(1);

  lru.put(1, 1);
  expect(lru.get(1)).toBe(1);

  lru.put(2, 2);
  expect(lru.get(1)).toBe(-1);
  expect(lru.get(2)).toBe(2);
});

