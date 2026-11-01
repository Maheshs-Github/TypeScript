### Type assertion ,never & unknown


You're covering some important TypeScript concepts here: type assertions, `any`, `unknown`, `never`, and `void`. Your understanding is mostly correct. Let's go through the parts that are confusing, especially `never`.

## 1. Type assertion (`as`)

```
let response: any = 42;

let numericLength: number = (response as string).length;
```

Your understanding is close, but remember:

Type assertion does not convert the actual value. It only tells TypeScript to treat that value as a particular type.

Here:

- Actual value of `response` is still `42` (a number).
- `as string` tells TypeScript to treat it as a string.
- `.length` is allowed because strings have a `length` property.
- At runtime, `42.length` evaluates to `undefined` in this example.

So, assertion doesn't guarantee that the value really is a string.

### JSON.parse example

```
type Book = {
  name: string;
};

let bookString = '{"name":"Who Moved My Cheese"}';

let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name);
```

`JSON.parse()` returns `any` in TypeScript's standard typings.

When you write `as Book`, TypeScript allows you to access `name` as a string property.

But the important point: TypeScript does not verify that the JSON actually contains `name`.

For example, this would still compile:

```
let bookString = '{"title":"Atomic Habits"}';

let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name); // undefined at runtime
```

For untrusted JSON, a safer approach is to parse it as `unknown` and validate its structure before using it.

## 2. DOM type assertion

```
const inputElement = document.getElementById("userName") as HTMLInputElement;
```

Correct. `getElementById()` returns an `HTMLElement | null`.

But you know that the element with this ID is an input, so you assert `HTMLInputElement`.

Now TypeScript allows:

```
inputElement.value;
inputElement.placeholder;
inputElement.focus();
```

One caution: if the element doesn't exist, or it isn't actually an input, the assertion won't protect you at runtime.

## 3. `any` vs `unknown`

You understood the main difference correctly.

Both allow you to assign values of different types, but they behave differently when you try to use those values.

With `any`:

```
let value: any;

value = "chai";
value = [1, 2, 3, 4];
value = 2.4;

value.toUpperCase(); // No TypeScript error
```

TypeScript basically stops checking what you're doing with `value`.

Even though the actual value is `2.4`, TypeScript allows `toUpperCase()`. This can cause a runtime error.

With `unknown`:

```
let value1: unknown;

value1 = "chai";
value1 = [1, 2, 3, 4];
value1 = 2.4;

// value1.toUpperCase(); // Error
```

TypeScript says: "I don't know what this value contains. Prove its type before using its properties or methods."

You can prove it using a type guard:

```
if (typeof value1 === "string") {
  console.log(value1.toUpperCase());
}
```

One correction in your original code:

```
if (value1 === "string")
```

This checks whether the actual value is literally the word `"string"`.

Instead, use:

```
if (typeof value1 === "string")
```

Remember:

| Feature                 | `any` | `unknown`                   |
| ----------------------- | ----- | --------------------------- |
| Assign any value        | Yes   | Yes                         |
| Assign to another type  | Yes   | Requires checking/assertion |
| Call methods directly   | Yes   | No                          |
| Requires type narrowing | No    | Yes                         |
| Type safety             | Low   | Better                      |

My recommendation: prefer `unknown` when receiving data whose type you don't know.

## 4. `try...catch` and `unknown`

Your example:

```
try {
  // Some operation
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }

  console.log("Error: ", error);
}
```

This is a good use of type narrowing.

Why?

When an error occurs, JavaScript can throw different kinds of values:

```
throw new Error("Something went wrong");
throw "Something went wrong";
throw 404;
```

So TypeScript cannot safely assume that `error` is always an `Error` object.

That's why, with `useUnknownInCatchVariables` enabled (included in strict checking), the catch variable is `unknown`.

Now:

```
if (error instanceof Error) {
  console.log(error.message);
}
```

You are checking whether the thrown value is an instance of the `Error` class.

If true, TypeScript allows access to `.message`.

This is exactly the purpose of `unknown` plus type narrowing.

## 5. Type assertion with `unknown`

Your example:

```
const data: unknown = "chai aur code";

const strData: string = data as string;
```

Correct. But let's understand what happens.

Initially:

```
const data: unknown = "chai aur code";
```

TypeScript knows that `data` is `unknown`, even though its actual value is a string.

Then:

```
const strData: string = data as string;
```

You are telling TypeScript:

"I know this value is a string. Treat it as one."

This is a type assertion, not type checking.

You could also narrow it safely:

