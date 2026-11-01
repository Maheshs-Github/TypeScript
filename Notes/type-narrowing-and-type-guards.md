### TypeScript: Type Narrowing and Type Guards


Let's understand this properly. Your code covers almost all the important TypeScript narrowing techniques:

1. `typeof` narrowing
2. Truthiness narrowing
3. Literal type narrowing
4. `instanceof` narrowing
5. Custom Type Guards (`is`)
6. Discriminated Unions
7. `in` operator narrowing
8. Array type guards

We'll understand the logic behind each one, using your Chai examples.

# 1. What is Type Narrowing?

Type Narrowing means reducing a variable's possible types based on a condition so TypeScript can understand what type it currently represents.

For example:

```
function getChai(kind: string | number) {
    if (typeof kind === "string") {
        return `Your order for ${kind} is being sent`;
    }

    return `Your order total is: ${kind}`;
}
```

Initially:

```
kind: string | number
```

TypeScript doesn't know whether `kind` is a string or number.

But when we write:

```
if (typeof kind === "string")
```

TypeScript understands:

- Inside the `if` block → `kind` is a string.
- Outside the `if` block → `kind` is a number, because the string possibility has been eliminated.

How narrowing happens

`string | number`

typeof kind === "string"

if block\
`string`

else block\
`number`

This is Type Narrowing.

# 2. What are Type Guards?

A Type Guard is a condition or check that helps TypeScript identify the actual type of a value.

For example:

```
if (typeof kind === "string")
```

Here, `typeof` is the type-checking mechanism, and TypeScript uses that check to narrow the type.

Relationship:

- Type Guard = The check we perform.
- Type Narrowing = The result of that check.

Let's explore the different guards.

# 3. `typeof` Type Guard

You've already used it in two places.

```
function orderChai(
    size: "small" | "medium" | "large" | number
) {
    if (typeof size !== "number") {
        return `${size} Cutting Chai`;
    }

    return `Chai Order is: ${size}`;
}
```

Let's understand.

Initially, `size` can be:

```
"small" | "medium" | "large" | number
```

When we check:

```
typeof size !== "number"
```

The possibilities become:

- If condition is true → `"small" | "medium" | "large"`
- If condition is false → `number`

This is particularly useful when combining primitive types and literal types.

Remember: `typeof` works especially well with primitive types such as string, number, boolean, bigint, symbol, and undefined.

# 4. Truthiness Narrowing

Your example:

```
function serverChai(msg?: string) {
    if (msg) {
        return `Serving ${msg}`;
    }

    return `Serving the Default Chai`;
}
```

First, what does `msg?: string` mean?

It means the parameter is optional.

Conceptually:

```
msg: string | undefined
```

Now consider:

```
if (msg)
```

TypeScript checks whether `msg` is truthy.

If it is truthy, TypeScript knows that it isn't `undefined`, so it narrows it to `string`.

But there's an important detail!

An empty string `""` is also falsy.

For example:

```
serverChai("");        // Default Chai
serverChai("Masala");  // Serving Masala
serverChai();          // Default Chai
```

If you only want to check whether the argument was provided, even when it's an empty string, use:

```
if (msg !== undefined) {
    return `Serving ${msg}`;
}
```

This distinction is important in real applications.

# 5. `instanceof` Type Guard

Now let's look at your classes.

```
class KulhadChai {
    serve() {
        return `Serving Kulhad Chai`;
    }
}

class CuttingChai {
    serve() {
        return `Serving Cutting Chai`;
    }
}
```

Both classes have a `serve()` method, but they represent different class instances.

Your function:

```
function serve(chai: KulhadChai | CuttingChai) {
    if (chai instanceof KulhadChai) {
        return chai.serve();
    }

    return chai.serve();
}
```

What is happening?

Initially:

```
chai: KulhadChai | CuttingChai
```

When we check:

```
chai instanceof KulhadChai
```

TypeScript understands:

- If true → `chai` is a `KulhadChai` instance.
- If false → `chai` is a `CuttingChai` instance.

Why?

Because `instanceof` checks whether an object belongs to a particular class or constructor's prototype chain.

Example:

```
serve(new KulhadChai());
serve(new CuttingChai());
```

Important: Your original code only handles the `KulhadChai` branch. It doesn't return anything for `CuttingChai`, so the function can return `undefined`. Add the second return as shown above.

# 6. Custom Type Guards (`is`)

This is one of the most important concepts in your code.

Your example:

```
type ChaiOrder = {
    type: string;
    sugar: number;
};
```

We have defined the expected structure of a ChaiOrder.

Now look at your function:

```
function isChaiOrder(obj: unknown): obj is ChaiOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "type" in obj &&
        typeof obj.type === "string" &&
        "sugar" in obj &&
        typeof obj.sugar === "number"
    );
}
```

Let's understand the important part:

```
obj is ChaiOrder
```

This is called a Type Predicate.

It tells TypeScript:

"If this function returns true, treat `obj` as a `ChaiOrder`."

Why do we need this?

Imagine we receive data from an API, and we don't know its actual structure.

```
const data: unknown = {
    type: "Masala",
    sugar: 2
};
```

We cannot safely assume that this is a valid `ChaiOrder`.

So we create a function to check its structure.

The function checks:

1. Is it an object?
2. Is it not `null`?
3. Does it have a `type` property?
4. Is `type` a string?
5. Does it have a `sugar` property?
6. Is `sugar` a number?

Only when all checks pass does it return `true`.

Now let's use it:

