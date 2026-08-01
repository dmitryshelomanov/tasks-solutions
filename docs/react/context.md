---
title: Context
description: React Context — когда хватает, когда нужен внешний store, типичные ловушки
---

# Context

Context позволяет передать значение глубоко по дереву без prop drilling. Подходит для относительно стабильных данных (тема, локаль, текущий пользователь), а не как замена всему state management.

---

## Базовый API

```javascript
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
        Toggle
      </button>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

`useContext` подписывает компонент на Provider: при новом `value` ре-рендерятся все потребители ниже.

---

## Prop drilling vs Context

| Подход | Когда |
|--------|--------|
| Props | 1–2 уровня, явный контракт |
| Context | Много уровней, одно «глобальное» для поддерева значение |
| Store (Zustand, Redux, Jotai…) | Частые обновления, селекторы, сложная логика, middleware |

Context не делает обновления «дешёвыми» сам по себе — он только убирает пропсы.

---

## Ловушка: новый объект каждый рендер

```javascript
// Плохо: value — новый объект → все consumers ре-рендерятся каждый раз
<AuthContext.Provider value={{ user, login, logout }}>
```

```javascript
// Лучше: стабилизировать
const value = useMemo(
  () => ({ user, login, logout }),
  [user, login, logout]
);

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
```

Или разделить контексты: часто меняющийся `user` и стабильные `login`/`logout`.

---

## Разделение контекстов

Один огромный context с `{ theme, user, cart, flags }` заставляет всех подписчиков обновляться при любом поле. Дробите:

- `ThemeContext`
- `AuthContext`
- `CartContext`

Так смена темы не трогает корзину.

---

## Когда Context хватает

- Тема, locale, feature flags (редко меняются)
- «Текущий пользователь» в небольшом приложении
- DI для тестов (подменить Provider)

## Когда нужен store

- Высокочастотные обновления (ввод, анимация state, realtime)
- Нужны селекторы: компонент читает `state.items.length`, не весь state
- Сложная логика, time-travel, middleware
- State живёт вне React-дерева (между корнями, вне React)

`useSyncExternalStore` — мост к внешнему store; см. [React Hooks](./hooks#usesyncexternalstore).

---

## Типичные вопросы

1. Context vs Redux? — Context = механизм передачи; Redux = паттерн + инструменты. Можно Context + `useReducer` для простого глобального state.
2. Ре-рендер без смены данных? — нестабильный `value` (новый объект/функция).
3. Default value в `createContext` — используется только без Provider; в проде почти всегда нужен Provider.

---

## Связанные материалы

- [Effects и жизненный цикл](./effects-and-lifecycle)
- [Оптимизация React](./optimization) — memo и стабильные ссылки
- [React Hooks](./hooks) — `use`, `useSyncExternalStore`
- [Keys и списки](./keys-and-lists)
