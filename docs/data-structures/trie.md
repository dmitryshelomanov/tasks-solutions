---
title: Trie (Префиксное дерево)
description: Prefix tree — insert, search, startsWith и use-cases вроде autocomplete
---

# Trie (Префиксное дерево)

Trie — дерево, где каждый путь от корня к узлу задаёт префикс строки. Узлы хранят символы (или рёбра по символам), а не целые ключи целиком. Удобен для словарей, autocomplete и поиска по префиксу.

---

## Идея

```text
слова: cat, car, dog

      root
     /    \
    c      d
    |      |
    a      o
   / \     |
  t*  r*   g*
```

`*` — конец слова (`isEnd = true`). Общий префикс `ca` у `cat` и `car` занимает один путь.

---

## Операции и сложность

Пусть `L` — длина слова, `Σ` — размер алфавита.

| Операция | Время | Описание |
|----------|-------|----------|
| insert | O(L) | Пройти/создать узлы по символам |
| search | O(L) | Полное совпадение + `isEnd` |
| startsWith | O(L) | Есть ли путь для префикса |
| delete | O(L) | Снять `isEnd` / подчистить узлы |

Память: O(сумма длин всех слов) в худшем случае; на практике меньше за счёт общих префиксов. Каждый узел может держать до `|Σ|` детей (объект/`Map`/массив).

---

## Реализация

```javascript
class TrieNode {
  constructor() {
    this.children = Object.create(null);
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this.#walk(word);
    return Boolean(node && node.isEnd);
  }

  startsWith(prefix) {
    return this.#walk(prefix) !== null;
  }

  #walk(s) {
    let node = this.root;
    for (const ch of s) {
      node = node.children[ch];
      if (!node) return null;
    }
    return node;
  }
}

const trie = new Trie();
trie.insert('cat');
trie.insert('car');
trie.search('cat');      // true
trie.search('ca');       // false
trie.startsWith('ca');   // true
```

Для autocomplete из узла префикса делают DFS/BFS и собирают все слова с `isEnd`.

---

## Где применять

- Autocomplete / typeahead
- Spell-check и словари
- IP-routing (префиксы), иногда — поиск по шаблону
- Задачи LeetCode: Implement Trie, Word Search II, Replace Words

---

## Типичные вопросы и ловушки

1. Trie vs HashMap всех слов? — Map: точный lookup O(L) в среднем, но префиксный поиск дороже; Trie заточен под префиксы и общие корни.
2. Как хранить детей? — объект, `Map`, или массив длины 26 для `a–z`.
3. Unicode / большой алфавит — объект/`Map` лучше фиксированного массива.
4. Память — главный минус; сжатые варианты (radix tree) экономят узлы на длинных уникальных суффиксах.

---

## Связанные материалы

- [Структуры данных — обзор](./structures)
- [Паттерны решения задач](../algorithms/algorithm-patterns)
- [Heap](./heap) — другая «деревянная» структура под другие задачи
