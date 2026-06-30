---
title: Virtual DOM и Reconciliation
description: Как React обновляет UI через Virtual DOM, diffing и reconciliation
---

# Virtual DOM и Reconciliation

React не обновляет DOM напрямую при каждом изменении состояния. Вместо этого он строит **Virtual DOM** — легковесное JavaScript-представление UI — и сравнивает его с предыдущей версией.

---

## Virtual DOM

Virtual DOM — это дерево обычных JavaScript-объектов, описывающих элементы, их props и дочерние узлы.

```javascript
// Упрощённое представление
const vnode = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: ['Hello'] }
  ]
};
```

При изменении state React создаёт **новое** дерево Virtual DOM, не трогая реальный DOM.

---

## Reconciliation (согласование)

**Reconciliation** — процесс сравнения старого и нового Virtual DOM и вычисления минимального набора изменений для реального DOM.

### Алгоритм diffing (упрощённо)

1. **Разные типы элементов** — React уничтожает старое поддерево и строит новое
2. **Одинаковый тип** — обновляет только изменившиеся атрибуты
3. **Списки** — сопоставляет по `key`; без key — по индексу (может быть неэффективно)

```javascript
// Плохо: без key React пересоздаёт элементы при reorder
items.map(item => <li>{item.text}</li>);

// Хорошо: стабильный key
items.map(item => <li key={item.id}>{item.text}</li>);
```

---

## Fiber

Начиная с React 16, reconciliation работает через **Fiber** — единицу работы, которую можно прерывать, приостанавливать и возобновлять. Это основа:

- **Concurrent Rendering** — приоритет интерактивности
- **Suspense** — отложенная загрузка
- **useTransition / useDeferredValue** — отложенные обновления

---

## Рендер vs Commit

1. **Render phase** — построение Virtual DOM, diffing (может прерываться)
2. **Commit phase** — применение изменений к DOM, вызов `useLayoutEffect`, `useEffect`

`useEffect` выполняется **после** paint; `useLayoutEffect` — **до** paint (синхронно после DOM-мутаций).

---

## Связанные материалы

- [Оптимизация React](./optimization) — когда мемоизация реально помогает
- [React Hooks](./hooks) — useTransition, useDeferredValue
- [Критический путь рендеринга](../web/critical-rendering-path) — влияние React на загрузку
