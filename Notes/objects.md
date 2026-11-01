### Objects in TS



You're learning object types and utility types in TypeScript. There are a few important concepts mixed 
together in your examples, especially the confusing part about `smallCup`, `bigCup`, and assigning one object to another.

Let's go step by step.

## 1. JavaScript object vs TypeScript object type

First, your JavaScript object:

```
const chai = {
  name: "Masala Chai",
  price: 20,
  isHot: true,
};
```

Here, TypeScript automatically infers the structure and types of the object.

It understands:

```
{
  name: string;
  price: number;
  isHot: boolean;
}
```

Now look at your second example:

```
let tea: {
  name: string;
  price: number;
  isHot: boolean;
};

tea = {
  name: "Ginger Tea",
  price: 20,
  isHot: true,
};
```

This is inline object type annotation.

You're explicitly telling TypeScript what structure the `tea` variable must follow.

The difference:

- `chai`: TypeScript infers the object type.
- `tea`: You explicitly define the object type.

Both describe objects. The syntax is just different.

## 2. Object type using a type alias

When the same object structure needs to be reused, create a type alias.

```
type Tea = {
  name: string;
  price: number;
  ingredients: string[];
};

const adrakChai: Tea = {
  name: "Adrak Chai",
  price: 25,
  ingredients: ["Ginger", "Milk", "Tea Leaves"],
};
```

Now `Tea` represents that entire object structure.

You can reuse it:

```
function makeTea(tea: Tea) {
  console.log(tea.name);
}

function serveTea(tea: Tea) {
  console.log(tea.price);
}
```

This is the same concept you learned earlier with type aliases.

## 3. The confusing part: `smallCup` and `bigCup`

Your code:

```
type Cup = {
  size: string;
};

let smallCup: Cup = {
  size: "300ml",
};

let bigCup: Cup = {
  size: "500ml",
  material: "steel",
};

smallCup = bigCup;
```

Let's understand what's happening.

First, your `Cup` type says:

```
type Cup = {
  size: string;
};
```

It requires only one property:

\- `size`

Now, `smallCup` follows that structure.

But `bigCup` has two properties:

- `size`
- `material`

Why doesn't TypeScript complain about `material`?

This is where TypeScript's structural typing comes in.

TypeScript primarily checks whether an object has the required structure, rather than whether it has exactly the same declared type name or exactly the same properties.

In other words:

> If an object has the properties required by a type, it can generally be used where that type is expected, even if it has additional properties.

So this works:

```
smallCup = bigCup;
```

Because `bigCup` has `size`, which is all that `Cup` requires.

Structural typing

Cup expects\
`size: string`

Compatible

bigCup contains\
`size: "500ml"`

`material: "steel"`

bigCup has everything Cup requires, plus an additional property.

But there's an interesting difference.

If you directly write:

```
let bigCup: Cup = {
  size: "500ml",
  material: "steel",
};
```

TypeScript gives an error!

Why? Because this is a fresh object literal, and TypeScript performs an excess property check. It notices that `material` isn't declared in `Cup`.

But when you assign an existing variable like `bigCup` to `smallCup`, structural compatibility is checked instead.

That distinction is important.

## 4. Another example: `Brew` and `coffee`

You wrote:

```
type Brew = {
  BrewTime: number;
};

const coffee = {
  brewTime: 5,
  beans: "India",
};

const chaiBrew: Brew = coffee;
```

You should get an error here because of a small naming mismatch.

Look carefully:

```
BrewTime // Capital B
brewTime // Small b
```

TypeScript property names are case-sensitive.

Correct it:

```
type Brew = {
  brewTime: number;
};

const coffee = {
  brewTime: 5,
  beans: "India",
};

const chaiBrew: Brew = coffee; // Works
```

Why does it work even though `coffee` has an additional `beans` property?

Because `Brew` only requires `brewTime`, and `coffee` already has it.

This is the same structural typing concept from the cup example.

## 5. Splitting object types into smaller types

Your example:

```
type Item = {
  name: string;
  quantity: number;
};

type Address = {
  street: string;
  pin: number;
};

type Order = {
  id: string;
  items: Item[];
  address: Address;
};
```

This is called composing object types.

Instead of writing everything inside `Order`, you create smaller reusable structures.

Let's understand the final object:

```
const order: Order = {
  id: "ORD101",
  items: [
    { name: "Masala Chai", quantity: 2 },
    { name: "Ginger Chai", quantity: 1 },
  ],
  address: {
    street: "Pune",
    pin: 411014,
  },
};
```

Notice:

- `items: Item[]` means an array of `Item` objects.
- `address: Address` means an object following the `Address` structure.

This is especially useful when building larger applications.

For example, in your LMS:

```
type Course = {
  title: string;
  price: number;
};

type Instructor = {
  username: string;
  email: string;
};

type CourseDetails = {
  course: Course;
  instructor: Instructor;
};
```

You can reuse the same `Course` and `Instructor` types elsewhere.

## 6. `Partial<T>` — make every property optional

Your example:

```
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};

const updateChai = (updates: Partial<Chai>) => {
  console.log("Updating the Data With:", updates);
};

updateChai({ price: 25 });
updateChai({ isHot: true });
updateChai({});
```

Correct!

Normally, `Chai` requires all three properties.

But `Partial<Chai>` transforms it into:

```
type PartialChai = {
  name?: string;
  price?: number;
  isHot?: boolean;
};
```

