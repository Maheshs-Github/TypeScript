You're now learning classes in TypeScript, including constructors, access modifiers, getters/setters, static members, abstract classes, and composition.

Your examples are mostly correct. There are a few important mistakes to fix, especially in your setter.

## 1. Classes and constructors

Your example:

```
class Chai {
  flavour: string;
  price: number;

  constructor(flavour: string) {
    this.flavour = flavour;
  }
}

const masalaChai = new Chai("Ginger");
masalaChai.flavour = "Masala";
```

A constructor is a special method that runs automatically when you create an object using `new`.

```
const masalaChai = new Chai("Ginger");
```

Here:

1. A new `Chai` object is created.
2. The constructor runs.
3. `"Ginger"` is assigned to `flavour`.

One issue in your code: `price` is declared as a number but never initialized.

With strict property initialization enabled, TypeScript will report an error.

You can fix it by:

```
class Chai {
  flavour: string;
  price: number;

  constructor(flavour: string, price: number) {
    this.flavour = flavour;
    this.price = price;
  }
}

const masalaChai = new Chai("Ginger", 20);
```

Or make `price` optional:

```
price?: number;
```

### Shorter constructor syntax: parameter properties

TypeScript provides a shortcut:

```
class Chai {
  constructor(
    public flavour: string,
    public price: number
  ) {}
}

const chai = new Chai("Masala", 20);
```

Here, `public` automatically:

- Declares the class property.
- Assigns the constructor argument to that property.

You don't need to declare the properties separately or write `this.flavour = flavour`.

## 2. Access modifiers

You used three important access modifiers.

```
class Chai2 {
  public flavour: string = "Masala";
  private secretIngredients: string = "Dunno";
  protected shopName = "Chai Corner";

  reveal() {
    return this.secretIngredients;
  }
}
```

Let's understand each.

| Modifier    | Inside class | Outside class | Child class |
| ----------- | ------------ | ------------- | ----------- |
| `public`    | Yes          | Yes           | Yes         |
| `private`   | Yes          | No            | No          |
| `protected` | Yes          | No            | Yes         |

### Public

```
const c = new Chai2();

console.log(c.flavour); // Masala
```

Accessible from anywhere.

### Private

```
console.log(c.secretIngredients); // Error
```

But you can access it through a public method:

```
c.reveal(); // Dunno
```

Your understanding is correct: the variable is private, but the public method provides controlled access to its value.

### Protected

```
class Shop {
  protected shopName = "Chai Corner";
}

class Branch extends Shop {
  getName() {
    return this.shopName;
  }
}

const branch = new Branch();

branch.getName(); // Chai Corner
// branch.shopName; // Error
```

A child class can access the protected property, but outside code cannot access it directly.

## 3. JavaScript private fields (`#`)

Your example:

```
class Wallet {
  #balance = 100;

  getBalance() {
    return this.#balance;
  }
}

const wallet = new Wallet();

wallet.getBalance(); // 100
// wallet.#balance; // Error
```

This is slightly different from TypeScript's `private`.

There are two ways to make fields private:

```
class Example {
  private balance = 100; // TypeScript private
  #secret = 200;         // JavaScript private field
}
```

| `private`                                | `#private`                     |
| ---------------------------------------- | ------------------------------ |
| TypeScript access restriction            | JavaScript runtime restriction |
| Removed as a modifier during compilation | Remains a real private field   |
| Mainly compile-time protection           | Runtime-enforced privacy       |

For example, JavaScript itself enforces the privacy of `#secret`, even after TypeScript is compiled.

## 4. Readonly properties

Your example:

```
class Cup {
  readonly capacity: number = 250;

  constructor(capacity: number) {
    this.capacity = capacity;
  }
}
```

Correct!

A `readonly` property can be initialized:

- Directly where it's declared.
- Inside the constructor.

After initialization, it cannot be reassigned.

```
const cup = new Cup(300);

console.log(cup.capacity); // 300

// cup.capacity = 500; // Error
```

Think of it as a value that should not change after the object is initialized.

## 5. Getters and setters

This is where you have a small mistake.

Your code:

```
class ModernChai {
  private _sugar = 2;

  getSugar() {
    return this._sugar;
  }

  set sugar(value: number) {
    if (value > 5) throw new Error("Too Sweet");

    this._sugar = this._sugar;
  }
}
```

Look at this line:

```
this._sugar = this._sugar;
```

You're assigning the existing value to itself.

You should assign the incoming `value`:

```
this._sugar = value;
```

Let's write the complete version:

```
class ModernChai {
  private _sugar = 2;

  get sugar() {
    return this._sugar;
  }

  set sugar(value: number) {
    if (value > 5) {
      throw new Error("Too Sweet");
    }

    this._sugar = value;
  }
}

const chai = new ModernChai();

console.log(chai.sugar); // 2

chai.sugar = 4;

console.log(chai.sugar); // 4
```

What is happening?

- `get sugar()` lets us read the value.
- `set sugar(value)` lets us update the value.
- The setter validates the incoming value before updating it.

Notice the syntax:

```
chai.sugar = 4;
```

