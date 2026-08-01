---
title: React Hooks
description: Базовые и продвинутые хуки React — useState, useRef, memo-хуки, concurrent и use
---

# React Hooks

Хуки — способ использовать state и возможности React в функциональных компонентах. Ниже — базовый набор для собеседований и продвинутые хуки для оптимизации и внешних сторов.

---

## Базовые хуки

### useState

Локальный state компонента. Вызов `setState` планирует ре-рендер.

```javascript
const [count, setCount] = useState(0);

setCount(count + 1);           // может быть устаревшим при батчинге
setCount((c) => c + 1);        // функциональное обновление — предпочтительно
```

- Начальное значение: `useState(0)` или ленивый init `useState(() => expensive())` — функция вызовется один раз.
- Объекты/массивы обновляйте иммутабельно (`{ ...prev, x }`), иначе React может не увидеть изменение ссылки.

### useRef

«Коробка» с `.current`, которая **не** вызывает ре-рендер при изменении.

```javascript
const inputRef = useRef(null);
const renders = useRef(0);
renders.current += 1;

return <input ref={inputRef} />;
```

Типичное: DOM-узлы, хранение предыдущего значения, id таймера, mutable-флаг без рендера.

### useMemo и useCallback

Кэшируют значение / функцию между рендерами по зависимостям. Имеет смысл при дорогих вычислениях или стабильных ссылках для `memo`-детей и deps эффектов.

```javascript
const sorted = useMemo(() => [...items].sort(cmp), [items]);
const onSelect = useCallback((id) => setSelected(id), []);
```

**React Compiler** (где включён) часто делает ручную мемоизацию избыточной — пишите понятный код, оптимизируйте по профилю. Подробнее: [Оптимизация](./optimization).

### useContext

Читает ближайший Provider. См. [Context](./context).

### useEffect / useLayoutEffect

См. [Effects и жизненный цикл](./effects-and-lifecycle).

### useReducer

`useState` для сложной логики переходов: один `dispatch`, предсказуемые actions. Удобно вместе с Context для локального «мини-store».

---

## useDeferredValue

Хук React, который позволяет отложить обновление части пользовательского интерфейса.

- Функция useDeferredValue сама по себе не предотвращает дополнительные сетевые запросы.

- Не существует фиксированной задержки, вызванной самим useDeferredValue. Как только React завершит первоначальный рендеринг, React немедленно начнет работу над фоновым рендерингом с новым отложенным значением. Любые обновления, вызванные событиями (например, вводом текста), будут прерывать фоновый рендеринг и получат приоритет над ним.

- Фоновый рендеринг, вызванный useDeferredValue, не запускает эффекты до тех пор, пока они не будут зафиксированы на экране. Если фоновый рендеринг приостановлен, его эффекты будут запущены после загрузки данных и обновления пользовательского интерфейса.

---

## useImperativeHandle

Хук React, который позволяет настроить хэндл-обработчик, отображаемый как ссылка. По сути это прокси для компонента, который внутри уже использует свой ref.

```javascript
useImperativeHandle(
  ref,
  () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  },
  []
);
```

---

## useInsertionEffect

Версия useEffect, которая срабатывает перед любыми мутациями DOM.

useInsertionEffect предназначен для авторов библиотек CSS-in-JS. Если вы не работаете над библиотекой CSS-in-JS и вам нужно место для вставки стилей, вам, вероятно, лучше использовать useEffect или useLayoutEffect.

---

## useSyncExternalStore

Хук React, позволяющий подписаться на внешнее хранилище.

Она возвращает моментальный снимок данных в хранилище. В качестве аргументов необходимо передать две функции:

Функция subscribe должна подписываться на стор и возвращать функцию, которая отписывается.
Функция getSnapshot должна считывать моментальный снимок данных из хранилища.

```javascript
const isOnline = useSyncExternalStore(subscribe, getSnapshot);

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

Для SSR передайте третий аргумент `getServerSnapshot`.

---

## useTransition

Хук React, который позволяет обновлять состояние без блокировки пользовательского интерфейса.

Функция `startTransition`, возвращаемая useTransition, позволяет пометить обновление состояния как переход (низкий приоритет). Пока переход pending, `isPending === true` — можно показать индикатор.

```javascript
const [isPending, startTransition] = useTransition();

function onChange(e) {
  const value = e.target.value;
  setInput(value); // срочное — инпут отзывчивый
  startTransition(() => {
    setFiltered(filterHugeList(value)); // можно отложить
  });
}
```

---

## use

Хук React, который позволяет прочитать значение ресурса, например промиса или контекста.

В отличие от всех остальных хуков React, `use` можно вызывать в циклах и условных операторах, таких как `if`. Как и другие хуки React, функция, вызывающая `use`, должна быть компонентом или хуком.

При вызове с Promise хук `use` интегрируется с Suspense и error boundaries. Компонент, вызывающий `use`, приостанавливается на время выполнения Promise, переданного `use`. Если компонент обёрнут в границу Suspense, будет отображён fallback. После разрешения Promise fallback заменяется рендерингом с данными. Если промис отклонён — ближайшая error boundary.

---

## Связанные материалы

- [Effects и жизненный цикл](./effects-and-lifecycle)
- [Context](./context)
- [Оптимизация](./optimization)
- [Virtual DOM и Reconciliation](./reconciliation)
