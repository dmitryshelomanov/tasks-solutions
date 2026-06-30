---
title: Branded Types и Nominal Typing
description: Вопрос с собеседования по TypeScript — Branded Types и Nominal Typing
---

# Branded Types и Nominal Typing в TypeScript

### Вопрос
Что такое branded types (брендированные типы) и nominal typing в TypeScript? Зачем они нужны, если TypeScript использует структурную типизацию? Как создать branded types? Приведите практические примеры использования.

### Ответ

**Branded Types** (брендированные типы) — это способ создания номинальной типизации в структурно типизированном TypeScript. Они позволяют различать типы, которые структурно одинаковы, но семантически различны.

**Проблема структурной типизации:**
TypeScript использует структурную типизацию (duck typing), что означает, что два типа совместимы, если они имеют одинаковую структуру, даже если они семантически различны.

```typescript
type UserId = number;
type ProductId = number;

function getUser(id: UserId): User {
  // ...
}

const productId: ProductId = 123;
getUser(productId); // ✅ TypeScript позволяет, но это ошибка логики!
```

#### Создание Branded Types:

**1. Базовый подход с unique symbol:**
```typescript
// Брендированные типы с unique symbol
declare const UserIdBrand: unique symbol;
declare const ProductIdBrand: unique symbol;

type UserId = number & { readonly [UserIdBrand]: true };
type ProductId = number & { readonly [ProductIdBrand]: true };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

function getUser(id: UserId): User {
  // implementation
  return {} as User;
}

const userId = createUserId(123);
const productId = createProductId(123);

getUser(userId); // ✅ OK
// getUser(productId); // ❌ Error: Type 'ProductId' is not assignable to type 'UserId'
```

**2. Универсальный helper:**
```typescript
type Brand<T, B> = T & { readonly __brand: B };

type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;
type Email = Brand<string, 'Email'>;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  return email as Email;
}

function sendEmail(to: Email, subject: string) {
  // implementation
}

const email = createEmail('user@example.com');
// const invalid = createEmail('not-an-email'); // Runtime error

sendEmail(email, 'Hello'); // ✅ OK
// sendEmail('user@example.com', 'Hello'); // ❌ Error: expected Email branded type
```

**3. С несколькими брендами:**
```typescript
type Brand<T, B extends string> = T & { readonly [K in B]: true };

type UserId = Brand<number, 'UserId'>;
type AdminId = Brand<number, 'UserId' | 'AdminId'>; // Можно комбинировать

// Или более строгий подход
type Brand<T, B> = T & { readonly __brand: B };
type MultiBrand<T, B1, B2> = Brand<Brand<T, B1>, B2>;
```

#### Практические примеры:

**1. ID типы для разных сущностей:**
```typescript
type Brand<T, B> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;
type CommentId = Brand<string, 'CommentId'>;

class UserService {
  getUser(id: UserId): Promise<User> {
    // Можно быть уверенным, что это именно UserId
    return fetch(`/api/users/${id}`).then(r => r.json());
  }
  
  getPost(id: PostId): Promise<Post> {
    return fetch(`/api/posts/${id}`).then(r => r.json());
  }
}

const userId: UserId = 'user-123' as UserId;
const postId: PostId = 'post-456' as PostId;

const service = new UserService();
service.getUser(userId); // ✅ OK
// service.getUser(postId); // ❌ Error
```

**2. Email и другие строковые типы:**
```typescript
type Email = Brand<string, 'Email'>;
type URL = Brand<string, 'URL'>;
type HTML = Brand<string, 'HTML'>;

function createEmail(value: string): Email {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error('Invalid email format');
  }
  return value as Email;
}

function createURL(value: string): URL {
  try {
    new globalThis.URL(value);
    return value as URL;
  } catch {
    throw new Error('Invalid URL');
  }
}

function sendEmail(to: Email, body: HTML) {
  // implementation
}

const email = createEmail('user@example.com');
const url = createURL('https://example.com');

// sendEmail(url, 'body'); // ❌ Error: URL не может быть использован как Email
```

**3. Единицы измерения:**
```typescript
type Brand<T, B> = T & { readonly __brand: B };

type Meters = Brand<number, 'Meters'>;
type Kilometers = Brand<number, 'Kilometers'>;
type Miles = Brand<number, 'Miles'>;

function createMeters(value: number): Meters {
  return value as Meters;
}

function createKilometers(value: number): Kilometers {
  return value as Kilometers;
}

function metersToKilometers(m: Meters): Kilometers {
  return (m / 1000) as Kilometers;
}

function addMeters(a: Meters, b: Meters): Meters {
  return (a + b) as Meters;
}

const distance1 = createMeters(1000);
const distance2 = createMeters(500);
const sum = addMeters(distance1, distance2); // ✅ OK

const km = createKilometers(1);
// const sum2 = addMeters(distance1, km); // ❌ Error: нельзя смешивать метры и километры
```

