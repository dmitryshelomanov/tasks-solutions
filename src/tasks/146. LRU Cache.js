// https://leetcode.com/problems/lru-cache/description/

/**
 * LRU Cache (Least Recently Used Cache)
 * 
 * Задача: Реализовать структуру данных LRU Cache, которая поддерживает операции get и put.
 * LRU (Least Recently Used) - алгоритм кэширования, при котором удаляется наименее используемый элемент.
 * 
 * Подход:
 * Используется комбинация двунаправленного связанного списка и хеш-таблицы (Map):
 * - Связанный список хранит элементы в порядке использования (head - самый старый, tail - самый новый)
 * - Map обеспечивает O(1) доступ к узлам по ключу
 * 
 * Паттерны: #linked_list, #hashtable, #doubly_linked_list
 * Сложность: get и put - O(1)
 */

/**
 * Узел двунаправленного связанного списка
 * @param {*} val - Значение узла
 */
function Node(val) {
  this.value = val;
  this.next = null;
  this.prev = null;
}

/**
 * Двунаправленный связанный список для хранения элементов кэша
 */
function LinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

/**
 * Добавляет элемент в конец списка (как самый новый)
 * @param {*} val - Значение для добавления
 * @returns {Node} Добавленный узел
 */
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

/**
 * Удаляет узел из списка
 * @param {Node} node - Узел для удаления
 */
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

/**
 * Удаляет и возвращает первый элемент списка (самый старый)
 * @returns {*} Значение удалённого узла или null, если список пуст
 */
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

/**
 * LRU Cache конструктор
 * @param {number} capacity - Максимальная ёмкость кэша
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.tree = new LinkedList();
  this.map = new Map();
};

/**
 * Получает значение по ключу и перемещает элемент в конец (как самый используемый)
 * @param {number} key - Ключ
 * @returns {number} Значение или -1, если ключ не найден
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;

  const node = this.map.get(key);

  // Перемещаем узел в конец списка (как самый новый)
  this.tree.remove(node);
  const newNode = this.tree.add(node.value);
  this.map.set(key, newNode);

  return node.value.value;
};

/**
 * Добавляет или обновляет значение по ключу
 * @param {number} key - Ключ
 * @param {number} value - Значение
 */
LRUCache.prototype.put = function (key, value) {
  // Если ключ уже существует, обновляем и перемещаем в конец
  if (this.map.has(key)) {
    const node = this.map.get(key);

    this.tree.remove(node);
    this.tree.add({ key, value });
    this.map.set(key, this.tree.tail);
    return;
  }

  // Если достигли максимальной ёмкости, удаляем самый старый элемент
  if (this.tree.size >= this.capacity) {
    const oldNode = this.tree.pop();

    this.map.delete(oldNode.key);
  }

  // Добавляем новый элемент
  const node = this.tree.add({ key, value });

  this.map.set(key, node);
};
