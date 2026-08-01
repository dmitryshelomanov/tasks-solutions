---
title: Virtual DOM и Reconciliation
description: Как React обновляет UI через Virtual DOM, Fiber, diffing, батчинг и remount
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
  children: [{ type: 'h1', props: {}, children: ['Hello'] }],
};
```

При изменении state React создаёт **новое** дерево Virtual DOM, не трогая реальный DOM до фазы commit.

---

## Reconciliation (согласование)

**Reconciliation** — сравнение старого и нового дерева и вычисление минимального набора изменений для реального DOM.

### Алгоритм diffing (упрощённо)

1. **Разные типы элементов** (`div` → `span`, или другой компонент) — уничтожить старое поддерево, построить новое
2. **Одинаковый тип** — обновить изменившиеся атрибуты/props, рекурсивно сравнить детей
3. **Списки** — сопоставить по `key`; без key — по индексу (часто неэффективно и багоопасно)

```javascript
// Плохо: без key React пересоздаёт / путает элементы при reorder
items.map((item) => <li>{item.text}</li>);

// Хорошо: стабильный key
items.map((item) => <li key={item.id}>{item.text}</li>);
```

Подробнее про ключи: [Keys и списки](./keys-and-lists).

---

## Когда происходит remount

React снимает старый экземпляр и монтирует новый (state сбрасывается, effects заново), если:

- Сменился **type** элемента/компонента на этой позиции
- Сменился **key**
- Родитель условно размонтировал ветку (`{show && <Child />}`)

```javascript
// Смена key = новый экземпляр
<Editor key={docId} docId={docId} />
```

---

## Fiber

С React 16 reconciliation идёт через **Fiber** — единицу работы, которую можно прерывать, приостанавливать и возобновлять:

- **Concurrent Rendering** — приоритет интерактивности над тяжёлым рендером
- **Suspense** — отложенный UI при ожидании данных/кода
- **useTransition / useDeferredValue** — низкоприоритетные обновления

Fiber-дерево хранит состояние компонентов, очередь обновлений и связи с DOM.

---

## Рендер vs Commit

1. **Render phase** — вызвать компоненты, построить Virtual DOM, diffing (в concurrent может прерываться)
2. **Commit phase** — применить изменения к DOM; затем `useLayoutEffect`, paint, затем `useEffect`

`useEffect` — **после** paint; `useLayoutEffect` — **до** paint (синхронно после DOM-мутаций). См. [Effects](./effects-and-lifecycle).

---

## Батчинг обновлений

React **объединяет** несколько `setState` в одном событии (и в промисах/таймерах с React 18 automatic batching) в один ре-рендер.

```javascript
function handleClick() {
  setA((a) => a + 1);
  setB((b) => b + 1);
  // один ре-рендер, не два
}
```

`flushSync` принудительно сбрасывает батч в DOM — почти никогда не нужен в прикладном коде.

---

## Типичные вопросы

1. Virtual DOM быстрее реального? — нет сам по себе; выигрыш в том, что меньше лишних DOM-операций и проще декларативная модель.
2. Почему ключи важны? — личность элемента в списке; без них — баги state и лишняя работа.
3. Чем Fiber отличается от стекового reconciler? — прерываемость и приоритеты.

---

## Связанные материалы

- [Keys и списки](./keys-and-lists)
- [Оптимизация React](./optimization)
- [React Hooks](./hooks) — useTransition, useDeferredValue
- [Критический путь рендеринга](../web/critical-rendering-path)