```
if (typeof data === "string") {
  const strData: string = data;
  console.log(strData.toUpperCase());
}
```

The difference:

- `as string` — you tell TypeScript what the type is.
- `typeof data === "string"` — you check the actual type at runtime.

## 6. Understanding `never` — the interesting part

Let's focus on your example.

```
type Role = "admin" | "user";

function redirectBasedOnRole(role: Role): void {
  if (role === "admin")
    return console.log("redirecting to the Admin Dashboard");

  if (role === "user")
    return console.log("redirecting to the user dashboard");

  role;
}
```

You mentioned that hovering over `role` at the end shows `never`.

Let's dry-run how TypeScript understands this.

Initially:

```
role: "admin" | "user"
```

There are only two possible values.

Step 1: First condition

```
if (role === "admin")
```

If this condition is true, the function returns.

If it is false, what can `role` be?

Only `"user"`.

Step 2: Second condition

```
if (role === "user")
```

If this condition is true, the function returns.

If it is false, what possible value is left?

Nothing!

Step 3: At the end

```
role;
```

There are no possible values remaining.

That's why TypeScript infers:

```
role: never
```

Visualize the narrowing

`role: "admin" | "user"`

admin

Returns

not admin

Must be user

user

Returns

Nothing remains

# never

Now let's add another role:

```
type Role = "admin" | "user" | "instructor";
```

After checking admin and user, the remaining type becomes:

```
role: "instructor"
```

So TypeScript won't infer `never` anymore.

The key concept: `never` represents a value that cannot exist at that point in the code.

### Where is `never` useful?

One practical use is exhaustive checking:

```
type Role = "admin" | "user" | "instructor";

function redirectBasedOnRole(role: Role): void {
  switch (role) {
    case "admin":
      return console.log("Admin Dashboard");

    case "user":
      return console.log("User Dashboard");

    case "instructor":
      return console.log("Instructor Dashboard");

    default: {
      const exhaustiveCheck: never = role;
      return exhaustiveCheck;
    }
  }
}
```

If you later add `"recruiter"` to `Role` but forget to handle it in the switch, TypeScript will report an error at `exhaustiveCheck`.

This is very useful in real React applications when handling different user roles or statuses.

## 7. What is the use of `void`?

Your function:

```
function redirectBasedOnRole(role: Role): void {
  if (role === "admin")
    return console.log("redirecting to the Admin Dashboard");

  if (role === "user")
    return console.log("redirecting to the user dashboard");

  role;
}
```

`void` means the function isn't intended to provide a meaningful return value.

For example:

```
function serveChai(): void {
  console.log("Serving chai");
}
```

Calling it:

```
const result = serveChai();
```

`result` has type `void`.

One small distinction:

- `void` means the function doesn't provide a useful return value.
- `never` means the function never completes normally.

Compare:

```
function first(): void {
  console.log("Hello");
}

function second(): never {
  throw new Error("Something went wrong");
}
```

The first function finishes normally. The second throws an error and never finishes normally.

## 8. Your `neverReturn()` function

You wrote:

```
function neverReturn(): never {
  while (true())
}
```

There is a small syntax mistake. `true` is a boolean, not a function.

Correct version:

```
function neverReturn(): never {
  while (true) {
    // Runs forever
  }
}
```

This function never finishes because the loop runs infinitely.

Other example:

```
function throwError(): never {
  throw new Error("Something went wrong");
}
```

Both are valid examples of `never`.

## Final revision: `void` vs `never`

| Concept            | `void`                     | `never`                         |
| ------------------ | -------------------------- | ------------------------------- |
| Meaning            | No meaningful return value | No normal completion            |
| Function finishes? | Yes                        | No                              |
| Common use         | Logging, event handlers    | Throwing errors, infinite loops |
| Example            | `console.log()` function   | `throw new Error()`             |

## Quick knowledge check

Try these three questions:

1\. What does \`as string\` do?

Converts the value into a string

Tells TypeScript to treat the value as a string

Checks the value at runtime

Correct! Type assertion changes TypeScript's understanding, not the actual runtime value.

2\. What will TypeScript infer for \`role\` after both admin and user branches return?

string

undefined

never

Correct! Both possible union members have been eliminated.

3\. Which function return type is appropriate for a function that always throws an error?

void

unknown

never

Correct! The function never completes normally.

Check answers

Score: 3/3

The most important distinction to take away from this lesson: assertion tells TypeScript what you claim a value is; narrowing proves what it can be; `never` represents what cannot be.