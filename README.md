# 🚀 Tasks Solutions

Коллекция решений алгоритмических задач, структур данных и полезных функций с тестами и подробными объяснениями.

---

## 📖 О проекте

Этот репозиторий содержит:

- **Алгоритмические задачи** — решения популярных задач с LeetCode и других платформ
- **Структуры данных** — реализации основных структур (стек, очередь, связный список и др.)
- **JavaScript функции** — полезные утилиты (compose, curry, promises и др.)
- **Тесты** — покрытие решений тестами для проверки корректности
- **Документация** — материалы по алгоритмам, структурам данных, JavaScript, системному дизайну и AI

### Зачем этот репозиторий?

- 📚 **Обучение** — изучение алгоритмов и структур данных на практике
- 🎯 **Подготовка к интервью** — сборник задач для подготовки к техническим собеседованиям
- 💡 **Справочник** — быстрый доступ к решениям и паттернам
- 📝 **Документация** — подробные объяснения концепций и технологий
- 🧪 **Примеры кода** — рабочие примеры с тестами для изучения

---

## 📁 Структура проекта

```
tasks-solutions/
├── src/
│   ├── tasks/          # Алгоритмические задачи
│   │   ├── easy-top-50/     # Задачи из топ-50 легких
│   │   ├── sliding-window/  # Задачи на скользящее окно
│   │   ├── binary-search/   # Задачи на бинарный поиск
│   │   ├── graph/           # Задачи на графы
│   │   └── ...
│   ├── structures/     # Структуры данных
│   │   ├── linked-list.test.js
│   │   ├── queue.test.js
│   │   └── stack.test.js
│   └── functions/      # Полезные функции
│       ├── compose.test.js
│       ├── curry.test.js
│       └── promises.test.js
└── docs/              # Документация
    ├── javascript/    # JavaScript материалы
    ├── typescript/    # TypeScript материалы
    ├── algorithms/    # Алгоритмы и паттерны
    ├── data-structures/ # Структуры данных
    ├── web/           # Веб-разработка
    ├── react/         # React материалы
    ├── systedesign/   # Системный дизайн
    ├── AI/            # Материалы по AI
    └── resources/     # Ресурсы
```

---

## 🔖 Система тегов для задач

Задачи помечаются тегами для быстрого поиска по паттернам и типам:

| Тег | Описание |
|-----|----------|
| `#in_place` | Трансформация исходного массива на месте |
| `#two_pointers` | Задачи с двумя указателями |
| `#sliding_window` | Скользящее окно |
| `#naive` | Решение "в лоб" |
| `#arrays` | Задачи про массивы |
| `#strings` | Задачи про строки |
| `#hashtable` | Использование хеш-таблиц |
| `#matrix` | Задачи про матрицы |
| `#tree` | Задачи на деревья |
| `#dfs` / `#bfs` | Обход дерева/графа |
| `#dynamic` | Динамическое программирование |

---

## 📚 Документация

Полная документация собирается через VitePress и доступна на [GitHub Pages](https://dmitryshelomanov.github.io/tasks-solutions/).

### Быстрые ссылки

| Раздел | Ключевые материалы |
|--------|-------------------|
| [Алгоритмы](./docs/algorithms/) | [Паттерны](./docs/algorithms/algorithm-patterns.md), [Big O](./docs/algorithms/big-o-notation.md) |
| [JavaScript](./docs/javascript/) | [Event Loop](./docs/javascript/event-loop.md), [Вопросы с собеседований](./docs/javascript/interview-questions.md) |
| [TypeScript](./docs/typescript/) | [Вопросы с собеседований](./docs/typescript/interview-questions-overview.md) |
| [Структуры данных](./docs/data-structures/) | [Основные структуры](./docs/data-structures/structures.md) |
| [Системный дизайн](./docs/systedesign/) | [Обзор](./docs/systedesign/index.md), [Пример собеседования](./docs/systedesign/system-design-interview-example.md) |
| [Веб](./docs/web/) | [HTTP](./docs/web/http.md), [CORS](./docs/web/cors.md), [Core Web Vitals](./docs/web/core-web-vitals.md) |
| [React](./docs/react/) | [Reconciliation](./docs/react/reconciliation.md), [Оптимизация](./docs/react/optimization.md), [Hooks](./docs/react/hooks.md) |
| [AI](./docs/AI/) | [LLM](./docs/AI/llm.md), [MCP](./docs/AI/mcp.md), [Skills](./docs/AI/skills.md) |
| [Ресурсы](./docs/resources/) | [Книги](./docs/resources/books.md) |

Локальный запуск: `yarn docs`. Подробнее: [docs/README.md](./docs/README.md).

---

## 🚀 Быстрый старт

### Структура задач

Каждая задача содержит:
- ✅ Решение с комментариями на русском языке
- 🔗 Ссылку на оригинальную задачу (LeetCode и др.)
- 🏷️ Теги для классификации
- 📝 JSDoc комментарии с описанием подхода
- 🧪 Тесты для проверки корректности

### Пример задачи

\`\`\`javascript
// https://leetcode.com/problems/two-sum/description/

/**
 * Найти два числа в массиве, сумма которых равна target
 * 
 * Подход: Используем хеш-таблицу для O(n) решения
 * 
 * @param {number[]} nums - Массив чисел
 * @param {number} target - Целевая сумма
 * @return {number[]} Индексы двух чисел
 * 
 * Паттерны: #arrays, #hashtable
 * Сложность: O(n)
 */
var twoSum = function(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};
\`\`\`

---

## 📂 Подробнее о разделах

👉 **[Полный список задач и структур данных](./src/README.md)** — каталог всех решений с описаниями и правилами добавления новых задач

### \`src/tasks/\`
Алгоритмические задачи с решениями:
- **easy-top-50/** — задачи из топ-50 легких LeetCode
- **sliding-window/** — задачи на паттерн "скользящее окно"
- **binary-search/** — задачи на бинарный поиск
- **graph/** — задачи на графы
- И другие категории

### \`src/structures/\`
Реализации основных структур данных:
- Linked List (связный список)
- Stack (стек)
- Queue (очередь)

### \`src/functions/\`
Полезные функции и утилиты:
- Compose — композиция функций
- Curry — каррирование
- Promises — работа с промисами

---

## 🤝 Вклад в проект

При добавлении новых задач:

1. ✅ Добавьте решение с комментариями на русском языке
2. 🔗 Укажите ссылку на оригинальную задачу
3. 🏷️ Добавьте соответствующие теги
4. 📝 Напишите JSDoc комментарии с описанием подхода
5. 🧪 Добавьте тесты для проверки

---

## 📝 Лицензия

Этот репозиторий создан в образовательных целях.

---

## 🔗 Полезные ссылки

- [LeetCode](https://leetcode.com/) — платформа с алгоритмическими задачами
- [NeetCode](https://neetcode.io/) — курсы по алгоритмам
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/) — справочник по сложности алгоритмов

---

*Репозиторий постоянно обновляется новыми задачами и улучшениями документации.*