```
function serveOrder(item: ChaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar} sugar`;
    }

    return `Serving custom chai: ${item}`;
}
```

Here:

- If `isChaiOrder(item)` returns true → TypeScript knows `item` is a `ChaiOrder`.
- Otherwise → TypeScript knows `item` is a string.

This is custom type narrowing!

Custom Type Guard flow

`ChaiOrder | string`

`isChaiOrder(item)`

true\
`ChaiOrder`

false\
`string`

A small correction to your original code: Use `string` rather than `String` in your type definition. Also prefer `unknown` instead of `any` for untrusted input.

# 7. Discriminated Unions

Now this is a very useful pattern, especially in real-world TypeScript applications.

Your code:

```
type MasalaChai = {
    type: "masala";
    spicelevel: number;
};

type GingerChai = {
    type: "ginger";
    gingeramount: number;
};

type MilkChai = {
    type: "milk";
    milkamount: number;
};

type Chai = MasalaChai | GingerChai | MilkChai;
```

Notice something?

All three types have a common property:

```
type
```

But each has a different literal value.

| Type       | Discriminating property |
| ---------- | ----------------------- |
| MasalaChai | `"masala"`              |
| GingerChai | `"ginger"`              |
| MilkChai   | `"milk"`                |

This common property is called the Discriminant.

Now look at your function:

```
function makeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            return `Masala Chai`;

        case "ginger":
            return `Ginger Chai`;

        case "milk":
            return `Milk Chai`;

        default:
            return `Normal Chai`;
    }
}
```

How does TypeScript understand this?

When we write:

```
case "masala":
```

TypeScript knows that `order` is now `MasalaChai`.

Similarly:

- `"ginger"` → `GingerChai`
- `"milk"` → `MilkChai`

And you can access the properties specific to each type:

```
function makeChai(order: Chai) {
    switch (order.type) {
        case "masala":
            return `Spice level: ${order.spicelevel}`;

        case "ginger":
            return `Ginger amount: ${order.gingeramount}`;

        case "milk":
            return `Milk amount: ${order.milkamount}`;
    }
}
```

This is called Discriminated Union Narrowing.

Why is it useful?

Imagine your LMS has different notification types:

- `course-approved`
- `payment-success`
- `new-message`

Each notification can have different properties. A common `type` property lets TypeScript identify the correct structure.

# 8. `in` Operator Type Guard

Now let's fix your last example.

You wrote:

```
function brew(order: MasalaChai | GingerChai) {
    if ("gingerLevl" in order) {
        // 
    }
}
```

There is a spelling mistake: your property is `gingeramount`, not `gingerLevl`.

Correct version:

```
function brew(order: MasalaChai | GingerChai) {
    if ("gingeramount" in order) {
        return `Ginger Chai: ${order.gingeramount}`;
    }

    return `Masala Chai: ${order.spicelevel}`;
}
```

What does `in` do?

It checks whether an object contains a particular property.

In our case:

```
"gingeramount" in order
```

TypeScript understands:

- If true → `GingerChai`.
- If false → `MasalaChai`.

This is particularly useful when different object types have different properties.

# 9. Array Type Guard

Your last function:

```
function isStringArray(arr: unknown): arr is string[] {

}
```

Let's complete it.

```
function isStringArray(arr: unknown): arr is string[] {
    return (
        Array.isArray(arr) &&
        arr.every(item => typeof item === "string")
    );
}
```

Let's break it down.

First check:

```
Array.isArray(arr)
```

Checks whether the supplied value is an array.

Second check:

```
arr.every(item => typeof item === "string")
```

Checks whether every element inside the array is a string.

For example:

```
const names: unknown = ["Mahesh", "Rahul", "Amit"];
const numbers: unknown = [10, 20, 30];
const mixed: unknown = ["Mahesh", 25, true];

console.log(isStringArray(names));   // true
console.log(isStringArray(numbers)); // false
console.log(isStringArray(mixed));   // false
```

Now TypeScript understands the type:

```
const data: unknown = ["Mahesh", "Rahul"];

if (isStringArray(data)) {
    data.forEach(name => {
        console.log(name.toUpperCase());
    });
}
```

Inside the `if` block, TypeScript knows `data` is a `string[]`.

This is another example of a Custom Type Guard.

# 10. Complete Type Guard reference

Let's summarize all the techniques we've covered.

| Technique           | What it checks                     |
| ------------------- | ---------------------------------- |
| `typeof`            | Primitive data types               |
| Truthiness          | Whether a value is truthy or falsy |
| `instanceof`        | Class instance                     |
| `in`                | Whether an object has a property   |
| Custom `is`         | User-defined type checking         |
| Discriminated Union | Common literal property            |
| `Array.isArray()`   | Whether a value is an array        |

# 11. Important differences to remember

| Concept               | Purpose                                           |
| --------------------- | ------------------------------------------------- |
| Type Narrowing        | Reduces possible types                            |
| Type Guard            | Performs a check that enables narrowing           |
| Type Predicate (`is`) | Declares the type a function guarantees when true |
| Discriminated Union   | Narrows using a common literal property           |

One important distinction: Type Guards are not limited to functions. Conditions such as `typeof`, `instanceof`, and `in` are also built-in narrowing mechanisms.

# 12. Practice these concepts

Let's check whether you can apply what we learned.

TypeScript practice

4 of 4

Which technique is most suitable for narrowing MasalaChai | GingerChai using a common \`type\` property?

Discriminated Union

Truthiness

Array.isArray

instanceof

Correct

A shared literal discriminant such as type identifies the corresponding union member.

Previous

Finish

For your notes, file name:

`04-type-narrowing-and-type-guards.md`

Title:

```
# TypeScript: Type Narrowing and Type Guards
```

My suggestion: Spend some time implementing these examples yourself. Especially custom type guards and discriminated unions; you'll use them frequently in real React + TypeScript applications.