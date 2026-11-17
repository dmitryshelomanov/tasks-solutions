import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Tasks Solutions",
  description:
    "Документация по алгоритмам, структурам данных, JavaScript, TypeScript, веб-разработке, React, системному дизайну и AI",
  base: "/tasks-solutions/",
  cleanUrls: true,
  lang: "ru-RU",

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>%F0%9F%93%9A</text></svg>",
      },
    ],
  ],

  srcExclude: ["**/typescript/interview-questions.md"],

  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "Главная", link: "/" },
      { text: "Команды", link: "/commands" },
      {
        text: "Языки",
        items: [
          { text: "JavaScript", link: "/javascript/" },
          { text: "TypeScript", link: "/typescript/" },
        ],
      },
      {
        text: "Собеседование",
        items: [
          { text: "Алгоритмы", link: "/algorithms/" },
          { text: "Структуры данных", link: "/data-structures/" },
          { text: "Системный дизайн", link: "/systedesign/" },
        ],
      },
      {
        text: "Стек",
        items: [
          { text: "Веб", link: "/web/" },
          { text: "React", link: "/react/" },
        ],
      },
      { text: "AI", link: "/AI/" },
      { text: "Ресурсы", link: "/resources/" },
    ],

    sidebar: {
      "/algorithms/": [
        {
          text: "Алгоритмы",
          items: [
            { text: "Обзор", link: "/algorithms/" },
            {
              text: "Паттерны решения задач",
              link: "/algorithms/algorithm-patterns",
            },
            { text: "Big O нотация", link: "/algorithms/big-o-notation" },
          ],
        },
      ],
      "/javascript/": [
        {
          text: "JavaScript",
          items: [
            { text: "Обзор", link: "/javascript/" },
            { text: "Объекты", link: "/javascript/objects" },
            { text: "Числа", link: "/javascript/numbers" },
            {
              text: "Контекст и область видимости",
              link: "/javascript/context-scope-variables",
            },
            { text: "Event Loop", link: "/javascript/event-loop" },
            { text: "Прототипы", link: "/javascript/prototypes" },
            { text: "Методы классов", link: "/javascript/class-methods" },
            {
              text: "Вопросы с собеседований",
              link: "/javascript/interview-questions",
            },
            { text: "package.json", link: "/javascript/package-json" },
          ],
        },
      ],
      "/typescript/": [
        {
          text: "TypeScript",
          items: [
            { text: "Обзор", link: "/typescript/" },
            {
              text: "Вопросы с собеседований",
              link: "/typescript/interview-questions-overview",
              collapsed: false,
              items: [
                {
                  text: "Union и Intersection",
                  link: "/typescript/interview-questions/01-union-intersection",
                },
                {
                  text: "Type Assertions и Guards",
                  link: "/typescript/interview-questions/02-type-assertions-guards",
                },
                {
                  text: "Conditional Types",
                  link: "/typescript/interview-questions/03-conditional-types",
                },
                {
                  text: "Mapped Types",
                  link: "/typescript/interview-questions/04-mapped-types",
                },
                {
                  text: "Utility Types",
                  link: "/typescript/interview-questions/05-utility-types",
                },
                {
                  text: "Generics",
                  link: "/typescript/interview-questions/06-generics",
                },
                {
                  text: "Template Literal Types",
                  link: "/typescript/interview-questions/07-template-literal-types",
                },
                {
                  text: "Type Narrowing",
                  link: "/typescript/interview-questions/08-type-narrowing",
                },
                {
                  text: "Distributive Conditional",
                  link: "/typescript/interview-questions/09-distributive-conditional",
                },
                {
                  text: "Branded Types",
                  link: "/typescript/interview-questions/10-branded-types",
                },
              ],
            },
          ],
        },
      ],
      "/data-structures/": [
        {
          text: "Структуры данных",
          items: [
            { text: "Обзор", link: "/data-structures/" },
            { text: "Структуры данных", link: "/data-structures/structures" },
            { text: "Heap", link: "/data-structures/heap" },
            { text: "Trie", link: "/data-structures/trie" },
            { text: "Union-Find", link: "/data-structures/union-find" },
            { text: "LRU Cache", link: "/data-structures/lru-cache" },
            {
              text: "Массивы vs Векторы",
              link: "/data-structures/arrays-vs-vectors",
            },
          ],
        },
      ],
      "/systedesign/": [
        {
          text: "Системный дизайн",
          items: [
            { text: "Обзор", link: "/systedesign/" },
            {
              text: "Функциональные и нефункциональные требования",
              link: "/systedesign/functional-and-non-functional-requirements",
            },
            {
              text: "Оценка нагрузки и ресурсов",
              link: "/systedesign/load-estimation",
            },
            { text: "Типы баз данных", link: "/systedesign/database-types" },
            {
              text: "Репликация и шардирование",
              link: "/systedesign/replication-and-sharding",
            },
            { text: "CAP теорема", link: "/systedesign/cap-theorem" },
            { text: "Масштабирование", link: "/systedesign/scaling" },
            { text: "Load Balancing", link: "/systedesign/load-balancing" },
            {
              text: "Стратегии кэширования",
              link: "/systedesign/caching-strategies",
            },
            { text: "CDN", link: "/systedesign/cdn" },
            { text: "Rate Limiting", link: "/systedesign/rate-limiting" },
            { text: "REST API", link: "/systedesign/rest-api" },
            { text: "Message Queues", link: "/systedesign/message-queues" },
            { text: "WebSockets и SSE", link: "/systedesign/websockets" },
            { text: "Идемпотентность", link: "/systedesign/idempotency" },
            {
              text: "Метрики и мониторинг",
              link: "/systedesign/metrics",
            },
            { text: "Стек ELK", link: "/systedesign/elk-stack" },
            {
              text: "Пример системного собеседования",
              link: "/systedesign/system-design-interview-example",
            },
          ],
        },
      ],
      "/web/": [
        {
          text: "Веб-разработка",
          items: [
            { text: "Обзор", link: "/web/" },
            { text: "HTTP и HTTPS", link: "/web/http" },
            { text: "CORS", link: "/web/cors" },
            { text: "Безопасность", link: "/web/security" },
            { text: "CSP", link: "/web/csp" },
            {
              text: "Как работает браузер",
              link: "/web/how-browsers-work",
            },
            {
              text: "JS-движки и браузерные движки",
              link: "/web/js-and-browser-engines",
            },
            {
              text: "Критический путь рендеринга",
              link: "/web/critical-rendering-path",
            },
            { text: "Core Web Vitals", link: "/web/core-web-vitals" },
          ],
        },
      ],
      "/react/": [
        {
          text: "React",
          items: [
            { text: "Обзор", link: "/react/" },
            {
              text: "Virtual DOM и Reconciliation",
              link: "/react/reconciliation",
            },
            { text: "Keys и списки", link: "/react/keys-and-lists" },
            {
              text: "Effects и жизненный цикл",
              link: "/react/effects-and-lifecycle",
            },
            { text: "Context", link: "/react/context" },
            { text: "Оптимизация", link: "/react/optimization" },
            { text: "React Hooks", link: "/react/hooks" },
          ],
        },
      ],
      "/AI/": [
        {
          text: "Искусственный интеллект",
          items: [
            { text: "Обзор", link: "/AI/" },
            { text: "Эмбеддинги", link: "/AI/embeddings" },
            { text: "LLM", link: "/AI/llm" },
            { text: "MCP", link: "/AI/mcp" },
            {
              text: "Skills",
              collapsed: false,
              items: [
                { text: "Обзор", link: "/AI/skills" },
                {
                  text: "Пример описания",
                  link: "/AI/skills/example-description",
                },
                {
                  text: "Личное vs проект",
                  link: "/AI/skills/example-personal-vs-project",
                },
                {
                  text: "Пример структуры",
                  link: "/AI/skills/example-structure",
                },
              ],
            },
          ],
        },
      ],
      "/resources/": [
        {
          text: "Ресурсы",
          items: [
            { text: "Обзор", link: "/resources/" },
            { text: "Книги и материалы", link: "/resources/books" },
          ],
        },
      ],
    },

    outline: {
      label: "На этой странице",
      level: [2, 3],
    },
    docFooter: {
      prev: "Предыдущая страница",
      next: "Следующая страница",
    },
    darkModeSwitchLabel: "Тема",
    sidebarMenuLabel: "Меню",
    returnToTopLabel: "Наверх",
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/dmitryshelomanov/tasks-solutions",
      },
      {
        icon: "telegram",
        link: "https://t.me/dmitryshelomanov",
      },
    ],
  },
});
