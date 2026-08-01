---
title: Union-Find (DSU)
description: Disjoint Set Union — path compression, union by rank и задачи на компоненты связности
---

# Union-Find (Disjoint Set Union)

Union-Find (DSU) — структура для множества непересекающихся множеств: быстро отвечает, в одном ли множестве два элемента (`find`), и объединяет множества (`union`). Классика для компонент связности, Kruskal и «число островов»-подобных задач.

---

## Идея

Каждое множество — дерево; корень — представитель (parent самого себя).

```text
до union(1, 2):     после union(1, 2):

  0   1   2            0     1
                       |    /
                       |   2
```

`find(x)` поднимается к корню. `union(a, b)` связывает корни двух деревьев.

---

## Оптимизации

### Path compression

При `find` все узлы на пути вешают напрямую на корень — следующие запросы почти O(1).

### Union by rank / size

Подвешиваем меньшее дерево к большему (по высоте `rank` или по `size`) — деревья остаются плоскими.

С обеими оптимизациями амортизированная сложность почти O(α(n)) — обратная функция Аккермана, на практике константа.

---

## Операции и сложность

| Операция | Без оптимизаций | С path compression + rank |
|----------|-----------------|---------------------------|
| find | O(n) | ~O(α(n)) |
| union | O(n) | ~O(α(n)) |
| connected | O(n) | ~O(α(n)) |

Память: O(n).

---

## Реализация

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // path compression
    }
    return this.parent[x];
  }

  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);
    if (ra === rb) return false;

    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    if (this.rank[ra] === this.rank[rb]) this.rank[ra] += 1;

    this.components -= 1;
    return true;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}

// Пример: число компонент после рёбер
const uf = new UnionFind(4);
uf.union(0, 1);
uf.union(1, 2);
uf.connected(0, 2); // true
uf.components;      // 2  ( {0,1,2} и {3} )
```

---

## Где применять

- Число связных компонент / «redundant connection»
- Kruskal (MST) — добавлять ребро, если вершины ещё не в одном множестве
- Задачи «друг друзей», аккаунты с общими email
- Динамическая связность без полного пересчёта BFS/DFS

Связка с графами: DSU отвечает на «в одной ли компоненте?» без явного обхода; BFS/DFS нужны, когда важны путь, уровни или веса.

---

## Типичные вопросы и ловушки

1. Зачем rank, если есть path compression? — вместе дают лучшую оценку; на практике оба дёшевы.
2. Итеративный find vs рекурсивный — оба ок; рекурсия с compression короче.
3. Индексация — часто вершины 0…n−1; для произвольных id — `Map`.
4. `union` вернул `false` — ребро внутри компоненты (цикл в undirected-графе при построении леса).

---

## Связанные материалы

- [Структуры данных — Graph](./structures#8-graph-граф)
- [Паттерны решения задач](../algorithms/algorithm-patterns)
- [Heap](./heap) — для Dijkstra / Priority Queue рядом с графовыми задачами
