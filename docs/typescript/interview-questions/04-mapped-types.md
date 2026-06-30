---
title: Mapped Types
description: Вопрос с собеседования по TypeScript — Mapped Types
---

# Mapped Types и их практическое применение

### Вопрос
Что такое mapped types в TypeScript? Объясните синтаксис `{ [K in keyof T]: ... }`. Как создавать новые типы на основе существующих? Приведите примеры utility types, построенных на mapped types.

### Ответ

**Mapped Types** — это способ создания новых типов путем преобразования свойств существующего типа. Они похожи на итерацию по ключам объекта.

#### Базовый синтаксис:

```typescript
{ [K in keyof T]: U }
```

Это читается как: "Для каждого ключа K в типе T, создай свойство с типом U".

#### Простые примеры:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P]; // -? удаляет опциональность
};

interface User {
  name: string;
  age?: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age?: number; }

type PartialUser = Partial<User>;
// { name?: string; age?: number; }

type RequiredUser = Required<User>;
// { name: string; age: number; }
```

#### Преобразование типов свойств:

```typescript
// Преобразование всех свойств в строки
type Stringify<T> = {
  [K in keyof T]: string;
};

type User = { name: string; age: number };
type StringUser = Stringify<User>; // { name: string; age: string; }

// Преобразование с сохранением типов
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

#### Фильтрация свойств:

```typescript
// Выбор только строковых свойств
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type User = { name: string; age: number; email: string };
type StringProps = StringKeys<User>; // { name: string; email: string; }

// Исключение определенных свойств
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type WithoutAge = Omit<User, 'age'>; // { name: string; email: string; }
```

#### Переименование ключей:

```typescript
// Добавление префикса к ключам
type AddPrefix<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
};

type User = { name: string; age: number };
type PrefixedUser = AddPrefix<User, 'user_'>; 
// { user_name: string; user_age: number; }

// Преобразование camelCase в UPPER_SNAKE_CASE
type ToUpperSnake<T extends string> = 
  T extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest extends `${infer F}${infer R}`
      ? F extends Uppercase<F>
        ? ToUpperSnake<`${F}${R}`>
        : `_${Uppercase<F>}${ToUpperSnake<R>}`
      : ''}`
    : T;
```

#### Комбинирование mapped types:

```typescript
// Pick - выбор определенных свойств
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type User = { name: string; age: number; email: string };
type UserBasic = Pick<User, 'name' | 'email'>; 
// { name: string; email: string; }

// Record - создание объекта с определенными ключами и значениями
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type UserRoles = Record<'admin' | 'user' | 'guest', boolean>;
// { admin: boolean; user: boolean; guest: boolean; }
```

#### Модификаторы доступа:

```typescript
// Удаление readonly
type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyUser = { readonly name: string; readonly age: number };
type WritableUser = Writable<ReadonlyUser>; 
// { name: string; age: number; }

// Удаление опциональности (как Required)
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

#### Практические примеры:

**1. Deep Readonly:**
```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type Nested = {
  a: number;
  b: {
    c: string;
    d: { e: boolean };
  };
};

type DeepReadonlyNested = DeepReadonly<Nested>;
// Все уровни вложенности становятся readonly
```

**2. Nullable свойства:**
```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type User = { name: string; age: number };
type NullableUser = Nullable<User>; 
// { name: string | null; age: number | null; }
```

**3. Выбор свойств по типу значения:**
```typescript
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type User = { name: string; age: number; email: string };
type StringProps = PickByType<User, string>; 
// { name: string; email: string; }
```

**4. Создание геттеров:**
```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = { name: string; age: number };
type UserGetters = Getters<User>; 
// { getName: () => string; getAge: () => number; }
```

**5. Immutable update паттерн:**
```typescript
type Update<T> = {
  [K in keyof T]?: T[K] | ((prev: T[K]) => T[K]);
};

type User = { name: string; age: number };
type UserUpdate = Update<User>; 
// { name?: string | ((prev: string) => string); age?: number | ((prev: number) => number); }
```

#### Реальные применения:

**API конфигурация:**
```typescript
type ApiConfig = {
  baseUrl: string;
  timeout: number;
  retries: number;
};

// Все свойства опциональны для конфигурации по умолчанию
type DefaultConfig = Partial<ApiConfig>;

// Только некоторые свойства могут быть обновлены
type ConfigUpdate = Pick<Partial<ApiConfig>, 'timeout' | 'retries'>;
```

#### Важные моменты:

- Mapped types итерируются по ключам типа
- Можно фильтровать ключи с помощью `as` и conditional types
- Модификаторы `+readonly`, `-readonly`, `+?`, `-?` управляют модификаторами свойств
- Mapped types могут быть рекурсивными для работы с вложенными типами
- Используются в стандартных utility types (Partial, Required, Readonly, Pick, Omit)

---

---

[← Conditional Types](./03-conditional-types) | [Utility Types →](./05-utility-types)
