---
title: Heap (Куча)
description: Min/max-heap, операции O(log n), Priority Queue и типичные задачи на собеседовании
---

# Heap (Куча)

Heap — бинарное дерево в виде массива, где родитель всегда меньше (min-heap) или больше (max-heap) потомков. Даёт быстрый доступ к экстремуму и вставку/удаление за O(log n).

---

## Свойства

- **Полное бинарное дерево** — уровни заполняются слева направо
- **Heap property** — для min-heap: `parent ≤ children`
- Хранится в массиве: для индекса `i` дети — `2i + 1` и `2i + 2`, родитель — `Math.floor((i - 1) / 2)`

```text
       1
     /   \
    3     2
   / \   /
  7   5 4

массив: [1, 3, 2, 7, 5, 4]
```

---

## Операции и сложность

| Операция | Время | Описание |
|----------|-------|----------|
| peek (min/max) | O(1) | Корень массива |
| insert (push) | O(log n) | В конец + bubble up |
| extract (pop) | O(log n) | Корень ↔ последний + bubble down |
| heapify | O(n) | Построить кучу из массива |
| decrease/increase key | O(log n) | Изменить ключ + восстановить свойство |

Память: O(n).

---

## Реализация (min-heap)

```javascript
class MinHeap {
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this.#bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length <= 1) return this.data.pop();
    const min = this.data[0];
    this.data[0] = this.data.pop();
    this.#bubbleDown(0);
    return min;
  }

  #bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent] <= this.data[i]) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  #bubbleDown(i) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.data[left] < this.data[smallest]) smallest = left;
      if (right < n && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}
```

В JavaScript нет встроенного `PriorityQueue`; на собеседовании часто пишут кучу вручную или используют библиотеку.

---

## Где применять

- **Top-K** — k наибольших/наименьших элементов (heap размера k)
- **Merge K sorted lists** — min-heap из текущих голов
- **Dijkstra / A\*** — priority queue по расстоянию
- **Median stream** — два heap’а (max слева, min справа)
- **Планировщики** — задачи по приоритету

---

## Типичные вопросы и ловушки

1. Чем heap отличается от BST? — BST упорядочен для поиска любого ключа; heap гарантирует только экстремум в корне.
2. Почему `heapify` — O(n), а не O(n log n)? — нижние уровни почти не сдвигаются; сумма высот даёт O(n).
3. Когда max-heap, когда min? — зависит от того, что нужно «наверху» (наибольший приоритет / ближайшая точка).
4. Stable sort через heap? — нет, классический heapsort не стабилен.

---

## Связанные материалы

- [Структуры данных — обзор](./structures) — Array, BST, Graph
- [Паттерны решения задач](../algorithms/algorithm-patterns) — Top-K, Two Heaps
- [Big O нотация](../algorithms/big-o-notation)
