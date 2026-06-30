---
title: Template Literal Types
description: Вопрос с собеседования по TypeScript — Template Literal Types
---

# Template Literal Types и их применение

### Вопрос
Что такое Template Literal Types в TypeScript? Как они работают? Приведите примеры создания типобезопасных строковых паттернов, путей API, CSS классов и других практических применений.

### Ответ

**Template Literal Types** — это типы, построенные на основе template literal синтаксиса (обратные кавычки). Они позволяют создавать типы строк с определенными паттернами.

#### Базовый синтаксис:

```typescript
type Greeting = `Hello, ${string}`;

const valid: Greeting = 'Hello, World'; // ✅ OK
const invalid: Greeting = 'Hi, World'; // ❌ Error

// С literal типами
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
```

#### Встроенные utility типы для строк:

```typescript
// Uppercase<T> - преобразует все символы в верхний регистр
type Upper = Uppercase<'hello'>; // 'HELLO'

// Lowercase<T> - преобразует все символы в нижний регистр
type Lower = Lowercase<'HELLO'>; // 'hello'

// Capitalize<T> - первый символ в верхний регистр
type Cap = Capitalize<'hello'>; // 'Hello'

// Uncapitalize<T> - первый символ в нижний регистр
type Uncap = Uncapitalize<'Hello'>; // 'hello'
```

#### Практические примеры:

**1. Типобезопасные пути API:**
```typescript
type ApiEndpoint = `/api/${string}`;
type UserEndpoint = `/api/users/${number}`;

function fetchUser(id: number): Promise<User> {
  const url: UserEndpoint = `/api/users/${id}`;
  return fetch(url).then(r => r.json());
}

// Более сложный пример с параметрами
type Route = 
  | '/users'
  | `/users/${number}`
  | `/users/${number}/posts`
  | `/posts/${number}`;

function navigate(route: Route) {
  // implementation
}

navigate('/users'); // ✅
navigate('/users/123'); // ✅
navigate('/users/123/posts'); // ✅
// navigate('/invalid'); // ❌ Error
```

**2. Геттеры и сеттеры:**
```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type User = { name: string; age: number };

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }

type UserSetters = Setters<User>;
// { setName: (value: string) => void; setAge: (value: number) => void; }
```

**3. CSS классы с префиксами:**
```typescript
type BEMBlock = string;
type BEMModifier = string;

type BEMClass<B extends BEMBlock, M extends BEMModifier> = 
  `${B}--${M}`;

type ButtonModifier = 'primary' | 'secondary' | 'danger';
type ButtonClass = BEMClass<'button', ButtonModifier>;
// 'button--primary' | 'button--secondary' | 'button--danger'

// С элементами
type BEMElement<B extends BEMBlock, E extends string> = 
  `${B}__${E}`;

type ButtonElement = BEMElement<'button', 'icon' | 'text' | 'loader'>;
// 'button__icon' | 'button__text' | 'button__loader'
```

**4. Типобезопасные ID:**
```typescript
type EntityId<T extends string> = `${T}_${string}`;

type UserId = EntityId<'user'>; // 'user_...'
type PostId = EntityId<'post'>; // 'post_...'

function getUserById(id: UserId): User {
  // implementation
}

const userId: UserId = 'user_123';
getUserById(userId); // ✅ OK
// getUserById('post_123'); // ❌ Error
```

**5. Event handlers:**
```typescript
type EventName = 'click' | 'change' | 'submit';
type EventHandlerName<T extends EventName> = `on${Capitalize<T>}`;

type EventHandlers = {
  [K in EventName]: EventHandlerName<K>;
}[EventName];
// 'onClick' | 'onChange' | 'onSubmit'

// Применение
type ComponentProps = {
  onClick: () => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
};
```

**6. Валидация строковых форматов:**
```typescript
type Email = `${string}@${string}.${string}`;
type UUID = `${string}-${string}-${string}-${string}-${string}`;

// Более точный email (упрощенный)
type EmailPattern = `${string}@${string}.${Lowercase<string>}`;

const email: Email = 'user@example.com'; // ✅
// const invalid: Email = 'not-an-email'; // ❌
```

**7. Создание типов для конфигурации:**
```typescript
type Env = 'development' | 'staging' | 'production';
type Service = 'api' | 'auth' | 'database';

type ServiceUrl<T extends Service> = `https://${T}.${Env}.example.com`;

type ApiUrl = ServiceUrl<'api'>;
// 'https://api.development.example.com' | 'https://api.staging.example.com' | ...

// С переменными
type ConfigKey<T extends string> = `config.${T}`;
type ThemeKey = ConfigKey<'theme' | 'language'>;
// 'config.theme' | 'config.language'
```

**8. Рекурсивные template literal types:**
```typescript
type Path<T extends string> = T | `${T}/${Path<T>}`;

type ApiPath = Path<'api'>;
// 'api' | 'api/api' | 'api/api/api' | ...

// Более полезный пример с ограничениями
type ValidPath = 
  | 'users'
  | `users/${number}`
  | `users/${number}/posts`
  | `posts/${number}`;
```

**9. Типобезопасные SQL запросы (упрощенный пример):**
```typescript
type TableName = 'users' | 'posts' | 'comments';
type Column<T extends TableName> = 
  T extends 'users' ? 'id' | 'name' | 'email' :
  T extends 'posts' ? 'id' | 'title' | 'content' :
  'id' | 'text';

type SelectQuery<T extends TableName> = 
  `SELECT ${string} FROM ${T}`;

type WhereClause<T extends TableName> = 
  `WHERE ${Column<T>} = ${string}`;

type Query<T extends TableName> = 
  `${SelectQuery<T>} ${WhereClause<T>}`;

const query: Query<'users'> = 'SELECT * FROM users WHERE id = 1';
```

**10. Сложный пример: создание типов для локализации:**
```typescript
type Language = 'en' | 'ru' | 'fr';
type Key = 'greeting' | 'farewell' | 'error';

type LocalizedKey<L extends Language, K extends Key> = 
  `${L}.${K}`;

type LocalizationKeys = 
  LocalizedKey<'en', Key> | 
  LocalizedKey<'ru', Key> | 
  LocalizedKey<'fr', Key>;
// 'en.greeting' | 'en.farewell' | ... | 'ru.greeting' | ...

type LocalizationMap = {
  [K in LocalizationKeys]: string;
};

const translations: LocalizationMap = {
  'en.greeting': 'Hello',
  'en.farewell': 'Goodbye',
  'ru.greeting': 'Привет',
  'ru.farewell': 'До свидания',
  // ...
};
```

#### Инференс с template literal types:

```typescript
type ExtractId<T extends string> = 
  T extends `${infer Prefix}_${infer Id}` ? Id : never;

type UserId = ExtractId<'user_123'>; // '123'
type PostId = ExtractId<'post_456'>; // '456'

// Извлечение параметров из пути
type ExtractParams<T extends string> = 
  T extends `/users/${infer Id}` ? Id : never;

type Param = ExtractParams<'/users/123'>; // '123'
```

#### Важные моменты:

- Template literal types работают только со string literal типами
- Можно комбинировать с conditional types и mapped types
- Встроенные utility типы (Uppercase, Lowercase, Capitalize, Uncapitalize) помогают трансформировать строки
- Используются для создания типобезопасных API, путей, ID, конфигураций
- Можно извлекать части строк с помощью `infer` в conditional types
- Очень полезны для создания DSL (Domain Specific Languages) на уровне типов

---

---

[← Generics и Constraints](./06-generics) | [Type Narrowing →](./08-type-narrowing)
