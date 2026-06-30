---
title: Conditional Types
description: Вопрос с собеседования по TypeScript — Conditional Types
---

# Conditional Types (условные типы) и их применение

### Вопрос
Что такое conditional types в TypeScript? Как они работают? Объясните синтаксис `T extends U ? X : Y`. Приведите примеры практического использования.

### Ответ

**Conditional Types** — это типы, которые выбирают один из двух типов на основе условия, проверяющего, расширяет ли один тип другой.

#### Базовый синтаксис:

```typescript
T extends U ? X : Y
```

Это читается как: "Если тип T расширяет тип U, то тип X, иначе тип Y".

#### Простые примеры:

```typescript
// Проверка, является ли тип строкой
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
type Test3 = IsString<'literal'>; // true

// Извлечение типа элемента массива
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element1 = ArrayElement<string[]>; // string
type Element2 = ArrayElement<number[]>; // number
type Element3 = ArrayElement<boolean>; // never

// Проверка, является ли тип функцией
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type Test4 = IsFunction<() => void>; // true
type Test5 = IsFunction<string>; // false
```

#### Infer keyword:

`infer` позволяет вывести тип внутри conditional type.

```typescript
// Извлечение типа возвращаемого значения функции
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type FuncReturn = ReturnType<() => string>; // string
type NumberReturn = ReturnType<() => number>; // number

// Извлечение типа первого аргумента
type FirstArg<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never;

type First = FirstArg<(x: string, y: number) => void>; // string

// Извлечение типа свойства объекта
type PropertyType<T, K extends keyof T> = T[K];

type User = { name: string; age: number };
type NameType = PropertyType<User, 'name'>; // string
```

#### Распределительные conditional types:

Когда conditional type применяется к union типу, он распределяется по каждому члену union.

```typescript
// Распределение по union
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>; 
// Распадается на: string[] | number[] (не (string | number)[])

// Предотвращение распределения с помощью []
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArray2 = ToArrayNonDist<string | number>;
// Результат: (string | number)[]
```

#### Практические примеры:

**1. Утилита для извлечения промисов:**
```typescript
type UnwrapPromise<T> = T extends Promise<infer U> 
  ? U extends Promise<any> 
    ? UnwrapPromise<U> 
    : U 
  : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<Promise<Promise<number>>>; // number (рекурсивно)
type C = UnwrapPromise<string>; // string
```

**2. Flatten типов:**
```typescript
type Flatten<T> = T extends (infer U)[] 
  ? U extends any[] 
    ? Flatten<U> 
    : U 
  : T;

type Nested = Flatten<number[][]>; // number
type Deep = Flatten<number[][][]>; // number (рекурсивно)
```

**3. Проверка наличия свойства:**
```typescript
type HasProperty<T, K extends string> = K extends keyof T ? true : false;

type User = { name: string; age: number };
type HasName = HasProperty<User, 'name'>; // true
type HasEmail = HasProperty<User, 'email'>; // false
```

**4. Условное добавление свойств:**
```typescript
type ApiResponse<T, E extends boolean = false> = E extends true
  ? { data: T; error: string }
  : { data: T };

type SuccessResponse = ApiResponse<string>; // { data: string }
type ErrorResponse = ApiResponse<string, true>; // { data: string; error: string }
```

**5. Извлечение параметров функции:**
```typescript
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;

type FuncParams = Parameters<(a: string, b: number) => void>; // [string, number]
```

**6. Условное исключение never:**
```typescript
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>; // number | boolean
```

**7. Сложный пример: извлечение типа из вложенной структуры:**
```typescript
type ExtractNested<T> = T extends { data: infer U }
  ? U extends { value: infer V }
    ? V
    : U
  : never;

type Nested = { data: { value: number } };
type Extracted = ExtractNested<Nested>; // number
```

#### Реальные применения:

**Выбор типа на основе флага:**
```typescript
type ConditionalProps<T extends boolean> = T extends true
  ? { required: true; defaultValue: string }
  : { required?: false; defaultValue?: string };

function createField<T extends boolean>(isRequired: T): ConditionalProps<T> {
  if (isRequired) {
    return { required: true, defaultValue: '' } as ConditionalProps<T>;
  }
  return {} as ConditionalProps<T>;
}
```

#### Важные моменты:

- Conditional types вычисляются во время компиляции
- Распределительное поведение применяется к union типам
- `infer` работает только в extends части conditional type
- Conditional types могут быть рекурсивными
- Используются для создания сложных utility types

---

---

[← Type Assertions и Type Guards](./02-type-assertions-guards) | [Mapped Types →](./04-mapped-types)
