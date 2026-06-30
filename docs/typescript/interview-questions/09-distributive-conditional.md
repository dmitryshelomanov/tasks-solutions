---
title: Distributive Conditional Types
description: Вопрос с собеседования по TypeScript — Distributive Conditional Types
---

# Distributive Conditional Types и их поведение

### Вопрос
Что такое distributive conditional types в TypeScript? Как они работают с union типами? Когда распределение происходит, а когда нет? Как предотвратить распределение? Приведите примеры.

### Ответ

**Distributive Conditional Types** — это особенность conditional types, при которой они автоматически распределяются по каждому члену union типа при применении к union.

#### Как работает распределение:

Когда conditional type `T extends U ? X : Y` применяется к union типу `A | B`, он распределяется как `(A extends U ? X : Y) | (B extends U ? X : Y)`.

#### Примеры распределения:

**1. Базовое распределение:**
```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Распадается на: (string extends any ? string[] : never) | (number extends any ? number[] : never)
// Результат: string[] | number[]
// НЕ (string | number)[]

const arr1: StrOrNumArray = ['hello']; // ✅ string[]
const arr2: StrOrNumArray = [42]; // ✅ number[]
// const arr3: StrOrNumArray = ['hello', 42]; // ❌ Error: не string[] и не number[]
```

**2. Условное распределение:**
```typescript
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>;
// Распадается на:
// (string extends string ? never : string) |
// (number extends string ? never : number) |
// (boolean extends string ? never : boolean)
// Результат: never | number | boolean = number | boolean
```

**3. Extract (противоположность Exclude):**
```typescript
type Extract<T, U> = T extends U ? T : never;

type StringOrNumber = Extract<string | number | boolean, string | number>;
// Распадается на:
// (string extends string | number ? string : never) |
// (number extends string | number ? number : never) |
// (boolean extends string | number ? boolean : never)
// Результат: string | number | never = string | number
```

#### Когда распределение НЕ происходит:

**1. С помощью кортежей (tuples):**
```typescript
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArray2 = ToArrayNonDist<string | number>;
// Не распределяется, потому что проверяется [string | number] extends [any]
// Результат: (string | number)[]

const arr: StrOrNumArray2 = ['hello', 42]; // ✅ OK
```

**2. Когда проверяется структура, а не сам тип:**
```typescript
type NonDist<T> = T extends any[] ? T : never;

type Test1 = NonDist<string[] | number[]>;
// Распределяется: string[] | number[]

type NonDist2<T> = [T] extends [any[]] ? T : never;

type Test2 = NonDist2<string[] | number[]>;
// Не распределяется: never (потому что [string[] | number[]] не extends [any[]])
```

**3. С never:**
```typescript
type Test<T> = T extends any ? T[] : never;

type WithNever = Test<string | never>;
// Результат: string[] (never игнорируется в union)
```

#### Практические примеры:

**1. Утилита для обработки union типов:**
```typescript
// Распределительный вариант - обрабатывает каждый тип отдельно
type MapToArray<T> = T extends any ? T[] : never;

type Result1 = MapToArray<string | number>; 
// string[] | number[]

// Нераспределительный вариант - обрабатывает union как целое
type MapToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Result2 = MapToArrayNonDist<string | number>; 
// (string | number)[]
```

**2. Условное исключение из union:**
```typescript
// Удаление определенных типов
type RemoveFromUnion<T, U> = T extends U ? never : T;

type WithoutNull = RemoveFromUnion<string | number | null, null>;
// string | number

// Удаление нескольких типов
type Primitive = string | number | boolean;
type WithoutPrimitives<T> = T extends Primitive ? never : T;

type Test = WithoutPrimitives<string | object | number>;
// object
```

**3. Преобразование union в intersection:**
```typescript
type UnionToIntersection<U> = 
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void 
    ? I 
    : never;

type Example = UnionToIntersection<{ a: string } | { b: number }>;
// { a: string } & { b: number }
// = { a: string; b: number }
```

**4. Получение последнего типа в union:**
```typescript
type LastOfUnion<T> = 
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R 
    ? R 
    : never;

type Last = LastOfUnion<1 | 2 | 3>; // 3
```

**5. Преобразование union в tuple:**
```typescript
type UnionToTuple<T> = 
  UnionToIntersection<T extends any ? () => T : never> extends infer U
    ? U extends () => infer R
      ? [...UnionToTuple<Exclude<T, R>>, R]
      : []
    : [];

type Tuple = UnionToTuple<'a' | 'b' | 'c'>;
// ['a', 'b', 'c'] (порядок может отличаться)
```

**6. Проверка, является ли тип union:**
```typescript
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type Test1 = IsUnion<string | number>; // true
type Test2 = IsUnion<string>; // false
```

#### Полезные паттерны:

**1. Условная обработка union:**
```typescript
type ProcessUnion<T> = T extends string
  ? `String: ${T}`
  : T extends number
  ? `Number: ${T}`
  : never;

type Processed = ProcessUnion<'hello' | 42 | true>;
// 'String: hello' | 'Number: 42' | never
// = 'String: hello' | 'Number: 42'
```

**2. Создание mapped type из union:**
```typescript
type UnionToRecord<T extends string | number | symbol> = {
  [K in T]: K;
};

type Keys = 'a' | 'b' | 'c';
type RecordFromUnion = UnionToRecord<Keys>;
// { a: 'a'; b: 'b'; c: 'c'; }
```

**3. Фильтрация union по условию:**
```typescript
type FilterUnion<T, U> = T extends U ? T : never;

type Numbers = FilterUnion<string | number | boolean, number>;
// number

// Обратное - исключение типов
type ExcludeFromUnion<T, U> = T extends U ? never : T;
```

#### Когда использовать каждый подход:

**Используйте распределительный подход когда:**
- Нужно обработать каждый тип в union отдельно
- Создаете утилиты типа Exclude, Extract
- Нужно применить преобразование к каждому члену union

**Предотвращайте распределение когда:**
- Нужно обработать union как единое целое
- Создаете массивы или кортежи из union
- Проверяете структуру union целиком

#### Важные моменты:

- Распределение происходит только когда проверяется `T extends U`, где T - type parameter
- Распределение не происходит, если T уже не type parameter (например, конкретный тип)
- Можно предотвратить распределение, обернув в кортеж: `[T] extends [U]`
- `never` автоматически удаляется из union
- Распределительные conditional types очень полезны для создания utility types
- Понимание распределения критично для работы с продвинутыми типами TypeScript

---

---

[← Type Narrowing](./08-type-narrowing) | [Branded Types и Nominal Typing →](./10-branded-types)
