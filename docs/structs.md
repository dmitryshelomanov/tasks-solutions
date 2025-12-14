# Основные структуры данных

## Полезные ссылки

- [10 основных структур данных](https://practicum.yandex.ru/blog/10-osnovnyh-struktur-dannyh/)
- [Статья на Habr о структурах данных](https://habr.com/ru/articles/422259/)

## Обзор структур данных

**Array**

**Linked List**

complexity 

Insertion at Beginning	O(1)	O(1)	Constant-time pointer updates.
Insertion at End	O(n)	O(1)	Traversal required to find the last node.
Insertion at Position	O(n)	O(1)	Traversal to the desired position, then constant-time pointer updates.
Deletion at Beginning	O(1)	O(1)	Constant-time pointer update.
Deletion at End	O(n)	O(1)	Traversal required to find the second last node.
Deletion at Position	O(n)	O(1)	Traversal to the desired position, then constant-time pointer updates.
Searching in Linked list	O(n)	O(1)	Traversal through the list to find the desired value.

**Stack**
 LIFO — Last In, First Out

Complexity Analysis:

Time Complexity: O(1), It only performs an arithmetic operation to check if the stack is empty or not.
Auxiliary Space: O(1), It requires no extra space.

**Queue**
 FIFO = First in, First Out

      Access	Search	Insertion (at the end)	Deletion (from the beginning)
Queue	O(n)	  O(n)	  O(1)	                  O(1)
Array	O(1)	  O(n)	  O(1)	                  O(n)

**Set**

**Map** или **Hash Table**

**Binary search tree**

**Graph**
