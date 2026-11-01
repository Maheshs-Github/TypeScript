### `type` vs `interface`


Good! You're now learning one of the most important parts of TypeScript: `type` vs `interface`.

Your understanding is mostly correct. Let's connect your examples and clarify where each one is useful.

## 1. Why do we need `type`?

You initially had:

```
function makeChai(order: {
  type: string;
  sugar: number;
  strong: boolean;
}) {
  console.log("order is a:", order);
}

function serveChai(order: {
  type: string;
  sugar: number;
  strong: boolean;
}) {
  console.log("order is a:", order);
}
```

Both functions expect the same object structure.

Instead of repeating that structure, we can create a reusable type:

```
type ChaiOrder = {
  type: string;
  sugar: number;
  strong: boolean;
};

function makeChai(order: ChaiOrder) {
  console.log("order is a:", order);
}

function serveChai(order: ChaiOrder) {
  console.log("order is a:", order);
}
```

Now both functions use the same definition.

Why is this useful?

Suppose tomorrow you add a `size` property. You only need to update `ChaiOrder`, rather than updating every function individually.

## 2. What is an interface?

An interface also defines the structure of an object.

Your example:

```
interface TeaRecipe {
  water: number;
  milk: number;
}
```

This says that an object following `TeaRecipe` must have:

- `water` of type `number`
- `milk` of type `number`

You can use it like this:

```
const recipe: TeaRecipe = {
  water: 100,
  milk: 50,
};
```

Or implement it using a class:

```
class MasalaChai implements TeaRecipe {
  water = 100;
  milk = 50;
}
```

But look at your original class:

```
class MasalaChai implements TeaRecipe {
  water = 100;
  sugar = 1;
}
```

This gives an error because `milk` is missing.

Remember: `implements` means the class promises to satisfy the structure defined by the interface.

## 3. Can a class implement a `type`?

Yes! Your understanding here needs a small correction.

You wrote:

```
type CupSize = "small" | "large";
```

Then tried:

```
class Chai implements CupSize {
}
```

This doesn't work because `CupSize` is a union of primitive string values, not an object structure.

A class's `implements` clause expects an object type with statically known members.

But this works:

```
type CupSize = {
  size: "small" | "large";
};

class Chai implements CupSize {
  size: "large" = "large";
}
```

And your interface version is equally valid:

```
interface CupSize {
  size: "small" | "large";
}

class Chai implements CupSize {
  size: "large" = "large";
}
```

Important: `implements` is not exclusive to interfaces. Classes can implement object-shaped type aliases too.

## 4. Union (`|`) — OR

Your example:

```
type TeaType = "masala" | "ginger" | "lemon";

function orderChai(t: TeaType) {
  console.log(t);
}
```

Correct!

The `|` symbol represents OR.

It means the value can be any one of these three options.

```
orderChai("masala"); // Valid
orderChai("ginger"); // Valid
orderChai("lemon");  // Valid

// orderChai("coffee"); // Error
```

Think about a real application:

```
type PaymentStatus = "pending" | "success" | "failed";
```

You don't want random status values entering your application.

Union types restrict the allowed values.

## 5. Intersection (`&`) — AND

Your example:

```
type BaseChai = {
  teaLeaves: number;
};

type Extra = {
  masala: number;
};

type MasalaChai = BaseChai & Extra;

const cup: MasalaChai = {
  teaLeaves: 2,
  masala: 1,
};
```

Exactly right!

`&` combines both object structures.

Think of it as:

- `BaseChai` requires `teaLeaves`.
- `Extra` requires `masala`.
- `MasalaChai` requires both.

Understanding intersection

BaseChai\
`teaLeaves: number`

Extra\
`masala: number`

MasalaChai\
`teaLeaves: number`

`masala: number`

You can also use intersection with interfaces:

```
interface BaseChai {
  teaLeaves: number;
}

interface Extra {
  masala: number;
}

type MasalaChai = BaseChai & Extra;
```

## 6. Optional properties (`?`)

Your example:

```
type User = {
  username: string;
  bio?: string;
};

const u1: User = {
  username: "Mahesh",
  bio: "mahesh-mane.onreder.com",
};

const u2: User = {
  username: "Kunal",
};
```

Correct!

The `?` means the property is optional.

Without `?`:

```
type User = {
  username: string;
  bio: string;
};
```

Both properties would be required.

With `bio?`, you can provide it or leave it out.

One thing to remember: when you read `u2.bio`, its type is `string | undefined`.

## 7. Readonly

Your example:

```
type Config = {
  readonly appName: string;
  version: number;
};

const cfg: Config = {
  appName: "MaterJi",
  version: 1,
};
```

Now:

```
// cfg.appName = "Dunno"; // Error
cfg.version = 2;          // Valid
```

`readonly` prevents reassignment of that property through the object reference.

One important distinction: it doesn't make nested objects deeply immutable.

```
type Config = {
  readonly settings: {
    theme: string;
  };
};

const cfg: Config = {
  settings: {
    theme: "dark",
  },
};

cfg.settings.theme = "light"; // Allowed
// cfg.settings = { theme: "light" }; // Error
```

## 8. `type` vs `interface` — the important comparison

Both can describe object structures, but they have some differences.

| Feature             | `type`            | `interface`                    |
| ------------------- | ----------------- | ------------------------------ |
| Object structure    | Yes               | Yes                            |
| Union (`\\|`)       | Yes               | No, not directly               |
| Intersection (`&`)  | Yes               | Can extend multiple interfaces |
| Optional properties | Yes               | Yes                            |
| Readonly            | Yes               | Yes                            |
| Class `implements`  | Yes, object types | Yes                            |
| Declaration merging | No                | Yes                            |

### One important feature: declaration merging

Interfaces can be declared more than once with the same name.

```
interface User {
  username: string;
}

interface User {
  age: number;
}
```

TypeScript combines them.

Now `User` requires both properties:

```
const user: User = {
  username: "Mahesh",
  age: 25,
};
```

But repeating a type alias with the same name produces an error.

### So, which should you use?

My recommendation:

- Use `interface` when defining object structures, especially class contracts and object APIs.
- Use `type` when defining unions, intersections, literal types, and more complex type combinations.
- Both are perfectly valid for ordinary object structures. There is no need to force one everywhere.

For example, in your MERN LMS:

```
interface Course {
  title: string;
  description: string;
  price: number;
}

type CourseStatus = "draft" | "published" | "approved";

type CourseWithStatus = Course & {
  status: CourseStatus;
};
```

This is a practical combination of both.

## Quick knowledge check

1\. Can a class implement a type alias?

Never

Yes, if it describes an object structure

Only if it is a union

Correct! A class can implement an object-shaped type alias.

2\. What does \`&\` mean in TypeScript?

OR

AND

Optional

Correct! Intersection combines requirements from both types.

3\. Which supports declaration merging?

type

interface

Both

Correct! Multiple interface declarations with the same name are merged.

4\. What does \`bio?: string\` mean?

Bio must be a string

Bio can be omitted

Bio must be null

Correct! The property is optional; when read, it may be undefined.

Check answers

Score: 4/4

Next, a useful topic to learn is extending interfaces (`extends`) vs intersection (`&`). They look similar but are worth understanding separately.