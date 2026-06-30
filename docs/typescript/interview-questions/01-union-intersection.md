---
title: Union и Intersection типы
description: Вопрос с собеседования по TypeScript — Union и Intersection типы
---

# Union и Intersection типы, разница и практическое применение

### Вопрос
Объясните разницу между union (`|`) и intersection (`&`) типами в TypeScript. В каких случаях использовать каждый из них? Что происходит при пересечении несовместимых типов?

### Ответ

**Union типы** (`|`) — это тип, который может быть одним из нескольких типов. Объект с union типом должен иметь свойства, общие для всех типов в union.

**Intersection типы** (`&`) — это тип, который объединяет все свойства из всех типов. Объект с intersection типом должен иметь все свойства из всех типов.

#### Union типы:

```typescript
type StringOrNumber = string | number;

function process(value: StringOrNumber) {
  // value может быть либо string, либо number
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}

// Union с объектами
type Circle = { kind: 'circle'; radius: number };
type Square = { kind: 'square'; side: number };
type Shape = Circle | Square;

function area(shape: Shape) {
  // TypeScript требует проверку типа (type narrowing)
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
  return shape.side ** 2;
}
```

**Важное правило для union объектов:**
- Можно обращаться только к общим свойствам без type narrowing
- После type narrowing доступны все свойства конкретного типа

```typescript
type A = { a: number; common: string };
type B = { b: string; common: string };
type AB = A | B;

function test(x: AB) {
  console.log(x.common); // ✅ OK - общее свойство
  // console.log(x.a); // ❌ Error - не общее свойство
  // console.log(x.b); // ❌ Error - не общее свойство
  
  if ('a' in x) {
    console.log(x.a); // ✅ OK - type narrowing
  }
}
```

#### Intersection типы:

```typescript
type Person = { name: string; age: number };
type Employee = { company: string; salary: number };
type PersonEmployee = Person & Employee;

// PersonEmployee требует все свойства:
const worker: PersonEmployee = {
  name: 'John',
  age: 30,
  company: 'Acme',
  salary: 50000
};

// Пересечение примитивов - получается never
type Impossible = string & number; // never (не может быть одновременно string и number)

// Пересечение объектов с конфликтующими свойствами
type A = { prop: string };
type B = { prop: number };
type Conflict = A & B; // { prop: never } - свойство не может быть одновременно string и number
```

#### Практические примеры:

**1. Расширение типов:**
```typescript
type BaseUser = { id: number; email: string };
type AdminUser = BaseUser & { role: 'admin'; permissions: string[] };
type RegularUser = BaseUser & { role: 'user' };

type User = AdminUser | RegularUser;
```

**2. Миксины:**
```typescript
type Timestamped = { createdAt: Date; updatedAt: Date };
type Identifiable = { id: string };
type Entity = Timestamped & Identifiable;

const product: Entity = {
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date()
};
```

**3. Условная логика с union:**
```typescript
type Success<T> = { success: true; data: T };
type Error = { success: false; error: string };
type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.data); // TypeScript знает, что это Success<T>
  } else {
    console.log(result.error); // TypeScript знает, что это Error
  }
}
```

#### Важные моменты:

- **Union (`|`)** = "или" — значение должно соответствовать хотя бы одному типу
- **Intersection (`&`)** = "и" — значение должно соответствовать всем типам
- Union объектов даёт доступ только к общим свойствам
- Intersection объектов объединяет все свойства
- Пересечение несовместимых типов даёт `never`

---

---

[Type Assertions и Type Guards →](./02-type-assertions-guards)
