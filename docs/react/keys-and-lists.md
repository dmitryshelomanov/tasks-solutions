---
title: Keys и списки
description: Зачем нужен key, почему index-as-key опасен, remount и reconciliation
---

# Keys и списки

`key` помогает React сопоставить элементы списка между рендерами: какой узел обновить, переместить или уничтожить. Неверный key → баги state, лишние remount’ы и странный UI.

---

## Зачем key

При diffing списка React ищет элемент с тем же `key` в предыдущем дереве.

```javascript
// Стабильный бизнес-id
{items.map((item) => (
  <Row key={item.id} item={item} />
))}
```

Без key React использует **индекс** массива — при insert/delete/reorder путает личность элементов.

---

## Index как key — когда нельзя

```javascript
// Опасно при изменении порядка / вставках / удалениях
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}
```

Сценарий: список инпутов, удалили первый элемент. С `key={index}` React оставит DOM/state у «позиции 0», но подставит туда данные бывшего второго — визуально «переехавший» текст в чужом поле.

**Допустимо**, если список:

- Статический (не reorder, не insert/delete в середину)
- Или элементы без локального state / неуправляемых инпутов

---

## Remount через смену key

Смена `key` у компонента = «это другой экземпляр»: unmount старого, mount нового (state и effects сбрасываются).

```javascript
// Сброс формы при смене пользователя
<UserForm key={userId} userId={userId} />
```

Полезный приём; случайная смена key на каждом рендере (`key={Math.random()}`) — антипаттерн.

---

## Ключ должен быть

1. **Стабильным** между рендерами для одной сущности
2. **Уникальным** среди siblings
3. **Предсказуемым** — лучше id с сервера, чем случайный uuid на каждый render

Не используйте индекс + нестабильные данные как «уникальность», если список мутирует.

---

## Fragment с key

Для списка без обёртки-DOM:

```javascript
import { Fragment } from 'react';

{items.map((item) => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </Fragment>
))}
```

Короткий синтаксис `<>...</>` **не принимает** `key`.

---

## Связь с reconciliation

| Ситуация | Поведение React |
|----------|-----------------|
| Тот же type + тот же key | Обновить props на месте |
| Тот же type + другой key | Считать другим элементом → remount |
| Другой type | Уничтожить поддерево, создать заново |

Подробнее: [Virtual DOM и Reconciliation](./reconciliation).

---

## Типичные вопросы

1. Можно ли key из props поднять на родителя? — `key` не передаётся как prop в ребёнка; это подсказка reconciler’у.
2. Нужен ли key вне списков? — иногда для принудительного reset (см. выше).
3. UUID в render как key? — нет, если генерируется заново каждый раз.

---

## Связанные материалы

- [Virtual DOM и Reconciliation](./reconciliation)
- [Effects и жизненный цикл](./effects-and-lifecycle) — remount перезапускает effects
- [Оптимизация React](./optimization) — виртуализация длинных списков