So you can pass just the property you want to update.

Why is this useful?

Imagine a user updating their profile. They might only want to change their username, not their email and password.

```
type Profile = {
  username: string;
  email: string;
  bio: string;
};

function updateProfile(data: Partial<Profile>) {
  // Update only supplied fields
}

updateProfile({ username: "Mahesh" });
updateProfile({ bio: "Full Stack Developer" });
```

That's the practical use of `Partial`.

One detail: `Partial` also allows `{}` because all properties become optional. Your backend should still decide whether an empty update is acceptable.

## 7. `Required<T>` — make every property required

Your example:

```
type ChaiOrder = {
  name?: string;
  quantity?: number;
};

const placeOrder = (order: Required<ChaiOrder>) => {
  console.log("Order is:", order);
};

placeOrder({
  name: "Masala Chai",
  quantity: 2,
});
```

Correct!

Originally:

```
type ChaiOrder = {
  name?: string;
  quantity?: number;
};
```

Both properties are optional.

But `Required<ChaiOrder>` transforms the type into:

```
type RequiredChaiOrder = {
  name: string;
  quantity: number;
};
```

Now both properties must be supplied.

```
// Error: quantity is missing
placeOrder({
  name: "Masala Chai",
});
```

Think of it this way:

- `Partial`: make everything optional.
- `Required`: make everything required.

## 8. `Pick<T, Keys>` — select only the properties you need

Your example:

```
type ChaiNew = {
  name: string;
  price: number;
  isHot: boolean;
  ingredients: string[];
};

type BasicChaiInfo = Pick<ChaiNew, "name" | "price">;

const chaiInfo: BasicChaiInfo = {
  name: "Lemon Tea",
  price: 30,
};
```

Exactly right!

`Pick` allows you to select specific properties from an existing type.

Here, you selected:

```
"name" | "price"
```

So the resulting type becomes:

```
type BasicChaiInfo = {
  name: string;
  price: number;
};
```

You don't need to rewrite the property definitions.

Real-world example:

Suppose your LMS course contains:

```
type Course = {
  title: string;
  description: string;
  price: number;
  instructorId: string;
  status: string;
};
```

For a course card, perhaps you only need:

```
type CourseCard = Pick<Course, "title" | "price">;
```

Now the card only requires those two properties.

## 9. `Omit<T, Keys>` — exclude properties you don't need

Your example:

```
type ChaiNew2 = {
  name: string;
  price: number;
  isHot: boolean;
  secretIngredients: string[];
};

type BasicChaiInfo2 = Omit<ChaiNew2, "secretIngredients">;

const chaiInfo2: BasicChaiInfo2 = {
  name: "Lemon Tea",
  price: 30,
  isHot: false,
};
```

Correct!

`Omit` does the opposite of `Pick`.

- `Pick` selects the properties you want.
- `Omit` removes the properties you don't want.

Your resulting type is:

```
type BasicChaiInfo2 = {
  name: string;
  price: number;
  isHot: boolean;
};
```

That's why this gives an error:

```
const chaiInfo2: BasicChaiInfo2 = {
  name: "Lemon Tea",
  price: 30,
  isHot: false,
  secretIngredients: ["Ginger"], // Error
};
```

Because `secretIngredients` is no longer part of `BasicChaiInfo2`.

Real-world example:

Imagine your user object:

```
type User = {
  username: string;
  email: string;
  password: string;
  role: string;
};
```

You want to create a public user profile without exposing the password.

```
type PublicUser = Omit<User, "password">;
```

Now `PublicUser` contains `username`, `email`, and `role`.

## 10. Quick revision of utility types

These are built-in TypeScript utility types. They help you create new types from existing ones without repeating their definitions.

| Utility       | What it does                  |
| ------------- | ----------------------------- |
| `Partial<T>`  | Makes all properties optional |
| `Required<T>` | Makes all properties required |
| `Pick<T, K>`  | Selects specified properties  |
| `Omit<T, K>`  | Removes specified properties  |
| `Readonly<T>` | Makes all properties readonly |

Here's a small visual revision:

Starting type

```
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};
```

Partial

```
{
  name?: string;
  price?: number;
  isHot?: boolean;
}
```

Required

```
{
  name: string;
  price: number;
  isHot: boolean;
}
```

Pick

```
Pick<Chai, "name" | "price">
// name, price
```

Omit

```
Omit<Chai, "isHot">
// name, price
```

Readonly

```
Readonly<Chai>
// All properties readonly
```

## 11. Test your understanding

Try these without running the code first.

1\. What is the main reason \`smallCup = bigCup\` works?

Both variables have the same name

Structural typing: bigCup contains the required size property

TypeScript ignores all extra properties

Correct! TypeScript checks whether the required structure is present.

2\. Which utility type makes all properties optional?

Required

Pick

Partial

Correct! Partial\<T> makes every property optional.

3\. You want to remove password from User. Which one?

Pick\<User, 'password'>

Omit\<User, 'password'>

Partial\<User>

Correct! Omit removes the specified property.

4\. What does \`Item[]\` mean?

One Item object

An array of Item objects

An optional Item

Correct! The array contains elements following the Item type.

Check answers

Score: 4/4

My recommendation for your next topic: Learn `extends` with interfaces, nested objects, and index signatures. These will help when defining real API response types and React component props in your LMS.