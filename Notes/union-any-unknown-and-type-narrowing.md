### TypeScript: Union Types, Literal Types, Any, Unknown & Type Narrowing


Great! These are important TypeScript concepts. Let's understand your code step by step, including Union Types, Literal Types, `any`, and `undefined`.

Your examples are good because they show how TypeScript handles variables that can have different possible values.

# 1. Union Types (`|`)

A Union Type allows a variable to accept more than one specified data type.

Your code:

```
let userName: string | number = "Mahesh";

userName = 123;
```

Here:

```
string | number
```

means the variable can hold either a `string` OR a `number`.

Both assignments are valid:

```
userName = "Mahesh"; // Valid
userName = 123;      // Valid

userName = true;     // Error
```

Why?

Because `boolean` isn't part of our declared union.

Syntax:

```
let variable: type1 | type2 | type3;
```

Think of `|` as an OR condition for types.

## Real-world example

Imagine your LMS accepts a user ID as either a number or a string.

```
let userId: string | number;

userId = "USR101";
userId = 101;
```

This is useful when working with API responses or systems where identifiers can have different representations.

# 2. Literal Types

Now let's understand your second example.

```
let status: "pending" | "completed" | "error" = "pending";

status = "completed"; // Valid

status = "dunno"; // Error
```

Here is something interesting.

Previously, we used types such as:

- `string`
- `number`
- `boolean`

But here, we're specifying exact allowed values.

This is called Literal Types.

In your example, `status` can only contain three possible string values:

Allowed status values

pending

completed

error

Any other string is rejected by TypeScript.

Why is this useful?

Imagine your LMS has a payment status.

```
type PaymentStatus =
  | "created"
  | "pending"
  | "success"
  | "failed";

let paymentStatus: PaymentStatus = "created";
```

Now you cannot accidentally assign `"sucess"` instead of `"success"`.

Notice that we introduced `type` here. This is called a Type Alias. It lets us give a reusable name to a type.

# 3. Understanding `undefined` in your third example

Let's look at your code.

```
const orders = ['1', '2', '3', '4', '5'];

let currentorder: string | undefined;

for (let order of orders) {
    if (order === '2') {
        currentorder = order;
        break;
    }
}

console.log(currentorder);
```

First, understand this declaration:

```
let currentorder: string | undefined;
```

It means:

`currentorder` can contain either a string or `undefined`.

Why do we need `undefined`?

Because we don't know whether the order will be found.

Let's consider two scenarios.

Scenario A: Order found

```
currentorder = "2";
```

Output:

```
2
```

Scenario B: Order not found

If the loop doesn't find a matching order, `currentorder` remains `undefined`.

Output:

```
undefined
```

This is a good example of Union Types being used with a possible missing value.

One important detail: with `strictNullChecks` enabled, TypeScript makes you account for `undefined` when using this variable.

# 4. What is `any`?

Now let's understand `any`, which is quite different from Union Types.

`any` tells TypeScript:

"Don't check the type of this variable. Allow me to assign anything."

Example:

```
let data: any = 25;

data = "Mahesh";
data = true;
data = { name: "Mahesh" };
data = [10, 20, 30];
```

All assignments are valid.

Even this:

```
let data: any = 25;

data.toUpperCase();
```

TypeScript won't report an error, even though a number doesn't have a `toUpperCase()` method.

This is why excessive use of `any` defeats the purpose of TypeScript.

## 5. Union vs Any

| Union Type                  | Any                       |
| --------------------------- | ------------------------- |
| Restricts allowed types     | Allows any type           |
| Type checking is maintained | Type checking is bypassed |
| Safer                       | Less safe                 |
| `string \\| number`         | `any`                     |

Example:

```
// Union
let value: string | number = 100;

value = "Hello"; // Valid
value = true;    // Error

// Any
let data: any = 100;

data = "Hello";  // Valid
data = true;     // Valid
```

My recommendation: Prefer Union Types whenever you know the possible types.

# 6. Related concept: `unknown`

There is another type called `unknown`.

It is similar to `any` because it can accept any value, but it doesn't allow you to use that value without checking its type first.

```
let data: unknown = "Mahesh";

data = 25;       // Valid
data = true;     // Valid

// data.toUpperCase(); // Error
```

To use the value, we first check its type:

```
let data: unknown = "Mahesh";

if (typeof data === "string") {
    console.log(data.toUpperCase());
}
```

Here TypeScript understands that inside the `if` block, `data` is a string.

This is called Type Narrowing.

| Type                | Meaning                                      |
| ------------------- | -------------------------------------------- |
| `any`               | Accept anything and skip type checking       |
| `unknown`           | Accept anything, but check before using      |
| `string \\| number` | Accept only the specified types              |
| `undefined`         | Represents an uninitialized or missing value |
| `null`              | Represents an intentional absence of a value |

# 7. Another important concept: Type Narrowing

Let's connect everything.

Suppose:

```
let userName: string | number = "Mahesh";
```

Now imagine you want to call `toUpperCase()`.

```
userName.toUpperCase();
```

TypeScript complains because `userName` might be a number.

We can narrow the type:

```
if (typeof userName === "string") {
    console.log(userName.toUpperCase());
}
```

Now TypeScript knows that inside this block, `userName` is a string.

This is called Type Narrowing.

# 8. Quick practice

What will happen here?

```
let value: string | number = "Hello";

if (typeof value === "string") {
    value.toUpperCase();
}
```

Works because TypeScript narrows the type to string.

Error because value can also be a number.

TypeScript automatically converts number into string.

Check answer

For your GitHub notes, remember these concepts in this order:

1. Union Types (`|`)
2. Literal Types
3. Type Alias (`type`)
4. `undefined` and `null`
5. `any`
6. `unknown`
7. Type Narrowing (`typeof`)

These concepts will be particularly useful when working with API responses, React props, Redux state and your LMS payment statuses.