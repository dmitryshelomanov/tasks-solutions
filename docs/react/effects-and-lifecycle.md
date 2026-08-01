---
title: Effects и жизненный цикл
description: useEffect, cleanup, массив зависимостей, Strict Mode и типичные ловушки
---

# Effects и жизненный цикл

В функциональных компонентах «жизненный цикл» строится вокруг рендеров и эффектов. `useEffect` запускает побочные эффекты после того, как React отрисовал UI.

---

## Когда нужен effect

Effects — для синхронизации с **внешней** системой: подписки, таймеры, сеть, DOM API вне React.

Не для:

- Вычисления данных из props/state (считайте в теле рендера или `useMemo`)
- Обработки событий пользователя (обработчики в JSX)
- Передачи данных родителю через «effect → setState родителя» без нужды

---

## Базовый API

```javascript
useEffect(() => {
  // setup
  const id = setInterval(() => console.log('tick'), 1000);

  return () => {
    // cleanup
    clearInterval(id);
  };
}, [/* зависимости */]);
```

1. После commit React вызывает setup
2. Перед следующим запуском того же effect (или unmount) — cleanup
3. Зависимости решают, **когда** перезапускать

---

## Массив зависимостей

| Зависимости | Поведение |
|-------------|-----------|
| `[]` | Один раз после mount (+ cleanup на unmount) |
| `[a, b]` | После mount и когда `a` или `b` изменились (Object.is) |
| без массива | После **каждого** рендера (редко нужно) |

Правило: всё из рендера, что читается в effect, должно быть в deps (eslint `react-hooks/exhaustive-deps`).

```javascript
useEffect(() => {
  fetch(`/api/users/${userId}`).then(/* ... */);
}, [userId]);
```

---

## Cleanup

Cleanup обязателен для:

- `addEventListener` → `removeEventListener`
- `setInterval` / `setTimeout` → `clear*`
- WebSocket / EventSource → `close`
- Подписок на store → unsubscribe

Иначе — утечки и «setState on unmounted component».

```javascript
useEffect(() => {
  let cancelled = false;

  async function load() {
    const data = await fetchUser(id);
    if (!cancelled) setUser(data);
  }
  load();

  return () => {
    cancelled = true;
  };
}, [id]);
```

Флаг `cancelled` (или `AbortController`) защищает от гонок при быстрой смене `id`.

---

## Strict Mode (dev)

В React 18+ Strict Mode **дважды** вызывает setup → cleanup → setup при mount в development. Цель — поймать эффекты без корректного cleanup. В production — один раз.

Если видите двойной fetch в dev — сначала проверьте cleanup/AbortController, а не «ломайте» Strict Mode.

---

## useLayoutEffect

Как `useEffect`, но синхронно **после DOM-мутаций и до paint**. Нужен, когда надо измерить/синхронно поправить DOM до показа кадра (избежать мерцания). В большинстве случаев достаточно `useEffect`.

Порядок: render → commit DOM → **useLayoutEffect** → paint → **useEffect**.

---

## Типичные ловушки

1. **Бесконечный цикл** — effect вызывает `setState`, меняя зависимость effect’а.
2. **Устаревшие замыкания** — забыли зависимость; effect видит старый state.
3. **Object/array в deps** — новый литерал каждый рендер → effect каждый раз. Стабилизируйте (`useMemo`) или сравнивайте примитивы.
4. **Data fetching только через effect** — нормально для клиентских SPA; в RSC/фреймворках данные часто грузят выше (loader, server component).

---

## Связанные материалы

- [Virtual DOM и Reconciliation](./reconciliation) — render vs commit
- [React Hooks](./hooks) — базовые и продвинутые хуки
- [Keys и списки](./keys-and-lists) — remount сбрасывает state и effects
- [Context](./context) — когда данные лучше тянуть из контекста, а не из effect