**4. Валидированные данные:**
```typescript
type Validated<T> = Brand<T, 'Validated'>;

type ValidatedUser = Validated<{
  name: string;
  email: string;
  age: number;
}>;

function validateUser(user: { name: string; email: string; age: number }): ValidatedUser {
  if (!user.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (user.age < 0) {
    throw new Error('Invalid age');
  }
  return user as ValidatedUser;
}

function processUser(user: ValidatedUser) {
  // Можно быть уверенным, что данные валидны
  console.log(`Processing ${user.name}`);
}

const rawUser = { name: 'John', email: 'john@example.com', age: 30 };
const validated = validateUser(rawUser);
processUser(validated); // ✅ OK
// processUser(rawUser); // ❌ Error: ожидается ValidatedUser
```

**5. Non-empty массивы и строки:**
```typescript
type NonEmptyString = Brand<string, 'NonEmptyString'>;
type NonEmptyArray<T> = Brand<T[], 'NonEmptyArray'>;

function createNonEmptyString(value: string): NonEmptyString {
  if (value.length === 0) {
    throw new Error('String cannot be empty');
  }
  return value as NonEmptyString;
}

function getFirst<T>(arr: NonEmptyArray<T>): T {
  return arr[0]; // Безопасно, так как массив точно не пустой
}

const str = createNonEmptyString('hello');
const arr: NonEmptyArray<number> = [1, 2, 3] as NonEmptyArray<number>;
const first = getFirst(arr); // ✅ OK, тип number
```

**6. Timestamp и Date:**
```typescript
type UnixTimestamp = Brand<number, 'UnixTimestamp'>;
type ISODateString = Brand<string, 'ISODateString'>;

function createTimestamp(value: number): UnixTimestamp {
  if (value < 0) {
    throw new Error('Invalid timestamp');
  }
  return value as UnixTimestamp;
}

function timestampToISO(timestamp: UnixTimestamp): ISODateString {
  return new Date(timestamp).toISOString() as ISODateString;
}

function parseISO(iso: ISODateString): UnixTimestamp {
  return Math.floor(new Date(iso).getTime() / 1000) as UnixTimestamp;
}
```

**7. API версии и эндпоинты:**
```typescript
type ApiVersion = Brand<string, 'ApiVersion'>;
type Endpoint = Brand<string, 'Endpoint'>;

const v1: ApiVersion = 'v1' as ApiVersion;
const v2: ApiVersion = 'v2' as ApiVersion;

function createEndpoint(version: ApiVersion, path: string): Endpoint {
  return `/api/${version}${path}` as Endpoint;
}

function makeRequest(endpoint: Endpoint) {
  // Можно быть уверенным, что endpoint правильно сформирован
  return fetch(endpoint);
}

const endpoint = createEndpoint(v1, '/users');
makeRequest(endpoint); // ✅ OK
// makeRequest('/api/v1/users'); // ❌ Error: нужен брендированный Endpoint
```

#### Расширенные техники:

**1. Opaque types (еще более строгие):**
```typescript
// Opaque type - бренд не экспортируется, нельзя создать напрямую
declare const OpaqueUserId: unique symbol;

export type UserId = number & { readonly [OpaqueUserId]: true };

// Фабричная функция - единственный способ создания
export function createUserId(id: number): UserId {
  if (id <= 0) {
    throw new Error('Invalid user ID');
  }
  return id as UserId;
}

// Снаружи модуля невозможно создать UserId напрямую
```

**2. Комбинирование с другими типами:**
```typescript
type Brand<T, B> = T & { readonly __brand: B };

type PositiveNumber = Brand<number, 'PositiveNumber'>;
type Integer = Brand<number, 'Integer'>;
type PositiveInteger = Brand<PositiveNumber, 'Integer'>; // Комбинация

function createPositiveInteger(value: number): PositiveInteger {
  if (value <= 0 || !Number.isInteger(value)) {
    throw new Error('Must be positive integer');
  }
  return value as PositiveInteger;
}
```

#### Важные моменты:

- Branded types добавляют метку типа без изменения структуры
- Предотвращают случайное смешивание семантически разных типов
- Не добавляют overhead во время выполнения (это compile-time фича)
- Создаются через type assertions, поэтому нужны фабричные функции для валидации
- Особенно полезны для ID, единиц измерения, валидированных данных
- `unique symbol` более строгий, чем строковый бренд
- Opaque types еще строже - бренд не экспортируется

---

## Заключение

Эти 10 вопросов покрывают продвинутые темы TypeScript уровня Middle+, которые часто встречаются на технических собеседованиях. Понимание этих концепций критично для создания типобезопасных и поддерживаемых приложений на TypeScript.

Для углубленного изучения рекомендуется:
- Практиковаться с примерами кода
- Изучать стандартные utility types из библиотеки TypeScript
- Экспериментировать с созданием собственных сложных типов
- Читать исходный код популярных библиотек, использующих TypeScript

---

[← Distributive Conditional Types](./09-distributive-conditional) | [Обзор](../interview-questions-overview)
