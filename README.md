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

### 🎯 Быстрые ссылки

#### 📚 Алгоритмы и паттерны
- **[Паттерны решения задач](./docs/algorithms/algorithm-patterns.md)** — 16 основных паттернов (скользящее окно, два указателя, BFS/DFS и др.)
- **[Big O нотация](./docs/algorithms/big-o-notation.md)** — анализ сложности алгоритмов

#### 🔧 JavaScript
- **[Объекты и ссылки](./docs/javascript/objects.md)** — работа с объектами в JavaScript
- **[Контекст и область видимости](./docs/javascript/context-scope-variables.md)** — `this`, scope, arrow functions
- **[Event Loop](./docs/javascript/event-loop.md)** — асинхронность и очередь выполнения
- **[Числа](./docs/javascript/numbers.md)** — работа с числами и BigInt
- **[Вопросы с собеседований](./docs/javascript/interview-questions.md)** — топ-6 популярных вопросов по JavaScript
- **[package.json](./docs/javascript/package-json.md)** — основные поля и их назначение
- **[Прототипы](./docs/javascript/prototypes.md)** — прототипное наследование
- **[Методы классов](./docs/javascript/class-methods.md)** — наследование и контекст

#### 📘 TypeScript
- **[Вопросы с собеседований по TypeScript](./docs/typescript/interview-questions.md)** — топ-10 вопросов уровня Middle+ по TypeScript

#### ⚛️ React
- **[React Hooks](./docs/react/hooks.md)** — продвинутые хуки React

#### 📊 Структуры данных
- **[Основные структуры](./docs/data-structures/structures.md)** — массивы, списки, стеки, очереди, графы
- **[Массивы vs Векторы](./docs/data-structures/arrays-vs-vectors.md)** — различия и применение

#### 🌐 Веб-разработка
- **[CORS](./docs/web/cors.md)** — Cross-Origin Resource Sharing
- **[CSP](./docs/web/csp.md)** — Content Security Policy
- **[JS-движки и браузерные движки](./docs/web/js-and-browser-engines.md)** — отличие JavaScript Engine от Browser Engine и как они работают вместе
- **[Критический путь рендеринга](./docs/web/critical-rendering-path.md)** — что такое CRP и как его оптимизировать (SSR, Streaming, Hydration, Code Splitting, App Shell)

#### 🏗️ Системный дизайн
- **[Системный дизайн — Обзор](./docs/systedesign/README.md)** — полный обзор материалов по системному дизайну
- **[Пример системного собеседования](./docs/systedesign/system-design-interview-example.md)** — пошаговый разбор на примере сервиса поиска ответов
- **[Функциональные и нефункциональные требования](./docs/systedesign/functional-and-non-functional-requirements.md)** — сбор и анализ требований к системе
- **[Оценка нагрузки и ресурсов](./docs/systedesign/load-estimation.md)** — расчёт RPS, объёма данных, CPU/RAM
- **[Типы баз данных](./docs/systedesign/database-types.md)** — реляционные, NoSQL, графовые, временные ряды и др.
- **[CAP теорема](./docs/systedesign/cap-theorem.md)** — компромиссы в распределённых системах
- **[Масштабирование](./docs/systedesign/scaling.md)** — вертикальное и горизонтальное масштабирование
- **[Load Balancing](./docs/systedesign/load-balancing.md)** — балансировка нагрузки между серверами
- **[Стратегии кэширования](./docs/systedesign/caching-strategies.md)** — паттерны кэширования и инвалидация
- **[REST API](./docs/systedesign/rest-api.md)** — проектирование RESTful API
- **[Message Queues](./docs/systedesign/message-queues.md)** — асинхронная коммуникация через очереди
- **[Метрики и мониторинг](./docs/systedesign/metrics.md)** — latency, p95, RPS, error rate, Golden Signals, SLO
- **[Репликация и шардирование](./docs/systedesign/replication-and-sharding.md)** — стратегии масштабирования БД
- **[Стек ELK](./docs/systedesign/elk-stack.md)** — Elasticsearch, Logstash, Kibana для логирования и анализа

#### 🤖 Искусственный интеллект
- **[AI — Обзор](./docs/AI/README.md)** — основные понятия AI
  - [Эмбеддинги](./docs/AI/embeddings.md) — числовое представление данных
  - [LLM](./docs/AI/llm.md) — большие языковые модели
  - [MCP](./docs/AI/mcp.md) — Model Context Protocol
  - [Skills](./docs/AI/skills.md) — скиллы агента в Cursor (инструкции для конкретных задач)

#### 📖 Ресурсы
- **[Книги и материалы](./docs/resources/books.md)** — полезные ресурсы для изучения

### 📖 Полная документация

👉 **[Перейти к полной документации](./docs/README.md)**

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
