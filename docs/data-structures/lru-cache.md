---
title: LRU Cache
description: Least Recently Used — HashMap + двусвязный список, get/put за O(1)
---

# LRU Cache

LRU (Least Recently Used) — кэш фиксированной ёмкости: при переполнении вытесняется элемент, к которому дольше всего не обращались. Классическая задача на собеседовании и основа многих реальных кэшей.

---

## Требования

- `get(key)` → значение или «промах»; при попадании ключ становится самым свежим
- `put(key, value)` → вставка/обновление; при превышении `capacity` удалить LRU
- Обе операции — **O(1)** среднее

Одного `Map` недостаточно: нужен порядок «свежести». Одного списка — медленный поиск по ключу. Решение: **HashMap + двусвязный список**.

---

## Структура

```text
Map: key → Node

  head ↔ [A] ↔ [B] ↔ [C] ↔ tail
         MRU              LRU

get/put двигают узел к head (MRU).
Вытеснение снимает узел перед tail.
```

- `Map` даёт O(1) доступ к узлу
- Двусвязный список даёт O(1) перенос в начало и удаление с конца
- Sentinel `head` / `tail` упрощают края

---

## Операции и сложность

| Операция | Время | Описание |
|----------|-------|----------|
| get | O(1) | Map + move to front |
| put (update) | O(1) | Обновить value + move to front |
| put (insert) | O(1) | Новый узел; при overflow — remove LRU |
| evict | O(1) | Удалить перед tail + из Map |

Память: O(capacity).

---

## Реализация

```javascript
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    const node = this.map.get(key);
    if (!node) return -1;
    this.#moveToFront(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.#moveToFront(node);
      return;
    }

    const node = new Node(key, value);
    this.map.set(key, node);
    this.#addAfterHead(node);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this.#remove(lru);
      this.map.delete(lru.key);
    }
  }

  #addAfterHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  #remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  #moveToFront(node) {
    this.#remove(node);
    this.#addAfterHead(node);
  }
}
```

Альтернатива в JS: `Map` сохраняет порядок вставки — при `get`/`put` можно `delete` + `set`, а LRU брать как `map.keys().next().value`. На собеседовании чаще ждут явный список.

---

## Где применять

- HTTP / CDN / in-memory кэши (страницы, сессии, объекты)
- LeetCode 146. LRU Cache
- Связка с [стратегиями кэширования](../systedesign/caching-strategies) (TTL, write-through и т.д.)

---

## Типичные вопросы и ловушки

1. Почему не массив? — удаление из середины O(n).
2. LFU vs LRU — LFU по частоте; сложнее (частота + тай-брейк).
3. Потокобезопасность — классический LRU без локов не thread-safe.
4. `capacity === 0` / отрицательный — граничные кейсы на интервью.

---

## Связанные материалы

- [Решение в репозитории](https://github.com/dmitryshelomanov/tasks-solutions/blob/main/src/tasks/146.%20LRU%20Cache.test.js)
- [Linked List в обзоре](./structures#2-linked-list-связный-список)
- [Стратегии кэширования](../systedesign/caching-strategies)
- [Map / Hash Table](./structures#6-map--hash-table-хеш-таблица)
