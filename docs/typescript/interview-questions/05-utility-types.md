---
title: Utility Types
description: Вопрос с собеседования по TypeScript — Utility Types
---

# Utility Types — Pick, Omit, Partial, Required и создание собственных

### Вопрос
Объясните стандартные utility types TypeScript: `Pick`, `Omit`, `Partial`, `Required`, `Record`, `Exclude`, `Extract`. Как создать собственные utility types для решения конкретных задач?

### Ответ

**Utility Types** — это встроенные типы TypeScript для трансформации других типов. Они построены на conditional и mapped types.

#### Основные utility types:

**1. Partial&lt;T&gt; — делает все свойства опциональными:**

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

// Использование
function updateUser(user: User, updates: Partial<User>) {
  return { ...user, ...updates };
}
```

**2. Required&lt;T&gt; — делает все свойства обязательными:**

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P]; // -? удаляет опциональность
};

interface User {
  name: string;
  age?: number;
  email?: string;
}

type RequiredUser = Required<User>;
// { name: string; age: number; email: string; }
```

**3. Readonly&lt;T&gt; — делает все свойства только для чтения:**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; readonly email: string; }
```

**4. Pick&lt;T, K&gt; — выбирает определенные свойства:**

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'name' | 'email'>;
// { name: string; email: string; }

// Практическое применение
function createPublicProfile(user: User): PublicUser {
  return {
    name: user.name,
    email: user.email
  };
}
```

**5. Omit&lt;T, K&gt; — исключает определенные свойства:**

```typescript
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type UserWithoutPassword = Omit<User, 'password'>;
// { name: string; age: number; email: string; }

// Множественное исключение
type UserBasic = Omit<User, 'password' | 'email'>;
// { name: string; age: number; }
```

**6. Record&lt;K, T&gt; — создает объект с ключами K и значениями T:**

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Status = 'pending' | 'approved' | 'rejected';
type StatusConfig = Record<Status, { color: string; message: string }>;

const config: StatusConfig = {
  pending: { color: 'yellow', message: 'Waiting...' },
  approved: { color: 'green', message: 'Approved!' },
  rejected: { color: 'red', message: 'Rejected' }
};
```

**7. Exclude&lt;T, U&gt; — исключает из T все типы, которые есть в U:**

```typescript
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>;
// number | boolean

type AllowedStatus = Exclude<'pending' | 'approved' | 'rejected' | 'cancelled', 'cancelled'>;
// 'pending' | 'approved' | 'rejected'
```

**8. Extract&lt;T, U&gt; — извлекает из T только те типы, которые есть в U:**

```typescript
type Extract<T, U> = T extends U ? T : never;

type StringOrNumber = Extract<string | number | boolean, string | number>;
// string | number
```

**9. NonNullable&lt;T&gt; — исключает null и undefined:**

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string
```

**10. ReturnType&lt;T&gt; — извлекает тип возвращаемого значения функции:**

```typescript
type ReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => infer R ? R : any;

function getUser() {
  return { name: 'John', age: 30 };
}

type User = ReturnType<typeof getUser>; // { name: string; age: number; }
```

**11. Parameters&lt;T&gt; — извлекает типы параметров функции:**

```typescript
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]
```

#### Создание собственных utility types:

**1. DeepPartial — рекурсивный Partial:**
```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Nested = {
  user: {
    name: string;
    settings: {
      theme: string;
    };
  };
};

type PartialNested = DeepPartial<Nested>;
// Все свойства на всех уровнях опциональны
```

**2. DeepRequired — рекурсивный Required:**
```typescript
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
```

**3. Nullable — добавляет null к типу:**
```typescript
type Nullable<T> = T | null;

type MaybeString = Nullable<string>; // string | null
```

**4. Optional — делает определенные свойства опциональными:**
```typescript
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type User = { name: string; age: number; email: string };
type UserWithOptionalAge = Optional<User, 'age'>;
// { name: string; age?: number; email: string; }
```

**5. Values — извлекает типы значений объекта:**
```typescript
type Values<T> = T[keyof T];

type User = { name: string; age: number; email: string };
type UserValues = Values<User>; // string | number
```

**6. KeysOfType — выбирает ключи с определенным типом значения:**
```typescript
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type User = { name: string; age: number; email: string };
type StringKeys = KeysOfType<User, string>; // 'name' | 'email'
```

**7. Prettify — разворачивает пересеченные типы:**
```typescript
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Complex = { a: number } & { b: string } & { c: boolean };
type Pretty = Prettify<Complex>;
// В IDE будет показано как один объект: { a: number; b: string; c: boolean; }
```

**8. Merge — объединяет два типа:**
```typescript
type Merge<T, U> = Omit<T, keyof U> & U;

type A = { a: number; b: string };
type B = { b: number; c: boolean };
type Merged = Merge<A, B>; // { a: number; b: number; c: boolean; }
```

#### Практические сценарии:

**API типы:**
```typescript
interface ApiUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Для создания не нужны служебные поля
type CreateUserRequest = Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>;

// Для обновления все опционально кроме id
type UpdateUserRequest = Partial<Omit<ApiUser, 'id'>> & { id: number };

// Публичный профиль
type PublicUser = Omit<ApiUser, 'email'>;
```

**Формы и валидация:**
```typescript
type FormErrors<T> = Partial<Record<keyof T, string>>;

type LoginForm = {
  email: string;
  password: string;
};

type LoginErrors = FormErrors<LoginForm>;
// { email?: string; password?: string; }
```

#### Важные моменты:

- Utility types работают на этапе компиляции
- Можно комбинировать для сложных преобразований
- Некоторые utility types распределяются по union типам
- Создание собственных utility types улучшает переиспользование типов
- Используйте для типобезопасных API и форм

---

---

[← Mapped Types](./04-mapped-types) | [Generics и Constraints →](./06-generics)
