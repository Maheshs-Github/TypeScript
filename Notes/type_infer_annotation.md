### Type Inference


Type Inference in TypeScript means TypeScript automatically identifies the data type of a variable based on the value assigned to it.

In simple words, we don't always need to tell TypeScript the data type; it can figure it out itself.

## 1. Example without explicit type

```
let username = "Mahesh";
let age = 25;
let isDeveloper = true;
```

What does TypeScript understand?

| Variable      | Inferred type |
| ------------- | ------------- |
| `username`    | `string`      |
| `age`         | `number`      |
| `isDeveloper` | `boolean`     |

We didn't specify any types, but TypeScript automatically inferred them.

## 2. How does it work?

Consider:

```
let age = 25;

age = 30;       // Valid

age = "Mahesh"; // Error
```

Why?

1. Initially, TypeScript sees `age = 25`.
2. It infers that `age` is a number.
3. It remembers that type.
4. When we assign a string, it reports a type error.

## 3. Type inference in functions

TypeScript can also infer return types.

```
function add(a: number, b: number) {
    return a + b;
}
```

Here, we didn't specify the return type.

But TypeScript understands:

```
function add(a: number, b: number): number
```

Because both parameters are numbers and their addition produces a number.

## 4. Explicit Type vs Type Inference

```
// Explicit typing
let name: string = "Mahesh";

// Type inference
let username = "Mahesh";
```

Both are valid.

The second approach is shorter because TypeScript already knows the type.

## 5. One important thing: Type inference has limitations

```
let data;

data = 25;
data = "Mahesh";
```

Here, TypeScript may infer `any` for `data` because there was no initial value to determine its type (depending on compiler settings).

So inference doesn't mean TypeScript can always figure out your intention.

## Quick check

What will TypeScript infer here?

```
let price = 499;

price = 599;
price = "Free";
```

TypeScript infers `number`; the last assignment gives an error.

TypeScript infers `any`; all assignments are valid.

TypeScript automatically changes the type to string.




### Type Annotation


Type Annotation in TypeScript means explicitly specifying the data type of a variable, function parameter, or return value.

In simple words, we tell TypeScript what type of data a variable should accept.

## 1. Variable Type Annotation

```
let username: string = "Mahesh";
let age: number = 25;
let isDeveloper: boolean = true;
```

Here:

- `username: string` → username must be a string.
- `age: number` → age must be a number.
- `isDeveloper: boolean` → must be a boolean.

Syntax:

```
let variableName: dataType = value;
```

## 2. Function Type Annotation

```
function add(a: number, b: number): number {
    return a + b;
}
```

Here:

- `a: number` → parameter annotation.
- `b: number` → parameter annotation.
- `: number` after `)` → return type annotation.

## 3. Array Type Annotation

```
let numbers: number[] = [10, 20, 30];

let names: string[] = ["Mahesh", "Rahul"];
```

This ensures that the arrays contain the specified types.

## 4. Type Annotation vs Type Inference

| Type Annotation              | Type Inference                 |
| ---------------------------- | ------------------------------ |
| Developer specifies the type | TypeScript determines the type |
| Explicit                     | Automatic                      |
| `let age: number = 25`       | `let age = 25`                 |

Both achieve type safety during development.

Remember:

- Type Annotation = We tell TypeScript the type.
- Type Inference = TypeScript figures out the type.