We don't call it like a normal method:

```
// chai.sugar(4); // Not how setters work
```

This is useful when you want to control how a property is read or modified.

## 6. Static members

Your example:

```
class EkChai {
  static shopName = "New Chai Store";

  constructor(public flavour: string) {}
}

console.log(EkChai.shopName);
```

Correct!

Normally, class properties belong to individual objects.

```
const chai1 = new EkChai("Masala");
const chai2 = new EkChai("Ginger");
```

Each object has its own `flavour`.

But `shopName` belongs to the class itself.

That's why you access it using:

```
EkChai.shopName;
```

Not:

```
chai1.shopName; // Error
```

Think of it this way:

Class-level property

EkChai\
`shopName = "New Chai Store"`

chai1\
`flavour = "Masala"`

chai2\
`flavour = "Ginger"`

Both objects share the same static shopName through the class.

Useful when you have a value shared by all objects, such as application-wide configuration or a common counter.

## 7. Abstract classes

An abstract class is a class that acts as a blueprint for other classes.

You cannot directly create its object.

For example:

```
abstract class Chai {
  constructor(public flavour: string) {}

  abstract prepare(): void;

  serve() {
    console.log(`Serving ${this.flavour} chai`);
  }
}
```

Notice two things:

1. `abstract class Chai` means you cannot create `new Chai()`.
2. `abstract prepare()` means child classes must provide their own implementation.

Now let's extend it:

```
class MasalaChai extends Chai {
  prepare(): void {
    console.log("Adding masala and boiling chai");
  }
}

class GingerChai extends Chai {
  prepare(): void {
    console.log("Adding fresh ginger and boiling chai");
  }
}
```

Usage:

```
const masala = new MasalaChai("Masala");

masala.prepare();
masala.serve();

const ginger = new GingerChai("Ginger");

ginger.prepare();
ginger.serve();
```

Output:

```
Adding masala and boiling chai
Serving Masala chai

Adding fresh ginger and boiling chai
Serving Ginger chai
```

Why use an abstract class?

Suppose every chai must have a `prepare()` method, but each chai has a different preparation process.

The abstract class defines what every child must provide, while the child classes define how it works.

You can also have normal implemented methods like `serve()` that child classes inherit.

## 8. Composition — what is it?

This is an important OOP concept.

Composition means creating a class using objects of other classes.

In simple words, one class uses another class to perform some work.

Let's take a real-world example.

A chai machine needs a water heater to heat water.

```
class WaterHeater {
  heatWater() {
    console.log("Heating water...");
  }
}

class ChaiMachine {
  private heater = new WaterHeater();

  makeChai() {
    this.heater.heatWater();
    console.log("Making chai...");
  }
}

const machine = new ChaiMachine();

machine.makeChai();
```

Here:

- `WaterHeater` handles heating.
- `ChaiMachine` handles making chai.
- `ChaiMachine` uses a `WaterHeater` object.

This is composition.

### Inheritance vs composition

Let's compare them.

Inheritance — IS-A relationship

```
class Chai {
  serve() {
    console.log("Serving chai");
  }
}

class MasalaChai extends Chai {
  addMasala() {
    console.log("Adding masala");
  }
}
```

MasalaChai IS-A Chai.

The child inherits functionality from its parent.

Composition — HAS-A relationship

```
class WaterHeater {
  heatWater() {
    console.log("Heating water");
  }
}

class ChaiMachine {
  private heater = new WaterHeater();

  makeChai() {
    this.heater.heatWater();
  }
}
```

ChaiMachine HAS-A WaterHeater.

It uses another object instead of inheriting its functionality.

Inheritance

Chai

Parent class

MasalaChai

Child class

Composition

ChaiMachine

WaterHeater

Used by ChaiMachine

| Inheritance                         | Composition                             |
| ----------------------------------- | --------------------------------------- |
| IS-A                                | HAS-A                                   |
| Uses `extends`                      | Uses objects of other classes           |
| Inherits properties and methods     | Delegates work to another object        |
| Creates a parent-child relationship | Creates a collaboration between objects |

When should you use which?

- Use inheritance when there is a genuine parent-child relationship.
- Use composition when a class needs functionality provided by another class.

Composition often gives more flexibility because you can replace one component without changing the entire inheritance hierarchy.

## 9. Quick revision of today's concepts

| Concept     | Purpose                                   |
| ----------- | ----------------------------------------- |
| Constructor | Initializes an object                     |
| `public`    | Accessible everywhere                     |
| `private`   | Accessible only inside the class          |
| `protected` | Accessible inside class and child classes |
| `#private`  | Runtime-enforced private field            |
| `readonly`  | Prevents reassignment                     |
| Getter      | Reads a property                          |
| Setter      | Updates a property with control           |
| `static`    | Belongs to the class                      |
| `abstract`  | Defines a blueprint for child classes     |
| Composition | One class uses another class              |

One important takeaway: Abstract classes and interfaces can both define contracts for classes, but abstract classes can also provide shared implementation and maintain state.

For your TypeScript notes, I'd keep today's topic under:

`classes-access-modifiers-and-oop-concepts.md`